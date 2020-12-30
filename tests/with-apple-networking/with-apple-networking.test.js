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
  useAppleNetworking: { useAppleNetworking: true },
  githubUserAccountName: { githubUserAccountName: 'ada-lovelace' },
  license: { license: 'BSD-4-CLAUSE' },
  generateExampleApp: { generateExampleApp: false }
}

jest.mock('console', () => ({
  log: (...args) => {
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
  return cmd === 'git'
    ? args[1] === 'user.email'
        ? Promise.resolve({ stdout: 'alice@example.com' })
        : Promise.resolve({ stdout: 'Alice' })
    : Promise.resolve()
})

jest.mock('create-react-native-module', () => o => {
  mockCallSnapshot.push({ create: o })
})

it('generate native React Native module with no example, with log', async () => {
  require('../../main')

  await new Promise(resolve => setTimeout(resolve, 0.001))

  expect(mockCallSnapshot).toMatchSnapshot()
})
