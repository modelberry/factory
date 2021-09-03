jest.mock('../push-content/push-content')
jest.mock('../push-models/push-models')
jest.mock('../pull-content/pull-content')
jest.mock('../pull-models/pull-models')
jest.mock('contentful-management', () => ({ createClient }))

import chalk from 'chalk'
import { createClient, environmentMock } from '../contentful-mock/contentful-mock'
import { pullContent } from '../pull-content/pull-content'
import { pullModels } from '../pull-models/pull-models'
import { pushContent } from '../push-content/push-content'
import { pushModels } from '../push-models/push-models'
import { handler } from './handler'

const envMissingResponse = [
  [chalk.blue('- MODELBERRY_PROJECT_NAME env variable not found')],
  [chalk.red('- CONTENTFUL_SPACE_ID env variable is missing')],
  [chalk.red('- CONTENTFUL_CMA_TOKEN env variable is missing')],
  [chalk.red('- CONTENTFUL_ENVIRONMENT env variable is missing')],
]

const envOkResponse = [[chalk('- modelberry project: ok')]]

// Make sure not to read .env.development
process.env.NODE_ENV = 'test'

const setEnv = (value?: string) => {
  if (value) {
    process.env.MODELBERRY_PROJECT_NAME = value
    process.env.CONTENTFUL_SPACE_ID = value
    process.env.CONTENTFUL_CMA_TOKEN = value
    process.env.CONTENTFUL_ENVIRONMENT = value
  } else {
    delete process.env.MODELBERRY_PROJECT_NAME
    delete process.env.CONTENTFUL_SPACE_ID
    delete process.env.CONTENTFUL_CMA_TOKEN
    delete process.env.CONTENTFUL_ENVIRONMENT
  }
}

describe('The handler should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })

  test('show environment warnings', async () => {
    setEnv()
    // Test with force is true to prevent user interaction
    await handler({
      command: 'push',
      options: { force: true },
      pluginData: { types: {}, dataVar: {} },
      type: 'models',
    })
    expect(consoleSpy.mock.calls).toEqual(envMissingResponse)
    expect(pushModels).toHaveBeenCalledTimes(0)
  })

  test('call pushModels', async () => {
    setEnv('ok')
    // Test with force is true to prevent user interaction
    await handler({
      command: 'push',
      options: { force: true },
      pluginData: { types: {}, dataVar: {} },
      type: 'models',
    })
    expect(consoleSpy.mock.calls).toEqual(envOkResponse)
    expect(pushModels).toHaveBeenCalledWith({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: {},
      validationsMap: {},
    })
  })

  test('call pushContent', async () => {
    setEnv('ok')
    // Test with force is true to prevent user interaction
    await handler({
      command: 'push',
      options: { force: true },
      pluginData: { types: {}, dataVar: {} },
      type: 'content',
    })
    expect(consoleSpy.mock.calls).toEqual(envOkResponse)
    expect(pushContent).toHaveBeenCalledWith({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: {},
    })
  })

  test('call pullModels', async () => {
    setEnv('ok')
    // Test with force is true to prevent user interaction
    await handler({
      command: 'pull',
      options: { force: true },
      path: 'pull-test-path',
      type: 'models',
    })
    expect(consoleSpy.mock.calls).toEqual(envOkResponse)
    expect(pullModels).toHaveBeenCalledWith({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      path: 'pull-test-path',
    })
  })

  test('call pullContent', async () => {
    setEnv('ok')
    // Test with force is true to prevent user interaction
    await handler({
      command: 'pull',
      options: { force: true },
      path: 'pull-test-path',
      type: 'content',
    })
    expect(consoleSpy.mock.calls).toEqual(envOkResponse)
    expect(pullContent).toHaveBeenCalledWith({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      path: 'pull-test-path',
    })
  })
})
