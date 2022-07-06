import { environmentMock } from '../contentful-mock/contentful-mock'
import { fetchContentTypes } from './fetch-content-types'

describe('fetchContentTypes should', () => {
  test('fetch content types from mock', async () => {
    const contentTypes = await fetchContentTypes({
      contentfulEnvironment: environmentMock,
      options: {},
    })
    expect(contentTypes).toMatchSnapshot()
  })
})
