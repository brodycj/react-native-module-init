const hexy = require('hexyjs')

const mockCallSnapshot = []

const mockHexy = hexy

jest.mock('console', () => ({
  log: (...args) => {
    mockCallSnapshot.push({
      log: args.map(arg => [arg, mockHexy.strToHex(arg)])
    })
  }
}))

jest.mock('prompts', () => ([{ onState }]) => {
  // ignore arguments in this case
  mockCallSnapshot.push({ prompts: {} })
  // abort immediately after this function is finished
  Promise.resolve().then(() => onState({ aborted: true }))
  // return a promise that never resolves
  return new Promise(_ => {})
})

jest.mock('exit', () => code => {
  mockCallSnapshot.push({ exit: code })
})

it('outputs cleanup line to the console & and exits if aborted', async () => {
  require('../../main')

  await new Promise(resolve => setTimeout(resolve, 0.001))

  expect(mockCallSnapshot).toMatchSnapshot()
})
