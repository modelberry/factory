import { getAndValidateEnv } from './get-and-validate-env'

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

const envMissingResponse = [
  [chalk.blue('- MODELBERRY_PROJECT_NAME env variable not found')],
  [chalk.red('- CONTENTFUL_SPACE_ID env variable is missing')],
  [chalk.red('- CONTENTFUL_PERSONAL_ACCESS_TOKEN env variable is missing')],
  [chalk.red('- CONTENTFUL_ENVIRONMENT env variable is missing')],
]

describe('getAndValidateEnv should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('validate a good env', async () => {
    setEnv('ok')
    const isValid = getAndValidateEnv()
    expect(isValid).toEqual(true)
    expect(consoleSpy.mock.calls).toEqual([])
  })
  test('invalidate a bad env', async () => {
    setEnv('')
    const isValid = getAndValidateEnv()
    expect(isValid).toEqual(false)
    expect(consoleSpy.mock.calls).toEqual(envMissingResponse)
  })
})
