import { environmentMock } from '../contentful-mock/contentful-mock'
import { fetchEntries } from './fetch-entries'

describe('fetchEntries should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })
  test('fetch entries from mock with en-US locale', async () => {
    const entries = await fetchEntries({
      contentfulEnvironment: environmentMock,
      localeCode: 'en-US',
      options: {},
    })
    expect(entries).toMatchSnapshot()
  })
  test('fetch entries from mock with en-GB locale', async () => {
    await expect(
      fetchEntries({
        contentfulEnvironment: environmentMock,
        localeCode: 'nl-NL',
        options: {},
      })
    ).rejects.toEqual('Status 400 - Bad locale')
  })
})
