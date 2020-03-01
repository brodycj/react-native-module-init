const mockCallSnapshot = []

mockPromptResponses = {
  nativeModuleNameInput: { nativeModuleNameInput: 'test View' },
  isView: { isView: true },
  confirmation: { confirmation: true },
  modulePackageName: { modulePackageName: 'react-native-test-view' },
  nativeObjectClassNamePrefixInput: {
    nativeObjectClassNamePrefixInput: 'native'
  },
  platforms: { platforms: ['android', 'ios'] },
  androidPackageId: { androidPackageId: 'com.test' },
  tvosEnabled: { tvosEnabled: false },
  authorName: { authorName: 'Ada' },
  authorEmail: { authorEmail: 'ada@lovelace.name' },
  githubUserAccountName: { githubUserAccountName: 'ada-lovelace' },
  license: { license: 'BSD-4-CLAUSE' },
  generateExampleApp: { generateExampleApp: false }
}

jest.mock('console', () => ({
  log: (...args) => {
    mockCallSnapshot.push({ log: args })
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

it('generate native React Native view with no example, with log', async () => {
  require('../../../main')

  await new Promise(resolve => setTimeout(resolve, 0.001))

  expect(mockCallSnapshot).toMatchSnapshot()
})
