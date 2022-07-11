import { TypeData } from '@modelberry/mbfactory/plain'

export const badArraySymbol: TypeData = {
  Topic: {
    interface: {
      fields: {
        keywords: {
          tags: {
            '@type': 'Array',
            '@itemsType': 'Symbol',
            '@widgetId': 'singleLine',
          },
          type: '  { items: string[]; } | undefined',
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
