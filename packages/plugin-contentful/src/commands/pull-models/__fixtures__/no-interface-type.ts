import { TypeData } from '@modelberry/mbfactory'

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
        '@plugin': '@modelberry/plugin-contentful',
      },
      typeName: 'Topic',
    },
    variables: [],
  },
}
