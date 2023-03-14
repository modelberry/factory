import { TypeData } from '@modelberry/mbfactory'

export const topicAction: TypeData = {
  ContentfulAction: {
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
        '@displayField': 'heading',
        '@plugin': '@modelberry/plugin-contentful',
        '@type': 'testAction',
      },
      typeName: 'ContentfulAction',
    },
    variables: [
      {
        fileName: '/__fixtures__/topic-action.ts',
        isArray: true,
        isExported: true,
        isObject: false,
        isTyped: true,
        name: 'myActions',
        type: 'ContentfulAction',
        value: `[
{
sys: {
  id: 'myContentActionId',
},
heading: 'Hello',
anchor: 'anchor',
},
]`,
      },
    ],
  },
  ContentfulTopic: {
    interface: {
      fields: {
        heading: {
          tags: {
            '@type': 'Symbol',
          },
          type: 'string | undefined',
        },
        actionsCollection: {
          tags: {
            '@description': 'Action field, this is the description',
            '@itemsLinkType': 'Entry',
            '@itemsType': 'Link',
            '@type': 'Array',
            '@validations': 'action',
          },
          type: '{ items: ContentfulAction[]; } | undefined',
        },
      },
      interfaceTags: {
        '@displayField': 'heading',
        '@plugin': '@modelberry/plugin-contentful',
        '@type': 'testTopic',
      },
      typeName: 'ContentfulTopic',
    },
    variables: [
      {
        fileName: '/__fixtures__/topic.ts',
        isArray: true,
        isExported: true,
        isObject: false,
        isTyped: true,
        name: 'myTopics',
        type: 'ContentfulTopic',
        value: `[
  {
    heading: 'My topic heading #0',
    actionsCollection: {
      items: [
        {
          heading: 'Action inline',
        },
        {
          sys: {
            id: 'myContentActionId',
          }
        },
      ],
    },
  },
]`,
      },
    ],
  },
}
