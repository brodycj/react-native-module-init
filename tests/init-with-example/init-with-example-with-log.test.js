const mockCallSnapshot = []

const mockPromptResponses = {
  nativeModuleName: { nativeModuleName: 'test Module' },
  isView: { isView: false },
  confirmation: { confirmation: true },
  modulePackageName: { modulePackageName: 'react-native-test-module' },
  nativeObjectClassNamePrefixInput: {
    nativeObjectClassNamePrefixInput: 'native'
  },
  nativeObjectClassName: { nativeObjectClassName: 'SUPERTestModule' },
  platforms: { platforms: ['android', 'ios'] },
  androidPackageId: { androidPackageId: 'com.test' },
  tvosEnabled: { tvosEnabled: false },
  authorName: { authorName: 'Ada' },
  authorEmail: { authorEmail: 'ada@lovelace.name' },
  githubUserAccountName: { githubUserAccountName: 'ada-lovelace' },
  license: { license: 'BSD-4-CLAUSE' },
  useAppleNetworking: { useAppleNetworking: false },
  generateExampleApp: { generateExampleApp: true },
  exampleTemplate: { exampleTemplate: 'react-native@latest' },
  exampleAppName: { exampleAppName: 'example' }
}

jest.mock('console', () => ({
  log: (...args) => {
    mockCallSnapshot.push({ log: args })
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

it('generate native React Native module with example, with log', async () => {
  require('../../main')

  await new Promise(resolve => setTimeout(resolve, 0.001))

  expect(mockCallSnapshot).toMatchSnapshot()
})
