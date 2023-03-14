import { logger } from '@modelberry/mbfactory'
import { getAndValidateEnv } from './get-and-validate-env'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

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

describe('getAndValidateEnv should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('validate a good env', async () => {
    setEnv('ok')
    const isValid = getAndValidateEnv()
    expect(isValid).toEqual(true)
    expect(logSpy.info).toHaveBeenCalledTimes(0)
    expect(logSpy.error).toHaveBeenCalledTimes(0)
  })
  test('invalidate a bad env', async () => {
    setEnv('')
    const isValid = getAndValidateEnv()
    expect(isValid).toEqual(false)

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
  })
})
