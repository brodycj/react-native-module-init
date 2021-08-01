# react-native-module-init

[![GitHub](https://img.shields.io/github/license/brodybits/react-native-module-init?color=blue&style=for-the-badge)](./LICENSE.md)
[![npm](https://img.shields.io/npm/v/react-native-module-init?color=green&style=for-the-badge)](https://www.npmjs.com/package/react-native-module-init)

Interactive utility to create native React Native modules and views, with some major help from:

- [`brodybits/create-react-native-module`](https://github.com/brodybits/create-react-native-module) - based on [`frostney/react-native-create-library`](https://github.com/frostney/react-native-create-library) (programmatic API usage)
- [`terkelg/prompts`](https://github.com/terkelg/prompts)
- [`react-native-community/cli`](https://github.com/react-native-community/cli) via [`brodybits/react-native-init-func`](https://github.com/brodybits/react-native-init-func)

less opinionated than [`react-native-community/bob`](https://github.com/react-native-community/bob)

## library module demo

```console
brodybits@brodybits-mini-mac-book work % react-native-module-init
ℹ react-native-module-init 0.5.0
✔ What is the desired native module name? … awesome module
✔ Should it be a view? … no / yes
ℹ OK, continuing with isView: false
✔ What is the full native module package name? … react-native-awesome-module
✔ Initial package version is 1.0.0 - continue? … yes
✔ What is the desired native object class name prefix (can be blank)? … super
✔ Desired object class name to use between JavaScript & native code? … SUPERAwesomeModule
✔ Which native platforms? › Android, iOS
✔ What is the desired Android package id? … com.demo
✔ Support Apple tvOS (requires react-native-tvos fork)? … no
✔ What is the author name? … Christopher J. Brody
✔ What is the author email? … chris.brody+brodybits@gmail.com
✔ What is the GitHub user account name? … brodybits
✔ What license? … MIT
✔ Generate with sample use of Apple Networking? … no
ℹ It is possible to generate an example app for testing,
ℹ with workarounds in metro.config.js for metro linking issues
ℹ Requirements: Yarn; pod is needed for iOS
✔ Generate the example app (with workarounds in metro.config.js)? … yes
✔ Example app name? … example
✔ What react-native template to use for the example app (should be for at least react-native@0.60)? … react-native@latest
ℹ checking that Yarn CLI can show its version
✔ Yarn CLI ok
ℹ generating the native library module as a package
CREATE new React Native module with the following options:

                        name: awesome module
           full package name: react-native-awesome-module
                     is view: false
           object class name: SUPERAwesomeModule
     Android nativePackageId: com.demo
                   platforms: android,ios
           Apple tvosEnabled: false
                  authorName: Christopher J. Brody
                 authorEmail: chris.brody+brodybits@gmail.com
        author githubAccount: brodybits
                     license: MIT
          useAppleNetworking: false

CREATE: Generating the React Native library module
✔ native library module generated ok
ℹ generating the example app
[...]
ℹ generating App.js in the example app
ℹ rewrite metro.config.js with workaround solutions
✔ example app generated ok
ℹ adding the native library module into the example app as a dependency link
yarn add v1.22.11
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning "react-native > react-native-codegen > jscodeshift@0.11.0" has unmet peer dependency "@babel/preset-env@^7.1.6".
warning "@react-native-community/eslint-config > @typescript-eslint/eslint-plugin > tsutils@3.21.0" has unmet peer dependency "typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta".
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ react-native-awesome-module@0.0.0
info All dependencies
└─ react-native-awesome-module@0.0.0
✨  Done in 9.52s.
✔ added the native library module into the example app as a dependency link - ok
ℹ checking that the pod tool can show its version
✔ pod tool ok
ℹ starting additional pod install in ios subdirectory of example app
Auto-linking React Native module for target `example`: react-native-awesome-module
Analyzing dependencies
Downloading dependencies
Installing react-native-awesome-module (1.0.0)
Generating Pods project
Integrating client project
Pod installation complete! There are 50 dependencies from the Podfile and 41 total pods installed.
✔ additional pod install ok
💡 check out the example app in react-native-awesome-module/example
ℹ (/Users/brodybits/work/react-native-awesome-module/example)
💡 recommended: run Metro Bundler in a new shell
ℹ (cd react-native-awesome-module/example && yarn start)
💡 enter the following commands to run the example app:
ℹ cd react-native-awesome-module/example
ℹ yarn android # for React Native 0.60: npx react-native run-android
ℹ yarn ios # for React Native 0.60: npx react-native run-ios
⚠ first steps in case of a clean checkout
ℹ run Yarn in react-native-awesome-module/example
ℹ (cd react-native-awesome-module/example && yarn)
ℹ do `pod install` for iOS in react-native-awesome-module/example/ios
ℹ (cd react-native-awesome-module/example/ios && pod install)
brodybits@brodybits-mini-mac-book work %
brodybits@brodybits-mini-mac-book work % ls react-native-awesome-module
README.md				ios
android					package.json
example					react-native-awesome-module.podspec
index.js
brodybits@brodybits-mini-mac-book work %
brodybits@brodybits-mini-mac-book work % cat react-native-awesome-module/index.js
// main index.js

import { NativeModules } from 'react-native';

const { SUPERAwesomeModule } = NativeModules;

export default SUPERAwesomeModule;
brodybits@brodybits-mini-mac-book work %
brodybits@brodybits-mini-mac-book work % tree react-native-awesome-module/android
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
brodybits@brodybits-mini-mac-book work %
brodybits@brodybits-mini-mac-book work % tree react-native-awesome-module/ios
react-native-awesome-module/ios
├── SUPERAwesomeModule.h
├── SUPERAwesomeModule.m
├── SUPERAwesomeModule.xcodeproj
│   └── project.pbxproj
└── SUPERAwesomeModule.xcworkspace
    └── contents.xcworkspacedata

2 directories, 4 files
brodybits@brodybits-mini-mac-book work %
brodybits@brodybits-mini-mac-book work % ls react-native-awesome-module/example
App.js		android		babel.config.js	ios		node_modules	yarn.lock
__tests__	app.json	index.js	metro.config.js	package.json
```

## view module demo

```console
brodybits@brodybits-mini-mac-book work % react-native-module-init
ℹ react-native-module-init 0.5.0
✔ What is the desired native module name? … awesome view
✔ Should it be a view? … no / yes
ℹ OK, continuing with isView: true
✔ What is the full native view package name? … react-native-awesome-view
✔ Initial package version is 1.0.0 - continue? … yes
✔ What is the desired native object class name prefix (can be blank)? … super
✔ Desired object class name to use between JavaScript & native code? … SUPERAwesomeView
✔ Which native platforms? › Android, iOS
✔ What is the desired Android package id? … com.demo
✔ Support Apple tvOS (requires react-native-tvos fork)? … no
✔ What is the author name? … Christopher J. Brody
✔ What is the author email? … chris.brody+brodybits@gmail.com
✔ What is the GitHub user account name? … brodybits
✔ What license? … MIT
ℹ It is possible to generate an example app for testing,
ℹ with workarounds in metro.config.js for metro linking issues
ℹ Requirements: Yarn; pod is needed for iOS
✔ Generate the example app (with workarounds in metro.config.js)? … yes
✔ Example app name? … example
✔ What react-native template to use for the example app (should be for at least react-native@0.60)? … react-native@latest
ℹ checking that Yarn CLI can show its version
✔ Yarn CLI ok
ℹ generating the native library module as a package
CREATE new React Native module with the following options:

                        name: awesome view
           full package name: react-native-awesome-view
                     is view: true
           object class name: SUPERAwesomeView
     Android nativePackageId: com.demo
                   platforms: android,ios
           Apple tvosEnabled: false
                  authorName: Christopher J. Brody
                 authorEmail: chris.brody+brodybits@gmail.com
        author githubAccount: brodybits
                     license: MIT
          useAppleNetworking: false

CREATE: Generating the React Native library module
✔ native library module generated ok
ℹ generating the example app
[...]
ℹ generating App.js in the example app
ℹ rewrite metro.config.js with workaround solutions
✔ example app generated ok
ℹ adding the native library module into the example app as a dependency link
yarn add v1.22.11
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning "react-native > react-native-codegen > jscodeshift@0.11.0" has unmet peer dependency "@babel/preset-env@^7.1.6".
warning "@react-native-community/eslint-config > @typescript-eslint/eslint-plugin > tsutils@3.21.0" has unmet peer dependency "typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta".
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ react-native-awesome-view@0.0.0
info All dependencies
└─ react-native-awesome-view@0.0.0
✨  Done in 13.75s.
✔ added the native library module into the example app as a dependency link - ok
ℹ checking that the pod tool can show its version
✔ pod tool ok
ℹ starting additional pod install in ios subdirectory of example app
Auto-linking React Native module for target `example`: react-native-awesome-view
Analyzing dependencies
Downloading dependencies
Installing react-native-awesome-view (1.0.0)
Generating Pods project
Integrating client project
Pod installation complete! There are 50 dependencies from the Podfile and 41 total pods installed.
✔ additional pod install ok
💡 check out the example app in react-native-awesome-view/example
ℹ (/Users/brodybits/work/react-native-awesome-view/example)
💡 recommended: run Metro Bundler in a new shell
ℹ (cd react-native-awesome-view/example && yarn start)
💡 enter the following commands to run the example app:
ℹ cd react-native-awesome-view/example
ℹ yarn android # for React Native 0.60: npx react-native run-android
ℹ yarn ios # for React Native 0.60: npx react-native run-ios
⚠ first steps in case of a clean checkout
ℹ run Yarn in react-native-awesome-view/example
ℹ (cd react-native-awesome-view/example && yarn)
ℹ do `pod install` for iOS in react-native-awesome-view/example/ios
ℹ (cd react-native-awesome-view/example/ios && pod install)
brodybits@brodybits-mini-mac-book work %
brodybits@brodybits-mini-mac-book work % ls react-native-awesome-view
README.md				ios
android					package.json
example					react-native-awesome-view.podspec
index.js
brodybits@brodybits-mini-mac-book work %
brodybits@brodybits-mini-mac-book work % cat react-native-awesome-view/index.js
// main index.js

import { requireNativeComponent } from 'react-native';

const SUPERAwesomeView = requireNativeComponent('SUPERAwesomeView', null);

export default SUPERAwesomeView;
brodybits@brodybits-mini-mac-book work %
brodybits@brodybits-mini-mac-book work % tree react-native-awesome-view/android
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
brodybits@brodybits-mini-mac-book work %
brodybits@brodybits-mini-mac-book work % tree react-native-awesome-view/ios
react-native-awesome-view/ios
├── SUPERAwesomeView.h
├── SUPERAwesomeView.m
├── SUPERAwesomeView.xcodeproj
│   └── project.pbxproj
└── SUPERAwesomeView.xcworkspace
    └── contents.xcworkspacedata

2 directories, 4 files
brodybits@brodybits-mini-mac-book work %
brodybits@brodybits-mini-mac-book work % ls react-native-awesome-view/example
App.js		android		babel.config.js	ios		node_modules	yarn.lock
__tests__	app.json	index.js	metro.config.js	package.json
brodybits@brodybits-mini-mac-book work %
brodybits@brodybits-mini-mac-book work %
```
