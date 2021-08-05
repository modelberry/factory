import { TypeData } from '@modelberry/cli/plain'

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
        '@plugin': '@modelberry/plugin-contentful/plain',
        '@type': 'topic',
      },
      typeName: 'Topic',
    },
    variables: [],
  },
}
