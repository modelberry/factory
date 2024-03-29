import { TypeData } from '@modelberry/mbfactory'

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
        '@plugin': '@modelberry/plugin-contentful',
        '@type': 'topic',
      },
      typeName: 'Topic',
    },
    variables: [],
  },
}
