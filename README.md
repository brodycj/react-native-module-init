# react-native-module-init

[![GitHub](https://img.shields.io/github/license/brodybits/react-native-module-init?color=blue&style=for-the-badge)](./LICENSE.md)
[![npm](https://img.shields.io/npm/v/react-native-module-init?color=green&style=for-the-badge)](https://www.npmjs.com/package/react-native-module-init)

Interactive utility to create native React Native modules and views, with help from the following packages:

- [`brodybits/create-react-native-module`](https://github.com/brodybits/create-react-native-module) - based on [`frostney/react-native-create-library`](https://github.com/frostney/react-native-create-library) (programmatic API usage)
- [`terkelg/prompts`](https://github.com/terkelg/prompts)

less opinionated than [`react-native-community/bob`](https://github.com/react-native-community/bob)

## library module sample

```
brodybits@Christophers-MacBook-Air demo % react-native-module-init
ℹ react-native-module-init 0.3.0
✔ What is the desired native module name? … awesomeModule
✔ Should it be a view? … no / yes
✔ What is the full module package name? … react-native-awesome-module
✔ Initial package version is 1.0.0 - continue? … yes
✔ What is the desired native object class name prefix (can be blank)? … super
✔ Native class name is SUPERAwesomeModule. Continue? … yes
✔ Which native platforms? › Android, iOS
✔ What is the desired Android package id? … com.demo
✔ Support Apple tvOS (requires react-native-tvos fork)? … no
✔ What is the author name? … Christopher J. Brody
✔ What is the author email? … chris.brody+brodybits@gmail.com
✔ What is the GitHub user account name? … brodybits
✔ What license? … MIT
✔ Generate with sample use of Apple Networking? … no
ℹ It is possible to generate an example test app,
ℹ with workarounds in metro.config.js for metro linking issues
ℹ Requirements: react-native-cli and Yarn; pod is needed for iOS
✔ Generate the example app (with workarounds in metro.config.js)? … yes
✔ Example app name? … example
✔ What react-native version to use for the example app (should be at least react-native@0.60)? … react-native@latest
✔ Show the output of React Native CLI (recommended)? … no
ℹ checking that react-native CLI can show its version
✔ react-native CLI ok
ℹ checking that Yarn CLI can show its version
✔ Yarn CLI ok
ℹ generating the native library module as a package
CREATE new React Native module with the following options:

  root moduleName: react-native-awesome-module
  name: awesomeModule
  prefix: SUPER
  modulePrefix: react-native
  packageIdentifier: com.demo
  platforms: android,ios
  tvosEnabled: false
  githubAccount: brodybits
  authorName: Christopher J. Brody
  authorEmail: chris.brody+brodybits@gmail.com
  license: MIT
  view: false
  useAppleNetworking: false

CREATE: Generating the React Native library module
✔ native library module generated ok
ℹ generating the example app
ℹ generating App.js in the example app
ℹ rewrite metro.config.js with workaround solutions
✔ example app generated ok
ℹ adding the native library module into the example app as a dependency link
✔ added the native library module into the example app as a dependency link - ok
ℹ checking that the pod tool can show its version
✔ pod tool ok
ℹ starting additional pod install in ios subdirectory of example app
Detected React Native module pod for react-native-awesome-module
Analyzing dependencies
Downloading dependencies
Installing react-native-awesome-module (1.0.0)
Generating Pods project
Integrating client project
Pod installation complete! There are 29 dependencies from the Podfile and 27 total pods installed.
✔ additional pod install ok
💡 check out the example app in react-native-awesome-module/example
ℹ (/Users/brodybits/dev/demo/react-native-awesome-module/example)
💡 recommended: run Metro Bundler in a new shell
ℹ (cd react-native-awesome-module/example && yarn start)
💡 enter the following commands to run the example app:
ℹ cd react-native-awesome-module/example
ℹ react-native run-android
ℹ react-native run-ios
⚠ first steps in case of a clean checkout
ℹ run Yarn in react-native-awesome-module/example
ℹ (cd react-native-awesome-module/example && yarn)
ℹ do `pod install` for iOS in react-native-awesome-module/example/ios
ℹ (cd react-native-awesome-module/example/ios && pod install)
brodybits@Christophers-MacBook-Air demo % 
brodybits@Christophers-MacBook-Air demo % ls react-native-awesome-module      
README.md				index.js				react-native-awesome-module.podspec
android					ios
example					package.json
brodybits@Christophers-MacBook-Air demo % 
brodybits@Christophers-MacBook-Air demo % cat react-native-awesome-module/index.js 
import { NativeModules } from 'react-native';

const { SUPERAwesomeModule } = NativeModules;

export default SUPERAwesomeModule;
brodybits@Christophers-MacBook-Air demo % 
brodybits@Christophers-MacBook-Air demo % tree react-native-awesome-module/android    
react-native-awesome-module/android
├── README.md
├── build.gradle
└── src
    └── main
        ├── AndroidManifest.xml
        └── java
            └── com
                └── demo
                    ├── SUPERAwesomeModuleModule.java
                    └── SUPERAwesomeModulePackage.java

5 directories, 5 files
brodybits@Christophers-MacBook-Air demo % 
brodybits@Christophers-MacBook-Air demo % tree react-native-awesome-module/ios 
react-native-awesome-module/ios
├── SUPERAwesomeModule.h
├── SUPERAwesomeModule.m
├── SUPERAwesomeModule.xcodeproj
│   └── project.pbxproj
└── SUPERAwesomeModule.xcworkspace
    └── contents.xcworkspacedata

2 directories, 4 files
brodybits@Christophers-MacBook-Air demo % 
brodybits@Christophers-MacBook-Air demo % ls react-native-awesome-module/example 
App.js		android		babel.config.js	ios		node_modules	yarn.lock
__tests__	app.json	index.js	metro.config.js	package.json
```

## view module sample


```
ℹ react-native-module-init 0.3.0
✔ What is the desired native module name? … awesomeView
✔ Should it be a view? … no / yes
✔ View name is is AwesomeView. Continue? … yes
✔ What is the full module package name? … react-native-awesome-view
✔ Initial package version is 1.0.0 - continue? … yes
✔ What is the desired native object class name prefix (can be blank)? … super
✔ Native class name is SUPERAwesomeView. Continue? … yes
✔ Which native platforms? › Android, iOS
✔ What is the desired Android package id? … com.demo
✔ Support Apple tvOS (requires react-native-tvos fork)? … no
✔ What is the author name? … Christopher J. Brody
✔ What is the author email? … chris.brody+brodybits@gmail.com
✔ What is the GitHub user account name? … brodybits
✔ What license? … MIT
ℹ It is possible to generate an example test app,
ℹ with workarounds in metro.config.js for metro linking issues
ℹ Requirements: react-native-cli and Yarn; pod is needed for iOS
✔ Generate the example app (with workarounds in metro.config.js)? … yes
✔ Example app name? … example
✔ What react-native version to use for the example app (should be at least react-native@0.60)? … react-native@latest
✔ Show the output of React Native CLI (recommended)? … no
ℹ checking that react-native CLI can show its version
✔ react-native CLI ok
ℹ checking that Yarn CLI can show its version
✔ Yarn CLI ok
ℹ generating the native library module as a package
CREATE new React Native module with the following options:

  root moduleName: react-native-awesome-view
  name: AwesomeView
  prefix: SUPER
  modulePrefix: react-native
  packageIdentifier: com.demo
  platforms: android,ios
  tvosEnabled: false
  githubAccount: brodybits
  authorName: Christopher J. Brody
  authorEmail: chris.brody+brodybits@gmail.com
  license: MIT
  view: true
  useAppleNetworking: false

CREATE: Generating the React Native library module
✔ native library module generated ok
ℹ generating the example app
ℹ generating App.js in the example app
ℹ rewrite metro.config.js with workaround solutions
✔ example app generated ok
ℹ adding the native library module into the example app as a dependency link
✔ added the native library module into the example app as a dependency link - ok
ℹ checking that the pod tool can show its version
✔ pod tool ok
ℹ starting additional pod install in ios subdirectory of example app
Detected React Native module pod for react-native-awesome-view
Analyzing dependencies
Downloading dependencies
Installing react-native-awesome-view (1.0.0)
Generating Pods project
Integrating client project
Pod installation complete! There are 29 dependencies from the Podfile and 27 total pods installed.
✔ additional pod install ok
💡 check out the example app in react-native-awesome-view/example
ℹ (/Users/brodybits/dev/demo/react-native-awesome-view/example)
💡 recommended: run Metro Bundler in a new shell
ℹ (cd react-native-awesome-view/example && yarn start)
💡 enter the following commands to run the example app:
ℹ cd react-native-awesome-view/example
ℹ react-native run-android
ℹ react-native run-ios
⚠ first steps in case of a clean checkout
ℹ run Yarn in react-native-awesome-view/example
ℹ (cd react-native-awesome-view/example && yarn)
ℹ do `pod install` for iOS in react-native-awesome-view/example/ios
ℹ (cd react-native-awesome-view/example/ios && pod install)
brodybits@Christophers-MacBook-Air demo % 
brodybits@Christophers-MacBook-Air demo % 
brodybits@Christophers-MacBook-Air demo % ls react-native-awesome-view 
README.md				index.js				react-native-awesome-view.podspec
android					ios
example					package.json
brodybits@Christophers-MacBook-Air demo % 
brodybits@Christophers-MacBook-Air demo % cat react-native-awesome-view/index.js 
import { requireNativeComponent } from 'react-native';

const SUPERAwesomeView = requireNativeComponent('SUPERAwesomeView', null);

export default SUPERAwesomeView;
brodybits@Christophers-MacBook-Air demo % 
brodybits@Christophers-MacBook-Air demo % tree react-native-awesome-view/android 
react-native-awesome-view/android
├── README.md
├── build.gradle
└── src
    └── main
        ├── AndroidManifest.xml
        └── java
            └── com
                └── demo
                    ├── SUPERAwesomeViewManager.java
                    └── SUPERAwesomeViewPackage.java

5 directories, 5 files
brodybits@Christophers-MacBook-Air demo % 
brodybits@Christophers-MacBook-Air demo % tree react-native-awesome-view/ios 
react-native-awesome-view/ios
├── SUPERAwesomeView.h
├── SUPERAwesomeView.m
├── SUPERAwesomeView.xcodeproj
│   └── project.pbxproj
└── SUPERAwesomeView.xcworkspace
    └── contents.xcworkspacedata

2 directories, 4 files
brodybits@Christophers-MacBook-Air demo % 
brodybits@Christophers-MacBook-Air demo % ls react-native-awesome-view/example 
App.js		android		babel.config.js	ios		node_modules	yarn.lock
__tests__	app.json	index.js	metro.config.js	package.json
```
