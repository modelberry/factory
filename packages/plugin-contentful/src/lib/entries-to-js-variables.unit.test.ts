import { EntryType } from './entries-by-content-type-id'
import { entriesToJsVariables } from './entries-to-js-variables'

const entryType: EntryType = {
  fields: {
    abstract: {
      contentFieldType: {
        id: 'abstract',
        localized: false,
        name: 'Abstract',
        required: false,
        type: 'Symbol',
      },
      fieldValue: {
        'en-US': 'This is the abstract',
      },
    },
    actions: {
      contentFieldType: {
        id: 'actions',
        items: {
          linkType: 'Entry',
          type: 'Link',
        },
        localized: false,
        name: 'Actions',
        required: false,
        type: '',
      },
      fieldValue: {
        'en-US': [
          {
            sys: {
              id: 'myContentActionId',
            },
          },
        ],
      },
    },
    heading: {
      contentFieldType: {
        id: 'heading',
        localized: false,
        name: 'Heading',
        required: false,
        type: 'Symbol',
      },
      fieldValue: {
        'en-US': 'Heres the heading',
      },
    },
  },
  sys: {
    contentType: {
      sys: {
        id: 'testTopic',
        linkType: 'ContentType',
        type: 'Link',
      },
    },
    createdAt: '2021-08-08T19:47:21.508Z',
    environment: {
      sys: {
        id: 'master',
        linkType: 'Environment',
        type: 'Link',
      },
    },
    id: '2v8GizBNh1oxbf6cKlpzJP',
    space: {
      sys: {
        id: 'tctsmza39jg6',
        linkType: 'Space',
        type: 'Link',
      },
    },
    type: 'Entry',
    updatedAt: '2021-08-08T19:47:21.878Z',
    version: 2,
  },
}

describe('entriesToJsVariables should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const entryTypeList: EntryType[] = [entryType]
  const localeCode = 'en-US'
  test('convert entries to js variables', async () => {
    const contentArray: any[] = entriesToJsVariables({
      entryTypeList,
      localeCode,
    })

    expect(contentArray).toMatchSnapshot()
  })
})
