import { TypeData } from '@modelberry/mbfactory/plain'

export const allTags: TypeData = {
  Topic: {
    interface: {
      fields: {
        heading: {
          tags: {
            '@helpText': 'The topic heading',
            '@itemsLinkType': 'Entry',
            '@itemsType': 'Link',
            '@linkType': 'Symbol',
            '@localized': '',
            '@name': 'Heading',
            '@required': '',
            '@type': 'Array',
            '@itemsValidations': 'mockedValidation',
            '@widgetId': 'singleLine',
          },
          type: 'string | undefined',
        },
      },
      interfaceTags: {
        '@plugin': '@modelberry/plugin-contentful/plain',
        '@type': 'topic',
      },
      typeName: 'Topic',
    },
    variables: [],
  },
}
