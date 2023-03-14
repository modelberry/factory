import { LocalSourceContentTypeYield } from '../../generators/local-source-content-type-generator/local-source-content-type-generator';

export const localContentTypes: LocalSourceContentTypeYield[] = [
  {
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
        tags: { '@type': 'Symbol', '@name': 'Heading' },
        type: 'string | undefined',
      },
      url: {
        tags: { '@type': 'Symbol', '@name': 'Url' },
        type: 'string | undefined',
      },
      eventId: {
        tags: { '@type': 'Symbol', '@name': 'Event id' },
        type: 'string | undefined',
      },
      query: {
        tags: { '@type': 'Symbol', '@name': 'Query' },
        type: 'string | undefined',
      },
    },
    interfaceTypeTag: 'testAction',
    interfaceTags: {
      '@displayField': 'heading',
      '@plugin': '@modelberry/plugin-contentful',
      '@type': 'testAction',
    },
    interfaceName: 'ContentfulAction',
  },
  {
    fields: {
      abstract: {
        tags: { '@type': 'Symbol', '@validations': 'shortString' },
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
      heading: { tags: { '@type': 'Symbol' }, type: 'string | undefined' },
      icon: { tags: { '@type': 'Symbol' }, type: 'string | undefined' },
      mediaCollection: {
        tags: {
          '@itemsLinkType': 'Asset',
          '@itemsType': 'Link',
          '@type': 'Array',
        },
        type: '{ items: ContentfulAsset[]; } | undefined',
      },
      poster: {
        tags: { '@linkType': 'Asset', '@type': 'Link' },
        type: 'ContentfulAsset | undefined',
      },
    },
    interfaceTypeTag: 'testTopic',
    interfaceTags: {
      '@description':
        'Topic model, a heading, an abstract and a call to action',
      '@displayField': 'heading',
      '@plugin': '@modelberry/plugin-contentful',
      '@type': 'testTopic',
    },
    interfaceName: 'ContentfulTopic',
  },
  {
    fields: {
      abstract: {
        tags: { '@type': 'Symbol', '@validations': 'shortString' },
        type: 'string | undefined',
      },
      heading: { tags: { '@type': 'Symbol' }, type: 'string | undefined' },
    },
    interfaceTypeTag: 'newLocalField',
    interfaceTags: {
      '@description': 'New local field, to be added to remote',
      '@displayField': 'heading',
      '@plugin': '@modelberry/plugin-contentful',
      '@type': 'newLocalField',
    },
    interfaceName: 'NewLocalField',
  },
]
