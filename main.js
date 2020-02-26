const prompts = require('prompts')

const path = require('path')

// used in quick workaround for
// https://github.com/terkelg/prompts/issues/252
const ansiEscapes = require('ansi-escapes')

const bulb = require('emoji-bulb')

const createReactNativeLibraryModule = require('create-react-native-module')
const exampleTemplates = require('create-react-native-module/templates/example')

const execa = require('execa')

const fs = require('fs-extra')

const logSymbols = require('log-symbols')

const { paramCase } = require('param-case')
const { pascalCase } = require('pascal-case')

const updateNotifier = require('update-notifier')

const pkg = require('./package.json')

const BULB = bulb
const INFO = logSymbols.info
const OK = logSymbols.success
const ERROR = logSymbols.error

// used in quick workaround for
// https://github.com/terkelg/prompts/issues/252
const SHOW_CURSOR = ansiEscapes.cursorShow
const NEWLINE = '\n'

const REACT_NATIVE_PREFIX = 'react-native-'

const EXAMPLE_APP_JS_FILENAME = 'App.js'

// rewrite metro.config.js with workaround solutions
const EXAMPLE_METRO_CONFIG_FILENAME = 'metro.config.js'
const EXAMPLE_METRO_CONFIG_WORKAROUND = `// metro.config.js
// with workaround solutions

const path = require('path')

module.exports = {
  // workaround for issue with symlinks encountered starting with
  // metro@0.55 / React Native 0.61
  // (not needed with React Native 0.60 / metro@0.54)
  resolver: {
    extraNodeModules: new Proxy(
      {},
      { get: (_, name) => path.join('.', 'node_modules', name) }
    )
  },

  // quick workaround solution for issue with symlinked modules ref:
  // https://github.com/brodybits/create-react-native-module/issues/232
  watchFolders: ['.', '..']
}
`

// quick workaround ref:
// https://github.com/terkelg/prompts/issues/252
const onState = ({ aborted }) => {
  if (aborted) {
    process.stdout.write(ansiEscapes.cursorShow)
    process.stdout.write(NEWLINE)
    process.exit(1)
  }
}

// with quick workaround for
// https://github.com/terkelg/prompts/issues/252
const prompt = props => prompts([{ onState, ...props }])

const promptForConfirmation = async message => {
  const { confirmation } = await prompt({
    type: 'confirm',
    name: 'confirmation',
    message,
    initial: true
  })

  if (!confirmation) process.exit(1)
}

// notify the user (...)
const notifier = updateNotifier({ pkg })
notifier.notify()

