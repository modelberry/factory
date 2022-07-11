import { getContentType } from '../../contentful-mock/contentful-mock'
import { contentTypeToInlineTags } from './content-type-to-inline-tags'

describe('contentTypeToInlineTags should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('convert contentType to inline tags', async () => {
    const contentType = await getContentType()
    const tags = contentTypeToInlineTags({ contentType })
    expect(tags).toEqual({
      '@description':
        'Topic model, a heading, an abstract and a call to action',
      '@displayField': 'heading',
      '@plugin': '"@modelberry/plugin-contentful/plain"',
      '@type': 'testTopic',
    })
  })
})
