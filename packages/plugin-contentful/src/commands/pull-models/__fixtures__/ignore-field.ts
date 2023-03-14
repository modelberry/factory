import { TypeData } from '@modelberry/mbfactory'

export const ignoreField: TypeData = {
  Topic: {
    interface: {
      fields: {
        heading: {
          tags: {
            '@helpText': 'The topic heading',
            '@ignore': '',
            '@type': 'Symbol',
          },
          type: 'string | undefined',
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
