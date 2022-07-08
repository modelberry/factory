import { environmentMock } from '../contentful-mock/contentful-mock'
import { fetchLocales } from './fetch-locales'

describe('getContentfulLocales should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })
  test('get locales from mock', async () => {
    const locales = await fetchLocales({
      contentfulEnvironment: environmentMock,
      options: { locale: 'en-US' },
    })
    expect(locales).toMatchSnapshot()
  })
  test('return badCliLocate for a locale that does not exist from mock', async () => {
    const locales = await fetchLocales({
      contentfulEnvironment: environmentMock,
      options: { locale: 'es-ES' },
    })
    expect(locales).toMatchSnapshot()
  })
})
