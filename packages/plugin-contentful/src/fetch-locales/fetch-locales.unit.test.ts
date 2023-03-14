import { logger } from '@modelberry/mbfactory'
import { environmentMock } from '../contentful-mock/contentful-mock'
import { fetchLocales } from './fetch-locales'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

describe('getContentfulLocales should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('get locales from mock', async () => {
    const locales = await fetchLocales({
      contentfulEnvironment: environmentMock,
      options: { locale: 'en-US' },
    })
    expect(locales).toMatchSnapshot()
    expect(logSpy.p).toHaveBeenCalledTimes(1)
  })
  test('return badCliLocate for a locale that does not exist from mock', async () => {
    const locales = await fetchLocales({
      contentfulEnvironment: environmentMock,
      options: { locale: 'es-ES' },
    })
    expect(locales).toMatchSnapshot()
  })
})
