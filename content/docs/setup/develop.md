+++
title = "Develop"
weight = 3
+++
## Integration Testing

```bash
make k8s-integration-tests
```

or one by one using the test name. For example, to trigger `TestExec`, run:

```bash
make k8s-integration-TestExec-test
```

## Helpful Logging tools

In the course of developing NSM, you will often find yourself wanting to look at logs for various NSM components.

The following:

```bash
make k8s-nsmd-logs
```

will dump all the logs for all running `nsmd` Pods in the cluster (you are going to want to redirect these to a file).

This works for any component in the system.

## Regenerating code

If you change [types.go](https://github.com/networkservicemesh/networkservicemesh/blob/master/k8s/pkg/apis/networkservice/v1alpha1/types.go) or any of the .proto files you will need to be able to run ```go generate ./...``` to regenerate the code.

For rerunning the code generation the required dependencies are retrieved with the script:

```bash
./scripts/prepare-generate.sh
```

To regenerate code:

```bash
go generate ./...
```

**NOTE:**  The script `scripts/install-protoc.sh` will download a released version of `protoc`, however,
at the time of this writing there are no `protoc` releases built with the `grpc` plugin functionality
made use of by the `networkservicemesh` project.  Specifically, the `UnimplementedServer*` method
generation is missing.

## Updating Deps

If you need to add new dependencies, run:

```bash
go mod tidy
```

## Shellcheck

As part of our CI, we run shellcheck on all shell scripts in the repo.
If you want to run it locally, you need to [install shellcheck](https://github.com/koalaman/shellcheck#installing)

## Canonical source on how to build

The [.circleci/config.yml](https://github.com/networkservicemesh/networkservicemesh/blob/master/.circleci/config.yml) file is the canonical source of how to build Network Service Mesh in case this file becomes out of date.

## Code formatting
We use `goimports` tool since it formats the code in the same style as `go fmt` and organizes imports additionally.

To install it run:
```bash
make install-formatter
```

To do formatting run:
```bash
make format
```

It may be useful to have `goimports -w -local github.com/networkservicemesh/networkservicemesh` installed as on save hook in your editor. [Go imports doc page](https://godoc.org/golang.org/x/tools/cmd/goimports) may help you to achieve this.

## Static analysis of code
Get code static analyzer tool:
```bash
make lint-install
```
Make sure that tools is installed and can be used from terminal:
```bash
golangci-lint --version
```
If the command above doesn't work make sure the tool exists in `go/bin` directory.

Checking changes:
```bash
make lint-check-diff
```
Checking changes with memory limitation:
```bash
GOGC=30 make lint-check-diff
```
Checking all code in the project:
```bash 
make lint-check-all
```
If you have any unsolvable problem with a concrete linter then consider updating `.golanci.yaml` 
