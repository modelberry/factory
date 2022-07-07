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
    })
    expect(locales).toMatchSnapshot()
  })
})
