import { RemoteSourceContentTypeYield } from '../../generators/remote-source-content-type-generator/remote-source-content-type-generator'

export const remoteContentTypes: RemoteSourceContentTypeYield[] = [
  {
    contentTypeId: 'testTopic',
    inlineTags: {
      '@plugin': '"@modelberry/plugin-contentful/plain"',
      '@type': 'testTopic',
      '@displayField': 'heading',
      '@description':
        'Topic model, a heading, an abstract and a call to action',
    },
    interfaceName: 'ContentfulTestTopic',
    namedImports: [
      'ContentfulSomeOtherAction',
      'ContentfulReference',
      'ContentfulAsset',
      'ContentfulReference',
      'ContentfulAsset',
      'ContentfulReference',
    ],
    propertyTree: {
      abstract: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Abstract',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@validations': 'size-min0-max155 size-min1000-max200',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      actionsCollection: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Actions',
            '@type': 'Array',
            '@itemsType': 'Link',
            '@itemsLinkType': 'Entry',
            '@itemsValidations':
              'linkContentType-testAction linkContentType-someOtherAction',
            '@widgetId': 'entryLinksEditor',
          },
          isRequired: false,
        },
        edges: {
          items: {
            node: {
              createTypeReferenceNode:
                '(ContentfulSomeOtherAction | ContentfulReference)',
              isArrayTypeNode: true,
              isRequired: true,
            },
          },
        },
      },
      heading: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Heading',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      icon: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Icon',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      mediaCollection: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Media',
            '@type': 'Array',
            '@itemsType': 'Link',
            '@itemsLinkType': 'Asset',
            '@widgetId': 'assetLinksEditor',
          },
          isRequired: false,
        },
        edges: {
          items: {
            node: {
              createTypeReferenceNode: 'ContentfulAsset | ContentfulReference',
              isArrayTypeNode: true,
              isRequired: true,
            },
          },
        },
      },
      poster: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Poster',
            '@type': 'Link',
            '@linkType': 'Asset',
            '@widgetId': 'assetLinkEditor',
          },
          isRequired: false,
          createTypeReferenceNode: 'ContentfulAsset | ContentfulReference',
        },
      },
    },
  },
  {
    contentTypeId: 'testAction',
    inlineTags: {
      '@plugin': '"@modelberry/plugin-contentful/plain"',
      '@type': 'testAction',
      '@displayField': 'heading',
    },
    interfaceName: 'ContentfulTestAction',
    namedImports: [],
    propertyTree: {
      anchor: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Anchor',
            '@type': 'Symbol',
            '@helpText': 'Voorbeeld: mijn-anchor',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      description: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Description',
            '@type': 'Symbol',
            '@helpText': 'Omschrijving van de actie, voor zoekmachines',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      eventId: {
        node: {
          blockTag: '@modelberry',
          inlineTags: { '@name': 'Event id', '@type': 'Symbol' },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      heading: {
        node: {
          blockTag: '@modelberry',
          inlineTags: { '@name': 'Heading', '@type': 'Symbol' },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      query: {
        node: {
          blockTag: '@modelberry',
          inlineTags: { '@name': 'Query', '@type': 'Symbol' },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      url: {
        node: {
          blockTag: '@modelberry',
          inlineTags: { '@name': 'Url', '@type': 'Symbol' },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
    },
  },
  {
    contentTypeId: 'navigationSection',
    inlineTags: {
      '@plugin': '"@modelberry/plugin-contentful/plain"',
      '@type': 'navigationSection',
      '@displayField': 'title',
      '@description': 'navigationSection',
    },
    interfaceName: 'ContentfulNavigationSection',
    namedImports: [
      'ContentfulAsset',
      'ContentfulReference',
      'ContentfulAction',
      'ContentfulReference',
      'ContentfulNavigationSegment',
      'ContentfulReference',
      'ContentfulNavigationSegment',
      'ContentfulReference',
      'ContentfulNavigationSegment',
      'ContentfulReference',
      'ContentfulNavigationSegment',
      'ContentfulReference',
      'ContentfulNavigationSegment',
      'ContentfulReference',
      'ContentfulNavigationSegment',
      'ContentfulReference',
      'ContentfulNavigationSegment',
      'ContentfulReference',
    ],
    propertyTree: {
      title: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Title',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      logo: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Logo',
            '@type': 'Link',
            '@linkType': 'Asset',
            '@widgetId': 'assetLinkEditor',
          },
          isRequired: false,
          createTypeReferenceNode: 'ContentfulAsset | ContentfulReference',
        },
      },
      logoAction: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Logo action',
            '@type': 'Link',
            '@linkType': 'Entry',
            '@widgetId': 'entryLinkEditor',
            '@validations': 'linkContentType-action',
          },
          isRequired: false,
          createTypeReferenceNode: 'ContentfulAction | ContentfulReference',
        },
      },
      headerCollection: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Header',
            '@type': 'Array',
            '@itemsType': 'Link',
            '@itemsLinkType': 'Entry',
            '@itemsValidations': 'linkContentType-navigationSegment',
            '@widgetId': 'entryLinksEditor',
          },
          isRequired: false,
        },
        edges: {
          items: {
            node: {
              createTypeReferenceNode:
                '(ContentfulNavigationSegment | ContentfulReference)',
              isArrayTypeNode: true,
              isRequired: true,
            },
          },
        },
      },
      footerCollection: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Footer',
            '@type': 'Array',
            '@itemsType': 'Link',
            '@itemsLinkType': 'Entry',
            '@itemsValidations': 'linkContentType-navigationSegment',
            '@widgetId': 'entryLinksEditor',
          },
          isRequired: false,
        },
        edges: {
          items: {
            node: {
              createTypeReferenceNode:
                '(ContentfulNavigationSegment | ContentfulReference)',
              isArrayTypeNode: true,
              isRequired: true,
            },
          },
        },
      },
      social: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Social',
            '@type': 'Link',
            '@linkType': 'Entry',
            '@widgetId': 'entryLinkEditor',
            '@validations': 'linkContentType-navigationSegment',
          },
          isRequired: false,
          createTypeReferenceNode:
            'ContentfulNavigationSegment | ContentfulReference',
        },
      },
      actions: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Actions',
            '@type': 'Link',
            '@linkType': 'Entry',
            '@widgetId': 'entryLinkEditor',
            '@validations': 'linkContentType-navigationSegment',
          },
          isRequired: false,
          createTypeReferenceNode:
            'ContentfulNavigationSegment | ContentfulReference',
        },
      },
      legal: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Legal',
            '@type': 'Link',
            '@linkType': 'Entry',
            '@widgetId': 'entryLinkEditor',
            '@validations': 'linkContentType-navigationSegment',
          },
          isRequired: false,
          createTypeReferenceNode:
            'ContentfulNavigationSegment | ContentfulReference',
        },
      },
      informationCollection: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Information',
            '@type': 'Array',
            '@itemsType': 'Link',
            '@itemsLinkType': 'Entry',
            '@itemsValidations': 'linkContentType-navigationSegment',
            '@widgetId': 'entryLinksEditor',
          },
          isRequired: false,
        },
        edges: {
          items: {
            node: {
              createTypeReferenceNode:
                '(ContentfulNavigationSegment | ContentfulReference)',
              isArrayTypeNode: true,
              isRequired: true,
            },
          },
        },
      },
      sitemapCollection: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Sitemap',
            '@type': 'Array',
            '@itemsType': 'Link',
            '@itemsLinkType': 'Entry',
            '@itemsValidations': 'linkContentType-navigationSegment',
            '@widgetId': 'entryLinksEditor',
          },
          isRequired: false,
        },
        edges: {
          items: {
            node: {
              createTypeReferenceNode:
                '(ContentfulNavigationSegment | ContentfulReference)',
              isArrayTypeNode: true,
              isRequired: true,
            },
          },
        },
      },
    },
  },
  {
    contentTypeId: 'topicSection',
    inlineTags: {
      '@plugin': '"@modelberry/plugin-contentful/plain"',
      '@type': 'topicSection',
      '@displayField': 'title',
      '@description': 'Topic section',
    },
    interfaceName: 'ContentfulTopicSection',
    namedImports: ['ContentfulTopic', 'ContentfulReference'],
    propertyTree: {
      title: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Titel binnen Contentful',
            '@required': 'true',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
          },
          isRequired: true,
          createKeywordTypeNode: 150,
        },
      },
      variant: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Sectie weergave',
            '@type': 'Symbol',
            '@widgetId': 'dropdown',
            '@helpText': 'Hoe de sectie wordt weergegeven',
            '@validations': 'in-block-card-divider',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      topicsCollection: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Sectie onderwerpen',
            '@type': 'Array',
            '@itemsType': 'Link',
            '@itemsLinkType': 'Entry',
            '@itemsValidations': 'linkContentType-topic',
            '@widgetId': 'entryLinksEditor',
            '@helpText':
              'Eén of meerder onderwerpen die worden weergegeven in de sectie',
          },
          isRequired: false,
        },
        edges: {
          items: {
            node: {
              createTypeReferenceNode:
                '(ContentfulTopic | ContentfulReference)',
              isArrayTypeNode: true,
              isRequired: true,
            },
          },
        },
      },
      hideIcon: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Hide icon',
            '@type': 'Boolean',
            '@widgetId': 'boolean',
          },
          isRequired: false,
          createKeywordTypeNode: 133,
        },
      },
      hideMedia: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Hide media',
            '@type': 'Boolean',
            '@widgetId': 'boolean',
          },
          isRequired: false,
          createKeywordTypeNode: 133,
        },
      },
      hideHeading: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Hide heading',
            '@type': 'Boolean',
            '@widgetId': 'boolean',
          },
          isRequired: false,
          createKeywordTypeNode: 133,
        },
      },
      hideAbstract: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Hide abstract',
            '@type': 'Boolean',
            '@widgetId': 'boolean',
          },
          isRequired: false,
          createKeywordTypeNode: 133,
        },
      },
      hideAction: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Hide action',
            '@type': 'Boolean',
            '@widgetId': 'boolean',
          },
          isRequired: false,
          createKeywordTypeNode: 133,
        },
      },
      reversedOrder: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Reversed order',
            '@type': 'Boolean',
            '@widgetId': 'boolean',
          },
          isRequired: false,
          createKeywordTypeNode: 133,
        },
      },
      eventId: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Event id',
            '@type': 'Symbol',
            '@widgetId': 'slugEditor',
            '@helpText': 'Voorbeeld: mijn-event-id',
            '@validations': 'unique-true',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      theme: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Sectie thema',
            '@type': 'Symbol',
            '@widgetId': 'dropdown',
            '@helpText': 'Kies het thema voor deze sectie',
            '@validations': 'in-glacierLight-glacierDark',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      modelVersion: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@disabled': 'true',
            '@name': '1.0.0',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
    },
  },
  {
    contentTypeId: 'topic',
    inlineTags: {
      '@plugin': '"@modelberry/plugin-contentful/plain"',
      '@type': 'topic',
      '@displayField': 'title',
      '@description': 'Topic',
    },
    interfaceName: 'ContentfulTopic',
    namedImports: [
      'ContentfulAsset',
      'ContentfulReference',
      'ContentfulAction',
      'ContentfulReference',
      'ContentfulAsset',
      'ContentfulReference',
      'ContentfulEmbed',
      'ContentfulReference',
    ],
    propertyTree: {
      title: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Titel binnen Contentful',
            '@required': 'true',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
          },
          isRequired: true,
          createKeywordTypeNode: 150,
        },
      },
      heading: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Onderwerp titel',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText': 'Titel van het onderwerp, zonder punt aan eind',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      abstract: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Onderwerp tekst',
            '@type': 'Text',
            '@widgetId': 'multipleLine',
            '@helpText':
              'Korte omschrijving van het onderwerp, sluit af met een punt',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      mediaCollection: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Onderwerp afbeelding',
            '@type': 'Array',
            '@itemsType': 'Link',
            '@itemsLinkType': 'Asset',
            '@widgetId': 'assetGalleryEditor',
            '@helpText': 'Afbeelding bij het onderwerp',
            '@validations': 'size-min1-max4',
          },
          isRequired: false,
        },
        edges: {
          items: {
            node: {
              createTypeReferenceNode: 'ContentfulAsset | ContentfulReference',
              isArrayTypeNode: true,
              isRequired: true,
            },
          },
        },
      },
      icon: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Onderwerp icoon',
            '@type': 'Symbol',
            '@widgetId': 'dropdown',
            '@helpText': 'Icoon bij het onderwerp',
            '@validations': 'in-activity-airplay',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      actionsCollection: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Onderwerp acties',
            '@type': 'Array',
            '@itemsType': 'Link',
            '@itemsLinkType': 'Entry',
            '@itemsValidations': 'linkContentType-action',
            '@widgetId': 'entryLinksEditor',
            '@helpText':
              'Eén of meerdere acties bij het onderwerp. Een actie heeft een eigen naam en kan ook linken naar een extern bron.',
          },
          isRequired: false,
        },
        edges: {
          items: {
            node: {
              createTypeReferenceNode:
                '(ContentfulAction | ContentfulReference)',
              isArrayTypeNode: true,
              isRequired: true,
            },
          },
        },
      },
      poster: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Poster',
            '@type': 'Link',
            '@linkType': 'Asset',
            '@widgetId': 'assetLinkEditor',
            '@validations': 'linkMimetypeGroup-image',
          },
          isRequired: false,
          createTypeReferenceNode: 'ContentfulAsset | ContentfulReference',
        },
      },
      mediaEmbed: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Media embed',
            '@type': 'Link',
            '@linkType': 'Entry',
            '@widgetId': 'entryLinkEditor',
            '@helpText':
              'Voeg Youtube/Vimeo embed code toe. Note: Media embed ondersteund alleen Embed-type: html',
            '@validations': 'linkContentType-embed',
          },
          isRequired: false,
          createTypeReferenceNode: 'ContentfulEmbed | ContentfulReference',
        },
      },
      modelVersion: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@disabled': 'true',
            '@name': '1.0.0',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
    },
  },
  {
    contentTypeId: 'textSection',
    inlineTags: {
      '@plugin': '"@modelberry/plugin-contentful/plain"',
      '@type': 'textSection',
      '@displayField': 'title',
      '@description': 'Text section',
    },
    interfaceName: 'ContentfulTextSection',
    namedImports: [],
    propertyTree: {
      title: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Titel binnen Contentful',
            '@required': 'true',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
          },
          isRequired: true,
          createKeywordTypeNode: 150,
        },
      },
      variant: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Variant',
            '@type': 'Symbol',
            '@widgetId': 'dropdown',
            '@validations': 'in-text',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      text: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Tekst',
            '@required': 'true',
            '@type': 'RichText',
            '@widgetId': 'richTextEditor',
            '@helpText':
              'Eenvoudig opgemaakte tekstveld met kopjes en afbeeldingen',
            '@validations': 'enabledMarks-bold-italic-underline richText',
          },
          isRequired: true,
        },
        edges: { json: { node: { createTypeReferenceNode: 'any' } } },
      },
      eventId: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Event id',
            '@type': 'Symbol',
            '@widgetId': 'slugEditor',
            '@helpText': 'Voorbeeld: mijn-event-id',
            '@validations': 'unique-true',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      modelVersion: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@disabled': 'true',
            '@name': '1.0.0',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
    },
  },
  {
    contentTypeId: 'navigationSegment',
    inlineTags: {
      '@plugin': '"@modelberry/plugin-contentful/plain"',
      '@type': 'navigationSegment',
      '@displayField': 'title',
      '@description': 'Navigation segment',
    },
    interfaceName: 'ContentfulNavigationSegment',
    namedImports: ['ContentfulAction', 'ContentfulReference'],
    propertyTree: {
      title: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Titel binnen Contentful',
            '@required': 'true',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
          },
          isRequired: true,
          createKeywordTypeNode: 150,
        },
      },
      heading: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Navigatiesegment titel',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'De naam van dit navigatiesegment. Alleen nodig bij meerdere segmenten.',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      abstract: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Segment tekst',
            '@type': 'Text',
            '@widgetId': 'multipleLine',
            '@helpText': 'Tekst voor dit menu segment',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      actionsCollection: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Acties voor dit segment',
            '@type': 'Array',
            '@itemsType': 'Link',
            '@itemsLinkType': 'Entry',
            '@itemsValidations': 'linkContentType-action',
            '@widgetId': 'entryLinksEditor',
            '@helpText': "De pagina's in dit navigatie segment.",
          },
          isRequired: false,
        },
        edges: {
          items: {
            node: {
              createTypeReferenceNode:
                '(ContentfulAction | ContentfulReference)',
              isArrayTypeNode: true,
              isRequired: true,
            },
          },
        },
      },
      modelVersion: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@disabled': 'true',
            '@name': '1.0.0',
            '@type': 'Symbol',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
    },
  },
  {
    contentTypeId: 'page',
    inlineTags: {
      '@plugin': '"@modelberry/plugin-contentful/plain"',
      '@type': 'page',
      '@displayField': 'title',
      '@description': 'Page',
    },
    interfaceName: 'ContentfulPage',
    namedImports: [
      'ContentfulNavigationSection',
      'ContentfulTableSection',
      'ContentfulTextSection',
      'ContentfulTopicSection',
      'ContentfulReference',
      'ContentfulAsset',
      'ContentfulReference',
    ],
    propertyTree: {
      title: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Titel binnen Contentful',
            '@required': 'true',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
          },
          isRequired: true,
          createKeywordTypeNode: 150,
        },
      },
      path: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Pagina URL',
            '@required': 'true',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Laatste deel van de URL naar deze pagina. Bijvoorbeeld: www.mijnsite.nl/stel-dit-deel-hier-in',
            '@validations': 'regexp-1 unique-true',
          },
          isRequired: true,
          createKeywordTypeNode: 150,
        },
      },
      sectionsCollection: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Paginasecties',
            '@required': 'true',
            '@type': 'Array',
            '@itemsType': 'Link',
            '@itemsLinkType': 'Entry',
            '@itemsValidations':
              'linkContentType-navigationSection-tableSection-textSection',
            '@widgetId': 'entryLinksEditor',
            '@helpText': 'Kies de secties die met elkaar deze pagina vormen',
          },
          isRequired: true,
        },
        edges: {
          items: {
            node: {
              createTypeReferenceNode:
                '(ContentfulNavigationSection | ContentfulTableSection | ContentfulTextSection | ContentfulTopicSection | ContentfulReference)',
              isArrayTypeNode: true,
              isRequired: true,
            },
          },
        },
      },
      theme: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Paginathema',
            '@type': 'Symbol',
            '@widgetId': 'dropdown',
            '@helpText': 'Kies het thema voor deze pagina',
            '@validations': 'in-glacierLight-glacierDark',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      seoTitle: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'SEO titel',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Titel van de pagina, gebruikt door zoek machines zoals Google',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      seoDescription: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'SEO omschrijving',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Omschrijving van de pagina, gebruikt door zoek machines zoals Google',
            '@validations': 'size-min0-max155',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      seoImage: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'SEO afbeelding',
            '@type': 'Link',
            '@linkType': 'Asset',
            '@widgetId': 'assetLinkEditor',
            '@helpText':
              'Afbeelding bij de pagina, wordt meegegeven aan een link en weergegeven door social media',
            '@validations': 'linkMimetypeGroup-image',
          },
          isRequired: false,
          createTypeReferenceNode: 'ContentfulAsset | ContentfulReference',
        },
      },
      seoKeywords: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Seo keywords',
            '@type': 'Array',
            '@itemsType': 'Symbol',
            '@widgetId': 'tagEditor',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
          isArrayTypeNode: true,
        },
      },
      modelVersion: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@disabled': 'true',
            '@name': '1.0.0',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
    },
  },
  {
    contentTypeId: 'globals',
    inlineTags: {
      '@plugin': '"@modelberry/plugin-contentful/plain"',
      '@type': 'globals',
      '@displayField': 'title',
      '@description': 'Globals',
    },
    interfaceName: 'ContentfulGlobals',
    namedImports: [
      'ContentfulAsset',
      'ContentfulReference',
      'ContentfulEmbed',
      'ContentfulReference',
    ],
    propertyTree: {
      title: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Titel binnen Contentful',
            '@required': 'true',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
          },
          isRequired: true,
          createKeywordTypeNode: 150,
        },
      },
      siteAuthor: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Site auteur',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText': 'Beschiknaar in alle secties',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      siteDescription: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Site omschrijving',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Omschrijving van de site, gebruikt door zoek machines zoals Google',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      siteHeading: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Site titel',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Titel van de site, gebruikt door zoek machines zoals Google',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      siteKeywords: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Site sleutelwoorden',
            '@type': 'Array',
            '@itemsType': 'Symbol',
            '@widgetId': 'tagEditor',
            '@helpText':
              'Sleutelwoorden voor de site, gebruikt door zoek machines zoals Google',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
          isArrayTypeNode: true,
        },
      },
      siteImage: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Site image',
            '@type': 'Link',
            '@linkType': 'Asset',
            '@widgetId': 'assetLinkEditor',
            '@validations': 'linkMimetypeGroup-image',
          },
          isRequired: false,
          createTypeReferenceNode: 'ContentfulAsset | ContentfulReference',
        },
      },
      siteEmbedsCollection: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Site embeds',
            '@type': 'Array',
            '@itemsType': 'Link',
            '@itemsLinkType': 'Entry',
            '@itemsValidations': 'linkContentType-embed',
            '@widgetId': 'entryLinksEditor',
          },
          isRequired: false,
        },
        edges: {
          items: {
            node: {
              createTypeReferenceNode:
                '(ContentfulEmbed | ContentfulReference)',
              isArrayTypeNode: true,
              isRequired: true,
            },
          },
        },
      },
      skipToContentHeading: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Direct naar content',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Tekst voor schermlezers om direct door te gaan naar de content.',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      modelVersion: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@disabled': 'true',
            '@name': '1.0.0',
            '@type': 'Symbol',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
    },
  },
  {
    contentTypeId: 'embed',
    inlineTags: {
      '@plugin': '"@modelberry/plugin-contentful/plain"',
      '@type': 'embed',
      '@displayField': 'title',
      '@description': 'Embed',
    },
    interfaceName: 'ContentfulEmbed',
    namedImports: [],
    propertyTree: {
      title: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Titel binnen Contentful',
            '@required': 'true',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
          },
          isRequired: true,
          createKeywordTypeNode: 150,
        },
      },
      code: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Code',
            '@type': 'Text',
            '@widgetId': 'multipleLine',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      type: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Type',
            '@type': 'Symbol',
            '@widgetId': 'dropdown',
            '@validations': 'in-html-js-action-js-app',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      modelVersion: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@disabled': 'true',
            '@name': '1.0.0',
            '@type': 'Symbol',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
    },
  },
  {
    contentTypeId: 'action',
    inlineTags: {
      '@plugin': '"@modelberry/plugin-contentful/plain"',
      '@type': 'action',
      '@displayField': 'title',
      '@description': 'Action',
    },
    interfaceName: 'ContentfulAction',
    namedImports: ['ContentfulPage', 'ContentfulReference'],
    propertyTree: {
      title: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Titel binnen Contentful',
            '@required': 'true',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
          },
          isRequired: true,
          createKeywordTypeNode: 150,
        },
      },
      heading: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Actie naam',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText': 'Naam van de actie, zonder punt aan eind',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      description: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Actie omschrijving',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText': 'Omschrijving van de actie, voor zoekmachines',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      icon: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Icon',
            '@type': 'Symbol',
            '@widgetId': 'dropdown',
            '@validations': 'in-activity-airplay',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      page: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Actie paginalink',
            '@type': 'Link',
            '@linkType': 'Entry',
            '@widgetId': 'entryLinkEditor',
            '@helpText':
              'De pagina waar de actie naar linkt (of gebruik de URL)',
            '@validations': 'linkContentType-page',
          },
          isRequired: false,
          createTypeReferenceNode: 'ContentfulPage | ContentfulReference',
        },
      },
      url: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Actie URL',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText':
              'De URL waar de actie naar linkt (of gebruik de paginalink)',
            '@validations': 'regexp-2',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      anchor: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Anchor',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText': 'Voorbeeld: mijn-anchor',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      query: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Query',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
            '@helpText': 'Voorbeeld: &x=1&y=2',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      eventId: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@name': 'Event id',
            '@type': 'Symbol',
            '@widgetId': 'slugEditor',
            '@helpText': 'Voorbeeld: mijn-event-id',
            '@validations': 'unique-true',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
      modelVersion: {
        node: {
          blockTag: '@modelberry',
          inlineTags: {
            '@disabled': 'true',
            '@name': '1.0.0',
            '@type': 'Symbol',
            '@widgetId': 'singleLine',
          },
          isRequired: false,
          createKeywordTypeNode: 150,
        },
      },
    },
  },
]
