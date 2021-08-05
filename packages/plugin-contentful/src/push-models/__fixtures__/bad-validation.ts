import { TypeData } from '@modelberry/cli/plain'

export const badValidation: TypeData = {
  Topic: {
    interface: {
      fields: {
        heading: {
          tags: {
            '@type': 'Symbol',
            '@validation': 'doesNotExist',
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
