const mockCallSnapshot = []

const mockPromptResponses = {
  nativeModuleName: { nativeModuleName: 'test view for tvOS' },
  isView: { isView: true },
  confirmation: { confirmation: true },
  modulePackageName: { modulePackageName: 'react-native-tvos-test-view' },
  nativeObjectClassNamePrefixInput: {
    nativeObjectClassNamePrefixInput: 'native'
  },
  nativeObjectClassName: { nativeObjectClassName: 'SUPERTestView' },
  platforms: { platforms: ['android', 'ios'] },
  androidPackageId: { androidPackageId: 'com.test' },
  tvosEnabled: { tvosEnabled: true },
  authorName: { authorName: 'Ada' },
  authorEmail: { authorEmail: 'ada@lovelace.name' },
  githubUserAccountName: { githubUserAccountName: 'ada-lovelace' },
  useAppleNetworking: { useAppleNetworking: false },
  license: { license: 'BSD-4-CLAUSE' },
  generateExampleApp: { generateExampleApp: true },
  exampleTemplate: { exampleTemplate: 'react-native-tvos@latest' },
  exampleAppName: { exampleAppName: 'example' }
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
    return args[1] === 'user.email'
      ? Promise.resolve({ stdout: 'alice@example.com' })
      : Promise.resolve({ stdout: 'Alice' })
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
    paths.length === 1 && paths[0] === '.'
      ? '/home/ada.lovelace/path_resolved_from'
      : paths.join('/'),
  // support functionality of *real* path join operation
  join: (...paths) => [].concat(paths).join('/')
}))

jest.mock('react-native-init-func', () => (...args) => {
  mockCallSnapshot.push({ reactNativeInit: args })
})

it('generate native React Native view for tvOS, with example', async () => {
  require('../../../main')

  await new Promise(resolve => setTimeout(resolve, 0.001))

  expect(mockCallSnapshot).toMatchSnapshot()
})
