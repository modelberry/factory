import { removeLinkAndLinkType } from './remove-link-and-link-type'

describe('removeLinkAndLinkType should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('remove link and linkType from items', async () => {
    const fieldValue = {
      id: 'footer',
      name: 'Footer',
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
    const remoteEntryFieldValue = removeLinkAndLinkType({
      fieldValue,
    })
    expect(remoteEntryFieldValue).toMatchSnapshot()
  })
  test('remove link and linkType', async () => {
    const fieldValue = {
      id: 'social',
      name: 'Social',
      type: 'Link',
      localized: false,
      required: false,
      validations: [{ linkContentType: ['navigationSegment'] }],
      disabled: false,
      omitted: false,
      linkType: 'Entry',
    }
    const remoteEntryFieldValue = removeLinkAndLinkType({
      fieldValue,
    })
    expect(remoteEntryFieldValue).toMatchSnapshot()
  })
})
