+++
title = "Preparing a macOS host to run Network Service Mesh"
short = "MacOS"
weight = 2
+++


[Docker desktop](https://www.docker.com/products/docker-desktop) installed from the official packages

Please ensure that Docker is started, or optionally select "Start Docker Desktop when you log in" on the General tab in Docker's Preferences.

The rest of the pre-requisites can be easily installed with `brew`.

```bash
brew install kubectl && brew cask install virtualbox vagrant
```
