jest.mock('../push-content/push-content')
jest.mock('../push-models/push-models')
jest.mock('../pull-content/pull-content')
jest.mock('../pull-models/pull-models')
jest.mock('contentful-management', () => ({ createClient }))

import { logger } from '@modelberry/mbfactory/plain'
import {
  createClient,
  environmentMock,
} from '../contentful-mock/contentful-mock'
import { pullContent } from '../pull-content/pull-content'
import { pullModels } from '../pull-models/pull-models'
import { pushContent } from '../push-content/push-content'
import { pushModels } from '../push-models/push-models'
import { handler } from './handler'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

// Make sure not to read .env.development
process.env.NODE_ENV = 'test'

const setEnv = (value?: string) => {
  if (value) {
    process.env.MODELBERRY_PROJECT_NAME = value
    process.env.CONTENTFUL_SPACE_ID = value
    process.env.CONTENTFUL_PERSONAL_ACCESS_TOKEN = value
    process.env.CONTENTFUL_ENVIRONMENT = value
  } else {
    delete process.env.MODELBERRY_PROJECT_NAME
    delete process.env.CONTENTFUL_SPACE_ID
    delete process.env.CONTENTFUL_PERSONAL_ACCESS_TOKEN
    delete process.env.CONTENTFUL_ENVIRONMENT
  }
}

const myTestType = {
  interface: {
    interfaceTags: {
      '@type': 'testType',
    },
  },
  variables: [],
}

describe('The handler should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('show environment warnings', async () => {
    setEnv()
    // Test with 'yes' option to prevent user interaction
    await handler({
      command: 'push',
      options: { yes: true },
      pluginData: { types: {}, dataVar: {} },
      type: 'models',
    })
    expect(logSpy.info).toHaveBeenCalledWith(
      '- MODELBERRY_PROJECT_NAME env variable not found'
    )
    expect(logSpy.error).toHaveBeenCalledWith(
      '- CONTENTFUL_SPACE_ID env variable is missing'
    )
    expect(logSpy.error).toHaveBeenCalledWith(
      '- CONTENTFUL_PERSONAL_ACCESS_TOKEN env variable is missing'
    )
    expect(logSpy.error).toHaveBeenCalledWith(
      '- CONTENTFUL_ENVIRONMENT env variable is missing'
    )

    expect(pushModels).toHaveBeenCalledTimes(0)
  })

  test('call pushModels', async () => {
    setEnv('ok')
    // Test with 'yes' option to prevent user interaction
    await handler({
      command: 'push',
      options: { yes: true },
      pluginData: {
        types: {
          myTestType,
        },
        dataVar: {},
      },
      type: 'models',
    })
    expect(logSpy.p).toHaveBeenCalledWith('- modelberry project: ok')
    expect(logSpy.p).toHaveBeenCalledWith('- contentful space id: ok')
    expect(logSpy.p).toHaveBeenCalledWith('- contentful environment: ok')
    expect(logSpy.p).toHaveBeenCalledWith('- pushing models to Contentful')
    expect(logSpy.p).toHaveBeenCalledWith('- all models: testType')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- yes option, answering yes to all messages and warnings'
    )
    expect(logSpy.p).toHaveBeenCalledWith('- entries found at Contentful: 96')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- content types found at Contentful: 11'
    )
    expect(pushModels).toHaveBeenCalledWith({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: {
        myTestType,
      },
      validationsMap: {},
    })
  })

  test('call pushContent', async () => {
    setEnv('ok')
    // Test with 'yes' option to prevent user interaction
    await handler({
      command: 'push',
      options: { yes: true },
      pluginData: {
        types: {
          myTestType,
        },
        dataVar: {},
      },
      type: 'content',
    })
    expect(logSpy.p).toHaveBeenCalledWith('- modelberry project: ok')
    expect(logSpy.p).toHaveBeenCalledWith('- contentful space id: ok')
    expect(logSpy.p).toHaveBeenCalledWith('- contentful environment: ok')
    expect(logSpy.p).toHaveBeenCalledWith('- pushing content to Contentful')
    expect(logSpy.p).toHaveBeenCalledWith('- all models: testType')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- yes option, answering yes to all messages and warnings'
    )
    expect(logSpy.p).toHaveBeenCalledWith('- entries found at Contentful: 96')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- content types found at Contentful: 11'
    )

    expect(pushContent).toHaveBeenCalledWith({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: {
        myTestType,
      },
    })
  })

  test('call pullModels', async () => {
    setEnv('ok')
    // Test with 'yes' option to prevent user interaction
    await handler({
      command: 'pull',
      options: { yes: true },
      path: 'pull-test-path',
      type: 'models',
    })

    expect(logSpy.p).toHaveBeenCalledWith('- modelberry project: ok')
    expect(logSpy.p).toHaveBeenCalledWith('- contentful space id: ok')
    expect(logSpy.p).toHaveBeenCalledWith('- contentful environment: ok')
    expect(logSpy.p).toHaveBeenCalledWith('- pulling models from Contentful')
    expect(logSpy.p).toHaveBeenCalledWith('- write to: pull-test-path')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- yes option, answering yes to all messages and warnings'
    )
    expect(logSpy.p).toHaveBeenCalledWith('- entries found at Contentful: 96')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- content types found at Contentful: 11'
    )

    expect(pullModels).toHaveBeenCalledWith({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      path: 'pull-test-path',
    })
  })

  test('call pullContent', async () => {
    setEnv('ok')
    // Test with 'yes' option to prevent user interaction
    await handler({
      command: 'pull',
      options: { yes: true },
      path: 'pull-test-path',
      type: 'content',
    })

    expect(logSpy.p).toHaveBeenCalledWith('- modelberry project: ok')
    expect(logSpy.p).toHaveBeenCalledWith('- contentful space id: ok')
    expect(logSpy.p).toHaveBeenCalledWith('- contentful environment: ok')
    expect(logSpy.p).toHaveBeenCalledWith('- pulling content from Contentful')
    expect(logSpy.p).toHaveBeenCalledWith('- write to: pull-test-path')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- yes option, answering yes to all messages and warnings'
    )
    expect(logSpy.p).toHaveBeenCalledWith('- entries found at Contentful: 96')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- content types found at Contentful: 11'
    )

    expect(pullContent).toHaveBeenCalledWith({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      path: 'pull-test-path',
    })
  })
})
