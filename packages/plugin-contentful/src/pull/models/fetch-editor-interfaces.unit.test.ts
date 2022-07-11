import { getContentType } from '../../contentful-mock/contentful-mock'
import { fetchEditorInterfaces } from './fetch-editor-interfaces'

describe('fetchEditorInterfaces should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('fetch editor interfaces from mock', async () => {
    const editorInterfaces = await fetchEditorInterfaces({
      contentType: await getContentType(),
    })

    expect(editorInterfaces).toMatchSnapshot()
  })
})
