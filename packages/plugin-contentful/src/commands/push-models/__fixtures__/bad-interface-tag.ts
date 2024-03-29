import { TypeData } from '@modelberry/mbfactory'

export const badInterfaceTag: TypeData = {
  Topic: {
    interface: {
      fields: {
        heading: {
          tags: { '@type': 'Symbol', '@widgetId': 'singleLine' },
          type: 'string | undefined',
        },
      },
      interfaceTags: {
        '@plugin': '@modelberry/plugin-contentful',
        '@type': 'topic',
        '@bad': 'content',
      },
      typeName: 'Topic',
    },
    variables: [],
  },
}
