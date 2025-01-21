package main

import (
	"context"
	"log"
	"os"
	"path/filepath"
	"strings"
	"text/template"

	"github.com/kelseyhightower/envconfig"
)

type Config struct {
	Orgianization string `default:"networkservicemesh"`
	ReleasesDir   string `default:"content/docs/releases"`
	RoadmapDir    string `default:"content/docs/roadmap"`
}

const notesTemplate = `
+++
short="{{ .Tag }}"
title = "Release {{ .Tag }}"
date="{{ .ReleaseDate }}"
+++

{{ if not .IsReleased }}
# Schedule 

{{ .Readme }}

{{ end }}
# {{ .Name }} 


{{ if .IsReleased }}
NSM {{ .Tag }} has been tested on:
- [kind](https://github.com/networkservicemesh/integration-k8s-kind/actions?query=branch%3Arelease%2F{{ .Tag }}+)
- [GKE](https://github.com/networkservicemesh/integration-k8s-gke/actions?query=branch%3Arelease%2F{{ .Tag }}+)
{{ end }}

## Changes since last release

{{ range .PlannedIssues }}

### {{ .Name }}

{{ .Description }}

[See more details]({{ .Url }})
{{ end }}

## System stability fixes and improvements

{{ range .Issues }}

### {{ .Name }}

{{ .Description }}

[See more details]({{ .Url }})
{{ end }}


## Release project board

[Notes based on]({{ .Url }})
`

const roadMapTemplate = `
`

func main() {
	c := new(Config)
	if err := envconfig.Usage("nsm", c); err != nil {
		log.Fatal(err)
	}
	if err := envconfig.Process("nsm", c); err != nil {
		log.Fatalf("error processing rootConf from env: %+v", err)
	}

	projects, err := getProjectsV2(context.Background(), "networkservicemesh")
	if err != nil {
		panic(err.Error())
	}

	for _, v := range projects {
		v.Name = "NSM " + v.Name
		if v.IsDraft() {
			v.Name = "[DRAFT] " + v.Name
		}
		issues, err := GetOrFetchIssues(context.Background(), v.Id)
		if err != nil {
			panic(err.Error())
		}
		var plannedIssues, otherIssues []*Issue
		for _, issue := range issues {
			desc := issue.Description
			issue.Description = parseSection("Motivation", desc)
			if issue.Description == "" {
				issue.Description = parseSection("Description", desc)
			}
			if issue.Description == "" {
				issue.Description = "Status: RESOLVED."
			}
			planned := false
			for _, field := range issue.Fields {
				if field.Value == "Roadmap" {
					planned = true
					break
				}
			}
			if issue.Resolved() {
				if planned {
					plannedIssues = append(plannedIssues, issue)
				} else {
					otherIssues = append(otherIssues, issue)
				}
			}
		}

		tmpl, err := template.New("release").Parse(notesTemplate)
		if err != nil {
			panic(err.Error())
		}
		var sb strings.Builder

		err = tmpl.Execute(&sb, &Input{
			ProjectV2:     v,
			PlannedIssues: plannedIssues,
			Issues:        otherIssues,
		})
		if err != nil {
			panic(err.Error())
		}

		_ = os.WriteFile(filepath.Join(c.ReleasesDir, v.Tag+".md"), []byte(sb.String()), os.ModePerm)
	}
}

type Input struct {
	*ProjectV2
	PlannedIssues []*Issue
	Issues        []*Issue
}

func parseSection(section, s string) string {
	const sectionEnd = "#"

	start := strings.Index(s, section)
	if start == -1 {
		return ""
	}

	s = s[start+len(section):]

	var end, offset int
	for blockEnd := 0; ; offset += blockEnd {
		if end = strings.Index(s[offset:], sectionEnd); end < 0 {
			return s
		}

		if blockEnd = skipBlocks(s[offset:], end); blockEnd < end {
			break
		}
	}
	return strings.TrimSpace(s[:end+offset])
}

func skipBlocks(s string, sectionEnd int) (end int) {
	const blockDelim = "```"

	for start := strings.Index(s[end:], blockDelim); start > 0; start = strings.Index(s[end:], blockDelim) {
		if start += end + len(blockDelim); start > sectionEnd {
			return end
		}

		if end = strings.Index(s[start:], blockDelim); end < 0 {
			return len(s)
		}
		end += start + len(blockDelim)
	}
	return end
}
