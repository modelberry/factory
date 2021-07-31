import { TypeData } from '@modelberry/push/plain'

export const noInterfaceType: TypeData = {
  Topic: {
    interface: {
      fields: {
        heading: {
          tags: {
            '@type': 'Symbol',
          },
          type: 'string | undefined',
        },
      },
      interfaceTags: {
        '@plugin': '@modelberry/plugin-contentful/plain',
      },
      typeName: 'Topic',
    },
    variables: [],
  },
}
