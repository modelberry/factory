import chalk from 'chalk'
import { environmentMock } from '../contentful-mock/contentful-mock'
import { fetchContentTypes } from './fetch-content-types'

describe('fetchContentTypes should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })
  test('fetch content types from mock', async () => {
    const contentTypes = await fetchContentTypes({
      contentfulEnvironment: environmentMock,
      options: {},
    })
    expect(contentTypes).toMatchSnapshot()
    expect(consoleSpy.mock.calls).toEqual([
      [chalk('- fetching content types')],
      [chalk('- fetched 11 content types')],
    ])
  })
})
