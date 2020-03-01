const mockCallSnapshot = []

mockPromptResponses = {
  nativeModuleNameInput: { nativeModuleNameInput: 'test view for tvOS' },
  isView: { isView: true },
  confirmation: { confirmation: true },
  modulePackageName: { modulePackageName: 'react-native-tvos-test-view' },
  nativeObjectClassNamePrefixInput: {
    nativeObjectClassNamePrefixInput: 'native'
  },
  platforms: { platforms: ['android', 'ios'] },
  androidPackageId: { androidPackageId: 'com.test' },
  tvosEnabled: { tvosEnabled: true },
  authorName: { authorName: 'Ada' },
  authorEmail: { authorEmail: 'ada@lovelace.name' },
  githubUserAccountName: { githubUserAccountName: 'ada-lovelace' },
  useAppleNetworking: { useAppleNetworking: false },
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

jest.mock('prompts', () => args => {
  expect(Array.isArray(args)).toBe(true)
  mockCallSnapshot.push({ prompts: { args } })
  const optionsArray = [].concat(args)
  expect(optionsArray.length).toBe(1)
  return Promise.resolve(mockPromptResponses[optionsArray[0].name])
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

it('generate native React Native view for tvOS, with example', async () => {
  require('../../../main')

  await new Promise(resolve => setTimeout(resolve, 0.001))

  expect(mockCallSnapshot).toMatchSnapshot()
})
