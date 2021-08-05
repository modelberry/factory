import { TypeData } from '@modelberry/cli/plain'

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
        '@plugin': '@modelberry/plugin-contentful/plain',
        '@type': 'topic',
      },
      typeName: 'Topic',
    },
    variables: [],
  },
}
