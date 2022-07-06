import { environmentMock } from '../contentful-mock/contentful-mock'
import { fetchEntries } from './fetch-entries'

describe('fetchEntries should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })
  test('fetch entries from mock', async () => {
    const entries = await fetchEntries({
      contentfulEnvironment: environmentMock,
      options: {},
    })
    expect(entries).toMatchSnapshot()
  })
})
