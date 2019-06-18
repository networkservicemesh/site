+++
title = "Preparing a macOS host to run Network Service Mesh"
short = "macOS"
weight = 2
aliases = ["/docs/setup/osx"]
+++


First, install [Docker Desktop](https://www.docker.com/products/docker-desktop) from the official packages.

Then ensure that Docker is started or optionally select **Start Docker Desktop when you log in** on the **General** tab in Docker's preferences.

The rest of the pre-requisites can be easily installed using [Homebrew](https://brew.sh).

```bash
brew install kubectl && brew cask install virtualbox vagrant
```
