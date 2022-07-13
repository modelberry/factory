export const multipleContentTypes = {
  '@modelberry/plugin-contentful/plain': {
    dataVar: {
      fileName:
        '/Users/jacco/Development/modelberry/factory/packages/mbfactory/src/get-all-plugin-data/__fixtures__/topic.ts',
      isArray: false,
      isExported: true,
      isObject: true,
      isTyped: true,
      name: 'modelberryPluginData',
      type: 'ModelberryPluginData',
      value:
        "{ '@modelberry/plugin-contentful/plain': { validations: { dropdown: { in: ['item A', 'item B', 'item C'] }, media: { linkMimetypeGroup: ['image', 'video'] }, action: { linkContentType: ['testAction'] }, shortString: { size: { max: 155, min: 0 } }, camelCase: { regexp: { pattern: '^[a-z]+([A-Z][a-z0-9]+)*$', flags: '' }, }, path: { regexp: { pattern: '^\\\\\\\\/[a-z0-9:\\\\\\\\._/~%\\\\\\\\-\\\\\\\\+&\\\\\\\\#\\\\\\\\?!=\\\\\\\\(\\\\\\\\)@]*$', flags: '', }, }, url: { regexp: { pattern: '^(ftp|http|https|mailto):(\\\\\\\\/\\\\\\\\/)*(\\\\\\\\w+:{0,1}\\\\\\\\w*@)?(\\\\\\\\S+)(:[0-9]+)?(\\\\\\\\/|\\\\\\\\/([\\\\\\\\w#!:.?+=&%@!\\\\\\\\-/]))?$', flags: '', }, }, }, }, }",
    },
    types: {
      ContentfulAction: {
        interface: {
          fields: {
            anchor: {
              tags: {
                '@helpText': 'Voorbeeld: mijn-anchor',
                '@type': 'Symbol',
                '@name': 'Anchor',
              },
              type: 'string | undefined',
            },
            description: {
              tags: {
                '@helpText': 'Omschrijving van de actie, voor zoekmachines',
                '@type': 'Symbol',
                '@name': 'Description',
              },
              type: 'string | undefined',
            },
            heading: {
              tags: {
                '@type': 'Symbol',
                '@name': 'Heading',
              },
              type: 'string | undefined',
            },
            url: {
              tags: {
                '@type': 'Symbol',
                '@name': 'Url',
              },
              type: 'string | undefined',
            },
            eventId: {
              tags: {
                '@type': 'Symbol',
                '@name': 'Event id',
              },
              type: 'string | undefined',
            },
            query: {
              tags: {
                '@type': 'Symbol',
                '@name': 'Query',
              },
              type: 'string | undefined',
            },
          },
          interfaceTags: {
            '@displayField': 'heading',
            '@plugin': '@modelberry/plugin-contentful/plain',
            '@type': 'testAction',
          },
          typeName: 'ContentfulAction',
        },
        variables: [
          {
            fileName:
              '/Users/jacco/Development/modelberry/factory/packages/mbfactory/src/get-all-plugin-data/__fixtures__/topic-action.ts',
            isArray: true,
            isExported: true,
            isObject: false,
            isTyped: true,
            name: 'myActions',
            type: 'ContentfulAction',
            value:
              "[ { sys: { id: 'myContentActionId', }, heading: 'Hello', anchor: 'anchor', }, ]",
          },
        ],
      },
      ContentfulTopic: {
        interface: {
          fields: {
            abstract: {
              tags: {
                '@type': 'Symbol',
                '@validations': 'shortString',
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
            heading: {
              tags: {
                '@type': 'Symbol',
              },
              type: 'string | undefined',
            },
            icon: {
              tags: {
                '@type': 'Symbol',
              },
              type: 'string | undefined',
            },
            mediaCollection: {
              tags: {
                '@itemsLinkType': 'Asset',
                '@itemsType': 'Link',
                '@type': 'Array',
              },
              type: '{ items: ContentfulAsset[]; } | undefined',
            },
            poster: {
              tags: {
                '@linkType': 'Asset',
                '@type': 'Link',
              },
              type: 'ContentfulAsset | undefined',
            },
          },
          interfaceTags: {
            '@description':
              'Topic model, a heading, an abstract and a call to action',
            '@displayField': 'heading',
            '@plugin': '@modelberry/plugin-contentful/plain',
            '@type': 'testTopic',
          },
          typeName: 'ContentfulTopic',
        },
        variables: [
          {
            fileName:
              '/Users/jacco/Development/modelberry/factory/packages/mbfactory/src/get-all-plugin-data/__fixtures__/topic.ts',
            isArray: true,
            isExported: true,
            isObject: false,
            isTyped: true,
            name: 'myTopics',
            type: 'ContentfulTopic',
            value:
              "[ { abstract: 'This is the abstract', actionsCollection: { items: [ { sys: { id: 'myContentActionId', }, }, ], }, heading: 'Heres the heading', }, ]",
          },
        ],
      },

      NewLocalField: {
        interface: {
          fields: {
            abstract: {
              tags: {
                '@type': 'Symbol',
                '@validations': 'shortString',
              },
              type: 'string | undefined',
            },
            heading: {
              tags: {
                '@type': 'Symbol',
              },
              type: 'string | undefined',
            },
          },
          interfaceTags: {
            '@description': 'New local field, to be added to remote',
            '@displayField': 'heading',
            '@plugin': '@modelberry/plugin-contentful/plain',
            '@type': 'newLocalField',
          },
          typeName: 'NewLocalField',
        },
        variables: [],
      },
    },
  },
}
