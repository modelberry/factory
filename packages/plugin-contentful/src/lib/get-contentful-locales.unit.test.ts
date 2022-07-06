import { environmentMock } from '../contentful-mock/contentful-mock'
import { getContentfulLocales } from './get-contentful-locales'

describe('getContentfulLocales should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })
  test('get locales from mock', async () => {
    const locales = await getContentfulLocales({
      contentfulEnvironment: environmentMock,
    })
    expect(locales).toMatchSnapshot()
  })
})
