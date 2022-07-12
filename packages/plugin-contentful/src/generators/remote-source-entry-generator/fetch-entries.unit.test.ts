import { logger } from '@modelberry/mbfactory/plain'
import { environmentMock } from '../../contentful-mock/contentful-mock'
import { fetchEntries } from './fetch-entries'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

describe('fetchEntries should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('fetch entries from mock with en-US locale', async () => {
    const entries = await fetchEntries({
      contentfulEnvironment: environmentMock,
      localeCode: 'en-US',
      options: {},
    })
    expect(entries).toMatchSnapshot()
    expect(logSpy.p).toHaveBeenCalledWith('- fetching entries')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- fetched 96 of 96 entries (in batches of 100)'
    )
  })
  test('fetch entries from mock with en-GB locale', async () => {
    await expect(
      fetchEntries({
        contentfulEnvironment: environmentMock,
        localeCode: 'nl-NL',
        options: {},
      })
    ).rejects.toEqual('Status 400 - Bad locale')
    expect(logSpy.p).toHaveBeenCalledWith('- fetching entries')
  })
})
