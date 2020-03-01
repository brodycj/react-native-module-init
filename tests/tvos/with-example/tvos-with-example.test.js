const mockCallSnapshot = []

mockPromptResponses = {
  nativeModuleNameInput: { nativeModuleNameInput: 'test module for tvOS' },
  isView: { isView: false },
  confirmation: { confirmation: true },
  modulePackageName: { modulePackageName: 'react-native-tvos-test-module' },
  nativeObjectClassNamePrefixInput: {
    nativeObjectClassNamePrefixInput: 'native'
  },
  platforms: { platforms: ['android', 'ios'] },
  androidPackageId: { androidPackageId: 'com.test' },
  tvosEnabled: { tvosEnabled: true },
  authorName: { authorName: 'Ada' },
  authorEmail: { authorEmail: 'ada@lovelace.name' },
  githubUserAccountName: { githubUserAccountName: 'ada-lovelace' },
  license: { license: 'BSD-4-CLAUSE' },
  generateExampleApp: { generateExampleApp: true },
  reactNativeVersion: { reactNativeVersion: 'react-native-tvos@latest' },
  exampleAppName: { exampleAppName: 'example' },
  showReactNativeOutput: { showReactNativeOutput: true }
}

jest.mock('console', () => ({
  log: (..._) => {
    /* do nothing */
  }
}))

jest.mock('prompts', () => prompts => {
  expect(Array.isArray(prompts)).toBe(true)
  expect(prompts.length).toBe(1)
  mockCallSnapshot.push({ prompts })
  return Promise.resolve(mockPromptResponses[prompts[0].name])
})

jest.mock('execa', () => (cmd, args, opts) => {
  mockCallSnapshot.push({ execa: [cmd, args, opts] })
  if (cmd === 'git') {
    if (args[1] == 'user.email')
      return Promise.resolve({ stdout: 'alice@example.com' })
    else
      return Promise.resolve({
        stdout: 'Alice'
      })
  } else {
    return Promise.resolve()
  }
})

jest.mock('create-react-native-module', () => o => {
  mockCallSnapshot.push({ create: o })
})

jest.mock('fs-extra', () => ({
  outputFile: (filePath, outputContents) => {
    mockCallSnapshot.push({ outputFile: { filePath, outputContents } })
  }
}))

jest.mock('path', () => ({
  // quick solution to use & log system-independent paths in the snapshots,
  // with none of the arguments ignored
  resolve: (...paths) =>
    `/home/ada.lovelace/path_resolved_from_${paths.join('/')}`,
  // support functionality of *real* path join operation
  join: (...paths) => [].concat(paths).join('/')
}))

it('generate native React Native module for tvOS with example', async () => {
  require('../../../main')

  await new Promise(resolve => setTimeout(resolve, 0.001))

  expect(mockCallSnapshot).toMatchSnapshot()
})
