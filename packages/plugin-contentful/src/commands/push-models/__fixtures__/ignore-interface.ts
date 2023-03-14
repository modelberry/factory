import { TypeData } from '@modelberry/mbfactory'

export const ignoreInterface: TypeData = {
  Topic: {
    interface: {
      fields: {
        heading: {
          tags: {
            '@helpText': 'The topic heading',
            '@type': 'Symbol',
          },
          type: 'string | undefined',
        },
      },
      interfaceTags: {
        '@ignore': '',
        '@plugin': '@modelberry/plugin-contentful',
        '@type': 'topic',
      },
      typeName: 'Topic',
    },
    variables: [],
  },
}