// using Promise.resolve().then(...) to avoid possible issue with
// IIFE directly after expression with no semicolon
Promise.resolve().then(async () => {
  // Show the tool info:
  console.log(INFO, pkg.name, pkg.version)

  const { nativeModuleNameInput } = await prompt({
    type: 'text',
    name: 'nativeModuleNameInput',
    message: 'What is the desired native module name?',
    validate: nativeModuleNameInput =>
      nativeModuleNameInput.length > 0 &&
      paramCase(nativeModuleNameInput).length > 0
  })

  const nameParamCase = paramCase(nativeModuleNameInput)

  const namePascalCase = pascalCase(nativeModuleNameInput)

  const { isView } = await prompt({
    type: 'toggle',
    name: 'isView',
    message: `Should it be a view?`,
    initial: false,
    active: 'yes',
    inactive: 'no'
  })

  // view name needs to be in PascalCase to work with jsx
  if (isView) {
    await promptForConfirmation(`View name is is ${namePascalCase}. Continue?`)
  }

  const nativeModuleName = isView ? namePascalCase : nativeModuleNameInput

  const initialModulePackageName = nameParamCase.startsWith(REACT_NATIVE_PREFIX)
    ? nameParamCase
    : REACT_NATIVE_PREFIX.concat(nameParamCase)

  const { modulePackageName } = await prompt({
    type: 'text',
    name: 'modulePackageName',
    message: 'What is the full module package name?',
    initial: initialModulePackageName,
    validate: modulePackageName => modulePackageName.length > 0
  })

  // FUTURE TBD it should be possible for the user to enter a different
  // inital package version value to start with
  await promptForConfirmation('Initial package version is 1.0.0 - continue?')

  const { nativeObjectClassNamePrefixInput } = await prompt({
    type: 'text',
    name: 'nativeObjectClassNamePrefixInput',
    message:
      'What is the desired native object class name prefix (can be blank)?',
    initial: ''
  })

  // quick solution to get the prefix in upper case, in a way that can
  // be part of a native class name (with no symbols, etc.)
  nativeObjectClassNamePrefix = pascalCase(
    nativeObjectClassNamePrefixInput
  ).toUpperCase()

  await promptForConfirmation(
    `Native class name is ${nativeObjectClassNamePrefix.concat(
      namePascalCase
    )}. Continue?`
  )

  const { platforms } = await prompt({
    type: 'multiselect',
    name: 'platforms',
    message: 'Which native platforms?',
    choices: [
      { title: 'Android', value: 'android', selected: true },
      { title: 'iOS', value: 'ios', selected: true },
      { title: 'Windows', value: 'windows', disabled: true }
    ],
    min: 1
  })

  const { androidPackageId } =
    platforms.indexOf('android') !== -1
      ? await prompts({
          type: 'text',
          name: 'androidPackageId',
          message: 'What is the desired Android package id?',
          onState,
          initial: 'com.demo',
          validate: androidPackageId => androidPackageId.length > 0
        })
      : { androidPackageId: null }

  // THANKS to @react-native-community/bob for the idea
  // to get user name & email from git
  const gitUserName = (await execa('git', ['config', 'user.name'])).stdout
  const gitUserEmail = (await execa('git', ['config', 'user.email'])).stdout

  const { authorName } = await prompt({
    type: 'text',
    name: 'authorName',
    message: 'What is the author name?',
    initial: gitUserName
  })

  const { authorEmail } = await prompt({
    type: 'text',
    name: 'authorEmail',
    message: 'What is the author email?',
    initial: gitUserEmail
  })

  const { license } = await prompt({
    type: 'text',
    name: 'license',
    message: 'What license?',
    initial: 'MIT'
  })

  console.log(INFO, 'It is possible to generate an example test app,')
  console.log(
    INFO,
    'with workarounds in metro.config.js for metro linking issues'
  )
  console.log(
    INFO,
    'Requirements: react-native-cli and Yarn; pod is needed for iOS'
  )

  const { generateExampleApp } = await prompt({
    type: 'confirm',
    name: 'generateExampleApp',
    message: 'Generate the example app (with workarounds in metro.config.js)?',
    initial: true
  })

  const { reactNativeVersion } = generateExampleApp
    ? await prompt({
        type: 'text',
        name: 'reactNativeVersion',
        message:
          'What react-native version to use for the example app (should be at least react-native@0.60)?',
        initial: 'react-native@latest'
      })
    : null

  const { showReactNativeOutput } = generateExampleApp
    ? await prompt({
        type: 'confirm',
        name: 'showReactNativeOutput',
        message: 'Show the output of React Native CLI (recommended)?',
        initial: true
      })
    : null

  if (generateExampleApp) {
    console.log(INFO, 'checking that react-native CLI can show its version')
    try {
      await execa('react-native', ['--version'])
    } catch (e) {
      console.log(ERROR, 'react-native CLI not installed correctly')
      process.exit(1)
    }
    console.log(OK, 'react-native CLI ok')

    console.log(INFO, 'checking that Yarn CLI can show its version')
    try {
      await execa('yarn', ['--version'])
    } catch (e) {
      console.log(ERROR, 'Yarn CLI not installed correctly')
      process.exit(1)
    }
    console.log(OK, 'Yarn CLI ok')
  }

  console.log(INFO, 'generating the native library module as a package')

  const createOptions = {
    name: nativeModuleName,
    prefix: nativeObjectClassNamePrefix,
    moduleName: modulePackageName,
    packageIdentifier: androidPackageId,
    platforms,
    authorName,
    authorEmail,
    view: isView
  }

  createReactNativeLibraryModule(createOptions)

  console.log(OK, 'native library module generated ok')

  if (generateExampleApp) {
    console.log(INFO, 'generating the example app')

    const exampleAppTemplate = exampleTemplates.slice(-1)[0]

    const exampleAppName = 'example'

    const generateExampleAppOptions = ['--version', reactNativeVersion]

    await execa(
      'react-native',
      ['init', exampleAppName].concat(generateExampleAppOptions),
      {
        cwd: path.join(process.cwd(), modulePackageName),
        stdout: showReactNativeOutput ? 'inherit' : null,
        stderr: showReactNativeOutput ? 'inherit' : null
      }
    )

    console.log(INFO, 'generating App.js in the example app')

    await fs.outputFile(
      path.join(
        process.cwd(),
        modulePackageName,
        exampleAppName,
        EXAMPLE_APP_JS_FILENAME
      ),
      exampleAppTemplate.content(createOptions)
    )

    // rewrite metro.config.js with workaround solutions
    console.log(
      INFO,
      `rewrite ${EXAMPLE_METRO_CONFIG_FILENAME} with workaround solutions`
    )
    await fs.outputFile(
      path.join(
        process.cwd(),
        modulePackageName,
        exampleAppName,
        EXAMPLE_METRO_CONFIG_FILENAME
      ),
      EXAMPLE_METRO_CONFIG_WORKAROUND
    )

    console.log(OK, 'example app generated ok')

    console.log(
      INFO,
      'adding the native library module into the example app as a dependency link'
    )

    await execa('yarn', ['add', 'link:../'], {
      cwd: path.join(process.cwd(), modulePackageName, exampleAppName),
      stdout: showReactNativeOutput ? 'inherit' : null,
      stderr: showReactNativeOutput ? 'inherit' : null
    })

    console.log(
      OK,
      'added the native library module into the example app as a dependency link - ok'
    )

    if (platforms.indexOf('ios') !== -1) {
      // NOTE that the React Native CLI would offer to install the pod tool,
      // if needed (on macOS)
      console.log(INFO, 'checking that the pod tool can show its version')

      try {
        await execa('pod', ['--version'])
      } catch (e) {
        console.log(ERROR, 'pod tool not installed correctly')
        process.exit(1)
      }

      console.log(OK, 'pod tool ok')

      console.log(
        INFO,
        'starting additional pod install in ios subdirectory of example app'
      )

      try {
        await execa('pod', ['install'], {
          cwd: path.join(
            process.cwd(),
            modulePackageName,
            exampleAppName,
            'ios'
          ),
          stdout: 'inherit',
          stderr: 'inherit'
        })
      } catch (e) {
        process.exit(1)
      }

      console.log(OK, 'additional pod install ok')
    }

    // to show the subdirectory path of the example app:
    const exampleAppSubdirectory = path.join(modulePackageName, exampleAppName)
    // show the example app info:
    console.log(BULB, `check out the example app in ${exampleAppSubdirectory}`)
    console.log(BULB, 'recommended: run Metro Bundler in a new shell')
    console.log(INFO, `(cd ${exampleAppSubdirectory} && yarn start)`)
    console.log(BULB, 'enter the following commands to run the example app:')
    console.log(INFO, `cd ${exampleAppSubdirectory}`)
    platforms.forEach(platform => {
      console.log(INFO, `react-native run-${platform}`)
    })
  }
})
