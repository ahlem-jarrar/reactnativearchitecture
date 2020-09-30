fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## iOS
### ios build_and_test
```
fastlane ios build_and_test
```
Build and test
### ios build_and_export
```
fastlane ios build_and_export
```
Export a distribution build
### ios analyse
```
fastlane ios analyse
```
Static code analysis
### ios deliver_fabric
```
fastlane ios deliver_fabric
```
Deploys a new build on Fabric
### ios deliver_firebase
```
fastlane ios deliver_firebase
```
Deploys a new build on Firebase
### ios deliver_testflight
```
fastlane ios deliver_testflight
```
Deploys a new build on TestFlight
### ios prepare_signature
```
fastlane ios prepare_signature
```
Import and install the right certificate and provisionning profile

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
