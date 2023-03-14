import { TypeData } from '@modelberry/mbfactory'

export const multipleBadValidations: TypeData = {
  Topic: {
    interface: {
      fields: {
        heading: {
          tags: {
            '@type': 'Symbol',
            '@validations': 'doesNotExist doesNotExistEither',
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
