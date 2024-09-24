package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"
)

func listIssuesProjectV2Query(nodeId string) string {
	return fmt.Sprintf("query { node(id: \"%v\") { ... on ProjectV2 { items(last: 100) { nodes { id content { ... on Issue { title url state body } } fieldValues(first: 20) { nodes { ... on ProjectV2ItemFieldSingleSelectValue { field { ... on ProjectV2SingleSelectField { name } } name id }  ... on ProjectV2ItemFieldRepositoryValue { repository { id url } } } } } } } } }", nodeId)
}

func listProjectsV2Query(org string) string {
	return fmt.Sprintf("{organization(login: \"%v\") {projectsV2(first: 100) {nodes {id title readme url }}}}", org)
}

type Field struct {
	Name  string
	Value string
}
type Issue struct {
	Name        string
	Status      string
	Description string
	Url         string
	Fields      []*Field
}

func (i *Issue) Resolved() bool {
	for _, f := range i.Fields {
		if f.Name == "Status" {
			return f.Value == "Done"
		}
	}
	switch strings.ToLower(i.Status) {
	case "done", "closed":
		return true
	default:
		return false
	}
}

type ProjectV2 struct {
	Id          string
	Readme      string
	Name        string
	Tag         string
	Url         string
	ReleaseDate time.Time
	IsReleased  bool
}

func (p *ProjectV2) parseReleaseDate() time.Time {
	var arr = strings.FieldsFunc(p.Readme, func(r rune) bool { return r == '\n' || r == '\\' })
	for _, line := range arr {
		line = strings.TrimSpace(line)
		if strings.HasPrefix(line, "Release: ") {
			var result, _ = time.Parse(time.DateOnly, line[len("Release: "):])
			return result
		}
	}
	return time.Time{}
}

func (p *ProjectV2) parseReadme() {
	var lines = strings.Split(p.Readme, "\n")
	p.Readme = strings.Join(lines, " \\\n")
}

func (p *ProjectV2) IsDraft() bool {
	return p.ReleaseDate.After(time.Now())
}

var versionPattern = regexp.MustCompile(`v(\d+\.)?(\d+\.)?(\*|\d+)$`)

func FeildsFromJson(rawData map[string]any) *Field {
	var field = new(Field)

	for k, v := range rawData {
		switch k {
		case "field":
			field.Name = v.(map[string]any)["name"].(string)
		case "name":
			field.Value = v.(string)
		}
	}

	if field.Name != "" && field.Value != "" {
		return field
	}

	return nil
}

func IssueFromJson(rawData map[string]any) *Issue {
	var issue = new(Issue)

	if content, ok := rawData["content"]; ok {
		for k, v := range content.(map[string]any) {
			switch k {
			case "body":
				issue.Description = v.(string)
			case "title":
				issue.Name = v.(string)
			case "state":
				issue.Status = v.(string)
			case "url":
				issue.Url = v.(string)

			}
		}
	}
	if fields, ok := rawData["fieldValues"]; ok {
		issue.Fields = walkTree[Field](fields.(map[string]any), FeildsFromJson)
	}

	if issue.Description != "" &&
		issue.Status != "" &&
		len(issue.Fields) > 0 &&
		issue.Url != "" &&
		issue.Name != "" {
		return issue
	}

	return nil
}

func ProjectV2FromJson(rawData map[string]any) *ProjectV2 {
	var r = new(ProjectV2)
	for k, v := range rawData {
		if v == nil {
			continue
		}
		switch k {
		case "readme":
			r.Readme = v.(string)
		case "title":
			r.Name = v.(string)
		case "id":
			r.Id = v.(string)
		case "url":
			r.Url = v.(string)
		}
	}

	if r.Id != "" && r.Readme != "" && r.Name != "" {
		r.ReleaseDate = r.parseReleaseDate()
		r.IsReleased = time.Now().After(r.ReleaseDate)
		r.parseReadme()
		return r
	}

	return nil
}

func GetOrFetchIssues(ctx context.Context, projectId string) ([]*Issue, error) {
	var resp, err = githubGraphQLPost(ctx, listIssuesProjectV2Query(projectId))
	if err != nil {
		return nil, err
	}
	return walkTree[Issue](resp, IssueFromJson), nil
}

func walkTree[T any](rawData map[string]any, mapperFn func(map[string]any) *T) []*T {
	var result []*T
	var dfs func(obj any)

	dfs = func(v any) {
		switch val := v.(type) {
		case []any:
			for _, item := range val {
				dfs(item)
			}
		case map[string]any:
			var mappedValue = mapperFn(val)
			if mappedValue != nil {
				result = append(result, mappedValue)
			} else {
				for _, v := range val {
					if v == nil {
						continue
					}
					dfs(v)
				}
			}

		}
	}
	dfs(rawData)
	return result
}

func getProjectsV2(ctx context.Context, org string) ([]*ProjectV2, error) {
	var resp, err = githubGraphQLPost(ctx, listProjectsV2Query(org))
	if err != nil {
		return nil, err
	}
	var result = walkTree[ProjectV2](resp, ProjectV2FromJson)

	for _, r := range result {
		r.Tag = versionPattern.FindString(r.Name)
	}

	return result, nil
}

func githubGraphQLPost(ctx context.Context, query string) (map[string]any, error) {
	var token = os.Getenv("GITHUB_TOKEN")
	jsonQuery, err := json.Marshal(map[string]string{"query": query})
	if err != nil {
		return nil, err
	}

	client := &http.Client{}
	req, err := http.NewRequest(http.MethodPost, "https://api.github.com/graphql", bytes.NewBuffer(jsonQuery))
	if err != nil {
		log.Fatal(err)
	}

	req.Header = http.Header{
		"Content-Type":  {"application/json"},
		"Accept":        {"application/json"},
		"Authorization": {"Bearer " + token},
	}
	req = req.WithContext(ctx)
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	defer func() {
		_ = resp.Body.Close()
	}()

	responseBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var result map[string]any

	return result, json.Unmarshal(responseBody, &result)
}
