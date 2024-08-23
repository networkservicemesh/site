+++
title = "Contributing"
date = "2024-08-22"
weight = 4
showToC = true
+++

# Contributing Guidelines

The Network Service Mesh project accepts contributions via GitHub pull requests. This document outlines the process
to help get your contribution accepted.

## Issues

Any user can open an issue in any repository. We do not have a division of issues into types. It is not recommended to use one issue for several problems. For each problem it is worth opening its own issue.

## Pull Requests

All contributions come through pull requests. To submit a proposed change, we recommend following this workflow:

- Make sure there's an issue raised, which sets the expectations for the contribution you are about to make.
- Fork the relevant repo and create a new branch
- Create your change
  - Code changes require tests
- Commit with [DCO sign-off](#developer-certificate-of-origin-signing-your-work) and open a PR
- Wait for the CI process to finish and make sure all checks are green
- A maintainer of the project will be assigned, and you can expect a review within a few days


### Developer Certificate of Origin: Signing your work

#### Every commit needs to be signed

The Developer Certificate of Origin (DCO) is a lightweight way for contributors to certify that they wrote or otherwise have the right to submit the code they are contributing to the project. Here is the full text of the [DCO](https://developercertificate.org/), reformatted for readability:
```
By making a contribution to this project, I certify that:

    (a) The contribution was created in whole or in part by me and I have the right to submit it under the open source license indicated in the file; or

    (b) The contribution is based upon previous work that, to the best of my knowledge, is covered under an appropriate open source license and I have the right under that license to submit that work with modifications, whether created in whole or in part by me, under the same open source license (unless I am permitted to submit under a different license), as indicated in the file; or

    (c) The contribution was provided directly to me by some other person who certified (a), (b) or (c) and I have not modified it.

    (d) I understand and agree that this project and the contribution are public and that a record of the contribution (including all personal information I submit with it, including my sign-off) is maintained indefinitely and may be redistributed consistent with this project or the open source license(s) involved.
```

Contributors sign-off that they adhere to these requirements by adding a `Signed-off-by` line to commit messages.

```text
This is my commit message

Signed-off-by: Random J Developer <random@developer.example.org>
```

Git even has a `-s` command line option to append this automatically to your commit message:

```sh
git commit -s -m 'This is my commit message'
```

Each Pull Request is checked  whether or not commits in a Pull Request do contain a valid Signed-off-by line.

#### I didn't sign my commit, now what?!

No worries - You can easily replay your changes, sign them and force push them!

```sh
git checkout <branch-name>
git commit --amend --no-edit --signoff
git push --force-with-lease <remote-name> <branch-name>
```

## Code of Conduct

We follow the [CNCF Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md).

## Getting Involved
We encourage discussion on our mailing list and IRC channel and accept pull requests.
### Weekly Meetings
[![Weekly Meeting](https://img.shields.io/badge/Weekly%20Meeting%20Minutes-Tue%208am%20PT-blue.svg?style=plastic)](https://docs.google.com/document/d/1C9NKjo0PWNWypROEO9-Y6haw5h9Xmurvl14SXpciz2Y/edit#heading=h.rc9df0a6n3ng)
[![Calendar](https://img.shields.io/badge/Calendar-Subscribe-blue.svg?style=plastic)](https://calendar.google.com/calendar/embed?src=iae5pl3qbf2g5ehm6jb2h7gv08%40group.calendar.google.com&ctz=America%2FLos_Angeles)
### Communication Channels
[![Mailing List](https://img.shields.io/badge/Mailing%20List-networkservicemesh-blue.svg?style=plastic)](https://groups.google.com/forum/#!forum/networkservicemesh)
[![Slack Channel](https://img.shields.io/badge/Slack:-%23nsm%20on%20CNCF%20Slack-blue.svg?style=plastic&logo=slack)](https://cloud-native.slack.com/messages/CHQNNUPN1/)
[![Slack Channel](https://img.shields.io/badge/Slack:-%23nsm--dev%20on%20CNCF%20Slack-blue.svg?style=plastic&logo=slack)](https://cloud-native.slack.com/messages/CHSKJ4849/)
[![Slack Invite](https://img.shields.io/badge/Slack-CNCF%20Slack%20Invite-blue.svg?style=plastic&logo=slack)](https://slack.cncf.io/)
[![Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/nservicemesh)

## Security Policy

### Reporting a security issue
If you believe you have found a security issue in Network Service Mesh, please send a description of the issue to 
`security@networkservicemesh.io`. We will send a confirmation to acknowledge your report, and an additional email with the result of our assessment (normally within 1-2 working days).

### Supported versions

Note that Network Service Mesh is developed and maintained on one track, thus we encourage our users to follow our latest releases. For this reason we only investigate whether the reported issue is affecting the latest release of Network Service Mesh and provide a fix in a patch release on top of the latest release.