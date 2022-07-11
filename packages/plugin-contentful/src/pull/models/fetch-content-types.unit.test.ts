import { logger } from '@modelberry/mbfactory/plain'
import { environmentMock } from '../../contentful-mock/contentful-mock'
import { fetchContentTypes } from './fetch-content-types'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

describe('fetchContentTypes should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('fetch content types from mock', async () => {
    const contentTypes = await fetchContentTypes({
      contentfulEnvironment: environmentMock,
      options: {},
    })
    expect(contentTypes).toMatchSnapshot()
    expect(logSpy.p).toHaveBeenCalledWith('- fetching content types')
    expect(logSpy.p).toHaveBeenCalledWith('- fetched 11 content types')
  })
})
