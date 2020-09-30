<img src="http://www.proxym-group.com/wp-content/uploads/2015/01/logo-Proxym-Group-Final-vectorisé.png" alt="logo" width="120"/>
<br/>

# Analyse/build & deploy automation guideline

This guideline helps you to automate the static code analysis(via sonarqube), builds and deployments of your ReactNative based project.


## Setup Sonarqube

No need for specific setup actions.

Static code analysis is performed using the official [docker image of SonarScanner](https://hub.docker.com/r/sonarsource/sonar-scanner-cli).

Analysis reports will be available on Proxym-Group's [sonarqube server](https://sonar.proxym-group.net).

## Setup Firebase

In order to distribute your app using the 'Firebase App Distribution' service, you should prepare your application on the [firebase console](https://console.firebase.google.com/):

1. Create the android and ios apps.
2. Generate a CI token as described [here](https://firebase.google.com/docs/cli#cli-ci-systems).
3. Enable the AppDistribution service for your apps to be able to distribute builds.

## Setup gitlab CI/CD

### Step1
Add CI/CD secret variables (on your gitlab project's settings [Settings >> CI/CD >> Secret variables]):

* SONAR\_URL : https://sonar.proxym-group.net
* SONAR\_TOKEN : 08cf835ccfc8f225f5747b2ee0c73648368a905b
* FIREBASE\_TOKEN : \<\<the token that you have already retrived while setting up Firebase\>\>

### Step2
In order to distribute signed android builds you need to use a keystore file.

Please refer to the [android template](https://gitlab.proxym-group.net/TGO/ci-templates/android-template/) (Steps 2, 3 & 4) for more details about the creation and usage of the keystore.

For iOS, you need also to prepare signature resources as described on the [ios template](https://gitlab.proxym-group.net/TGO/ci-templates/ios-template), also you need to add the next secret variables:

* CI\_KEYCHAIN\_PASSWORD : Pr0xym-1T **(The keychain password)**
* MATCH\_PASSWORD : Pr0xym-1T **(The passphrase used to decrypt the certificates and provisionning profiles)**

### Step3
Copy fastlane config files.

For ios platform you need:

* ios/fastlane/Appfile
* ios/fastlane/Fastfile
* ios/fastlane/Matchfile
* ios/fastlane/Pluginfile
* ios/Gemfile
* ios/Gemfile.lock

and update as described on the [ios template](https://gitlab.proxym-group.net/TGO/ci-templates/ios-template).

### Step4
Create/update your '.gitlab-ci.yml' file. Here is an example:

```yml
variables:
  #ios runner variables
  USER_HOME: "/Users/support"
  CI_KEYCHAIN_NAME: "ci.keychain"
  CI_KEYCHAIN_PATH: "$USER_HOME/Library/Keychains/$CI_KEYCHAIN_NAME-db"
  #ios project variables
  APP_IDENTIFIER: "com.proxymit.react.template"
  SCHEME: "template"
  PROJECT: "template.xcodeproj"
  WORKSPACE: "template.xcworkspace"
  CONFIGURATION: "Release"
  CODE_SIGNING_IDENTITY: "iPhone Distribution"
  EXPORT_METHOD: "enterprise" #Available export methods are: app-store, ad-hoc, and enterprise.
  EXPORT_METHOD_ALIAS: "enterprise" #Use appstore, adhoc or enterprise.
  IPA_FILE_NAME: "ReactNativeTemplate"
  #firebase variables
  FIREBASE_IOS_APP_ID: "1:498597905872:ios:76b67932cfb77dbab565d5"
  FIREBASE_ANDROID_APP_ID: "1:498597905872:android:29d25a6decb35324b565d5"
  FIREBASE_TESTERS: "mourad.brahim@proxym-it.com,houcem.berrayana@proxym-group.com"

stages:
- review
- prepare
- build
- distribute

review:
  stage: review
  image: sonarsource/sonar-scanner-cli
  script:
    - sonar-scanner -Dsonar.host.url="$SONAR_URL" -Dsonar.login="$SONAR_TOKEN"
                    -Dsonar.projectKey="$CI_PROJECT_NAME-$(echo $CI_COMMIT_REF_NAME | tr / -)-$CI_PROJECT_ID"
                    -Dsonar.projectName="$CI_PROJECT_NAME [ $CI_COMMIT_REF_NAME ]"
                    -Dsonar.projectVersion="$CI_COMMIT_REF_NAME"
                    -Dsonar.analysis.projectId="$CI_PROJECT_ID"
                    -Dsonar.exclusions="ios/**, android/**"
  tags:
    - docker

prepare:
  stage: prepare
  image: node:14-alpine3.10
  script:
    - npm install
  tags:
    - docker
  only:
    - master
  artifacts:
    when: on_success
    paths:
      - ./node_modules/
    untracked: true
    expire_in: 2 hrs 

build:android: 
  stage: build
  image:  gitlab-registry.proxym-group.net/docker/android-react:29.0.2-gradle5.4.1
  dependencies:
    - prepare
  script: 
    - cd ./android
    - echo $CI_CD_KEYSTORE | base64 -d > ./release-key-pkcs12.keystore
    - gradle clean assembleRelease
  tags:
    - docker
  only:
    - master
  artifacts:
    when: on_success
    paths:
      - ./android/app/build/outputs/apk/release/app-release.apk
    expire_in: 2 hrs

build:ios:
  stage: build
  dependencies:
    - prepare
  script:
    - cd ./ios
    - bundle install
    - security unlock-keychain -p $CI_KEYCHAIN_PASSWORD $CI_KEYCHAIN_PATH
    - bundle exec fastlane ios prepare_signature project:"$PROJECT" configuration:"$CONFIGURATION" keychain_name:"$CI_KEYCHAIN_NAME" keychain_password:"$CI_KEYCHAIN_PASSWORD" app_identifier:"$APP_IDENTIFIER" export_method:"$EXPORT_METHOD" export_method_alias:"$EXPORT_METHOD_ALIAS" code_signing_identity:"$CODE_SIGNING_IDENTITY"
    - bundle exec fastlane ios build_and_export project:"$PROJECT" workspace:"$WORKSPACE" scheme:"$SCHEME" configuration:"$CONFIGURATION" app_identifier:"$APP_IDENTIFIER" export_method:"$EXPORT_METHOD" export_method_alias:"$EXPORT_METHOD_ALIAS" output_name:"$IPA_FILE_NAME.ipa"
  tags:
    - ios
  only:
    - master
  artifacts:
    when: on_success
    paths:
      - ./ios/$IPA_FILE_NAME.ipa
      - ./ios/$IPA_FILE_NAME.app.dSYM.zip
    expire_in: 2 hrs

distribute:android: 
  stage: distribute
  dependencies:
    - build:android
  image: gitlab-registry.proxym-group.net/docker/firebase-tools:latest
  script:
    - cd ./android
    - mv ./app/build/outputs/apk/release/app-release.apk ./app-release.apk
    - firebase appdistribution:distribute ./app-release.apk --app $FIREBASE_ANDROID_APP_ID --testers $FIREBASE_TESTERS
  tags:
    - docker
  only:
    - master
  when: manual

distribute:ios:
  stage: distribute
  dependencies:
    - build:ios
  image: gitlab-registry.proxym-group.net/docker/firebase-tools:latest
  script:
    - cd ./ios
    - firebase appdistribution:distribute ./$IPA_FILE_NAME.ipa --app $FIREBASE_IOS_APP_ID --testers $FIREBASE_TESTERS
  tags:
    - docker
  only:
    - master
  when: manual

```

**Notes:** 

- You can find the available images on this registries:
	* [Android-React registry](https://gitlab.proxym-group.net/docker/android-react/container_registry).
	* [Firebase registry](https://gitlab.proxym-group.net/docker/firebase-tools/container_registry).

- Other docker images could be created if needed.