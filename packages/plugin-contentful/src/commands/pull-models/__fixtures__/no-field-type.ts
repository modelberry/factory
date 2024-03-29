import { TypeData } from '@modelberry/mbfactory'

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
        '@plugin': '@modelberry/plugin-contentful',
        '@type': 'topic',
      },
      typeName: 'Topic',
    },
    variables: [],
  },
}
