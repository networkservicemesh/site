+++
title = "Build docker images"
weight = 1
+++

# Build docker images

All Network Service Mesh applications are located in separate repositories and has [cmd prefix](https://github.com/networkservicemesh?q=cmd&type=all&language=&sort=). Next, look at exist ways to build image for `cmd` repositories.

## Docker build

Each `cmd` NSM repository has a Dockerfile. In most cases recommends use `docker build .` relative to the repository.


## Docker build with custom dependencies

For some cases we need to modify NSM dependencies of `cmd` application. In this case could be used different tactics with its pros and cons.

### Use a forked dependency

To simply build a docker image with changed code in NSM dependencies could be use a [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) dependencies.


Example:

1. Push the change into the fork (myrepo/sdk) as a branch `my-branch`.
2. Use `go get -u myrepo/sdk@my-branch. Note: Go will find the dependency and prints the `$version` of it, but returns an error as well. 
3. Write into go.mod of the repositry a replace directive `replace nsm/sdk => myrepo/sdk "$version"`
4. Run `docker build .`


### Use a local folder

Alternative way to add changed code into cmd could be using a `./local` folder that contains vendored dependencies. After that need to put the local replace into the go.mod.


Example:

1. mkdir local
2. cd local
3. git clone  git@github.com:edwarnicke/sdk.git
4. cd sdk
5. git remote add upstream git@github.com:networkservicemesh/sdk.git
6. cd ../..
7. Add a replace directive `replace nsm/sdk => ./local/myrepo/sdk`

