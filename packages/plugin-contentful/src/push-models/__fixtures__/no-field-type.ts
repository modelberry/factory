import { TypeData } from '@modelberry/cli/plain'

export const noFieldType: TypeData = {
  Topic: {
    interface: {
      fields: {
        heading: {
          tags: {
            '@helpText': 'The topic heading',
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
