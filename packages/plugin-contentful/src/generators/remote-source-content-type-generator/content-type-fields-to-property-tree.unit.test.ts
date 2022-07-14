import { contentTypeFieldsToPropertyTree } from './content-type-fields-to-property-tree'

const contentTypeFields = [
  {
    disabled: false,
    id: 'actions',
    items: {
      linkType: 'Entry',
      type: 'Link',
      validations: [
        {
          linkContentType: ['testAction'],
        },
      ],
    },
    localized: false,
    name: 'Actions',
    omitted: false,
    required: false,
    type: '',
    validations: [],
  },
  {
    disabled: false,
    id: 'heading',
    localized: true,
    name: 'Heading',
    omitted: false,
    required: false,
    type: 'Symbol',
    validations: [],
  },
]

const editorInterfaces = {
  actions: {
    widgetId: 'entryLinksEditor',
  },
  heading: {
    widgetId: 'singleLine',
  },
}

const validationsMap = {
  'linkContentType-testAction': {
    linkContentType: ['testAction'],
  },
}

describe('contentTypeFieldsToPropertyTree should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('create a property tree', async () => {
    const propertyTree = contentTypeFieldsToPropertyTree({
      contentTypeFields,
      editorInterfaces,
      namedImports: [],
      validationsMap,
    })

    expect(propertyTree).toMatchSnapshot()
  })
})
