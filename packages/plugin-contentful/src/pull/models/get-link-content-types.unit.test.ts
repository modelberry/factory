import { getLinkContentTypes } from './get-link-content-types'

describe('getLinkContentTypes should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('create link contentTypes', async () => {
    const contentField = {
      id: 'logoAction',
      name: 'Logo action',
      type: 'Link',
      localized: false,
      required: false,
      validations: [{ linkContentType: ['action'] }],
      disabled: false,
      omitted: false,
      linkType: 'Entry',
    }
    const contentTypes = getLinkContentTypes({ contentField })
    expect(contentTypes).toEqual(['ContentfulAction'])
  })
  test('create link contentTypes from array', async () => {
    const contentArrayField = {
      id: 'header',
      name: 'Header',
      type: 'Array',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Link',
        validations: [{ linkContentType: ['navigationSegment'] }],
        linkType: 'Entry',
      },
    }
    const contentTypes = getLinkContentTypes({
      contentField: contentArrayField,
    })
    expect(contentTypes).toEqual(['ContentfulNavigationSegment'])
  })
})
