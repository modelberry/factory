export const editorInterfaces: Record<string, any> = {
  testTopic: {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: { sys: { id: 'tctsmza39jg6', type: 'Link', linkType: 'Space' } },
      version: 11,
      createdAt: '2021-08-06T16:53:45.223Z',
      createdBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      updatedAt: '2021-08-08T19:29:00.057Z',
      updatedBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      contentType: {
        sys: { id: 'testTopic', type: 'Link', linkType: 'ContentType' },
      },
      environment: {
        sys: { id: 'master', type: 'Link', linkType: 'Environment' },
      },
    },
    controls: [
      {
        fieldId: 'abstract',
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'actions',
        widgetId: 'entryLinksEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'heading',
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      { fieldId: 'icon', widgetId: 'singleLine', widgetNamespace: 'builtin' },
      {
        fieldId: 'media',
        widgetId: 'assetLinksEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'poster',
        widgetId: 'assetLinkEditor',
        widgetNamespace: 'builtin',
      },
    ],
  },
  testAction: {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: { sys: { id: 'tctsmza39jg6', type: 'Link', linkType: 'Space' } },
      version: 36,
      createdAt: '2021-08-05T21:24:24.051Z',
      createdBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      updatedAt: '2021-08-08T19:28:57.798Z',
      updatedBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      contentType: {
        sys: { id: 'testAction', type: 'Link', linkType: 'ContentType' },
      },
      environment: {
        sys: { id: 'master', type: 'Link', linkType: 'Environment' },
      },
    },
    controls: [
      {
        fieldId: 'anchor',
        settings: { helpText: 'Voorbeeld: mijn-anchor' },
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'description',
        settings: { helpText: 'Omschrijving van de actie, voor zoekmachines' },
        widgetNamespace: 'builtin',
      },
    ],
  },
  navigationSection: {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: { sys: { id: 'tctsmza39jg6', type: 'Link', linkType: 'Space' } },
      version: 2,
      createdAt: '2021-08-05T21:24:23.695Z',
      createdBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      updatedAt: '2021-08-05T21:24:27.486Z',
      updatedBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      contentType: {
        sys: { id: 'navigationSection', type: 'Link', linkType: 'ContentType' },
      },
      environment: {
        sys: { id: 'master', type: 'Link', linkType: 'Environment' },
      },
    },
    controls: [
      { fieldId: 'title', widgetId: 'singleLine', widgetNamespace: 'builtin' },
      {
        fieldId: 'logo',
        widgetId: 'assetLinkEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'logoAction',
        widgetId: 'entryLinkEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'header',
        widgetId: 'entryLinksEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'footer',
        widgetId: 'entryLinksEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'social',
        widgetId: 'entryLinkEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'actions',
        widgetId: 'entryLinkEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'legal',
        widgetId: 'entryLinkEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'information',
        widgetId: 'entryLinksEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'sitemap',
        widgetId: 'entryLinksEditor',
        widgetNamespace: 'builtin',
      },
    ],
  },
  topicSection: {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: { sys: { id: 'tctsmza39jg6', type: 'Link', linkType: 'Space' } },
      version: 2,
      createdAt: '2021-08-05T21:24:23.079Z',
      createdBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      updatedAt: '2021-08-05T21:24:26.390Z',
      updatedBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      contentType: {
        sys: { id: 'topicSection', type: 'Link', linkType: 'ContentType' },
      },
      environment: {
        sys: { id: 'master', type: 'Link', linkType: 'Environment' },
      },
    },
    controls: [
      {
        fieldId: 'title',
        settings: {
          helpText:
            'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
        },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'variant',
        settings: { helpText: 'Hoe de sectie wordt weergegeven' },
        widgetId: 'dropdown',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'topics',
        settings: {
          helpText:
            'E\u00E9n of meerder onderwerpen die worden weergegeven in de sectie',
        },
        widgetId: 'entryLinksEditor',
        widgetNamespace: 'builtin',
      },
      { fieldId: 'hideIcon', widgetId: 'boolean', widgetNamespace: 'builtin' },
      { fieldId: 'hideMedia', widgetId: 'boolean', widgetNamespace: 'builtin' },
      {
        fieldId: 'hideHeading',
        widgetId: 'boolean',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'hideAbstract',
        widgetId: 'boolean',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'hideAction',
        widgetId: 'boolean',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'reversedOrder',
        widgetId: 'boolean',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'eventId',
        settings: { helpText: 'Voorbeeld: mijn-event-id' },
        widgetId: 'slugEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'theme',
        settings: { helpText: 'Kies het thema voor deze sectie' },
        widgetId: 'dropdown',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'modelVersion',
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
    ],
  },
  topic: {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: { sys: { id: 'tctsmza39jg6', type: 'Link', linkType: 'Space' } },
      version: 2,
      createdAt: '2021-08-05T21:24:22.729Z',
      createdBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      updatedAt: '2021-08-05T21:24:26.396Z',
      updatedBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      contentType: {
        sys: { id: 'topic', type: 'Link', linkType: 'ContentType' },
      },
      environment: {
        sys: { id: 'master', type: 'Link', linkType: 'Environment' },
      },
    },
    controls: [
      {
        fieldId: 'title',
        settings: {
          helpText:
            'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
        },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'heading',
        settings: { helpText: 'Titel van het onderwerp, zonder punt aan eind' },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'abstract',
        settings: {
          helpText:
            'Korte omschrijving van het onderwerp, sluit af met een punt',
        },
        widgetId: 'multipleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'media',
        settings: { helpText: 'Afbeelding bij het onderwerp' },
        widgetId: 'assetGalleryEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'icon',
        settings: { helpText: 'Icoon bij het onderwerp' },
        widgetId: 'dropdown',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'actions',
        settings: {
          helpText:
            'E\u00E9n of meerdere acties bij het onderwerp. Een actie heeft een eigen naam en kan ook linken naar een extern bron.',
        },
        widgetId: 'entryLinksEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'poster',
        settings: { helpText: '' },
        widgetId: 'assetLinkEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'mediaEmbed',
        settings: {
          helpText:
            'Voeg Youtube/Vimeo embed code toe. Note: Media embed ondersteund alleen Embed-type: html',
        },
        widgetId: 'entryLinkEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'modelVersion',
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
    ],
  },
  textSection: {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: { sys: { id: 'tctsmza39jg6', type: 'Link', linkType: 'Space' } },
      version: 2,
      createdAt: '2021-08-05T21:24:22.396Z',
      createdBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      updatedAt: '2021-08-05T21:24:26.393Z',
      updatedBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      contentType: {
        sys: { id: 'textSection', type: 'Link', linkType: 'ContentType' },
      },
      environment: {
        sys: { id: 'master', type: 'Link', linkType: 'Environment' },
      },
    },
    controls: [
      {
        fieldId: 'title',
        settings: {
          helpText:
            'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
        },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'variant',
        settings: { helpText: '' },
        widgetId: 'dropdown',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'text',
        settings: {
          helpText: 'Eenvoudig opgemaakte tekstveld met kopjes en afbeeldingen',
        },
        widgetId: 'richTextEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'eventId',
        settings: { helpText: 'Voorbeeld: mijn-event-id' },
        widgetId: 'slugEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'modelVersion',
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
    ],
  },
  navigationSegment: {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: { sys: { id: 'tctsmza39jg6', type: 'Link', linkType: 'Space' } },
      version: 2,
      createdAt: '2021-08-05T21:24:21.871Z',
      createdBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      updatedAt: '2021-08-05T21:24:25.398Z',
      updatedBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      contentType: {
        sys: { id: 'navigationSegment', type: 'Link', linkType: 'ContentType' },
      },
      environment: {
        sys: { id: 'master', type: 'Link', linkType: 'Environment' },
      },
    },
    controls: [
      {
        fieldId: 'title',
        settings: {
          helpText:
            'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
        },
        widgetId: 'singleLine',
      },
      {
        fieldId: 'heading',
        settings: {
          helpText:
            'De naam van dit navigatiesegment. Alleen nodig bij meerdere segmenten.',
        },
        widgetId: 'singleLine',
      },
      {
        fieldId: 'abstract',
        settings: { helpText: 'Tekst voor dit menu segment' },
        widgetId: 'multipleLine',
      },
      {
        fieldId: 'actions',
        settings: { helpText: "De pagina's in dit navigatie segment." },
        widgetId: 'entryLinksEditor',
      },
      { fieldId: 'modelVersion' },
    ],
  },
  page: {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: { sys: { id: 'tctsmza39jg6', type: 'Link', linkType: 'Space' } },
      version: 2,
      createdAt: '2021-08-05T21:24:21.508Z',
      createdBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      updatedAt: '2021-08-05T21:24:26.395Z',
      updatedBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      contentType: {
        sys: { id: 'page', type: 'Link', linkType: 'ContentType' },
      },
      environment: {
        sys: { id: 'master', type: 'Link', linkType: 'Environment' },
      },
    },
    controls: [
      {
        fieldId: 'title',
        settings: {
          helpText:
            'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
        },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'path',
        settings: {
          helpText:
            'Laatste deel van de URL naar deze pagina. Bijvoorbeeld: www.mijnsite.nl/stel-dit-deel-hier-in',
        },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'sections',
        settings: {
          helpText: 'Kies de secties die met elkaar deze pagina vormen',
        },
        widgetId: 'entryLinksEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'theme',
        settings: { helpText: 'Kies het thema voor deze pagina' },
        widgetId: 'dropdown',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'seoTitle',
        settings: {
          helpText:
            'Titel van de pagina, gebruikt door zoek machines zoals Google',
        },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'seoDescription',
        settings: {
          helpText:
            'Omschrijving van de pagina, gebruikt door zoek machines zoals Google',
        },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'seoImage',
        settings: {
          helpText:
            'Afbeelding bij de pagina, wordt meegegeven aan een link en weergegeven door social media',
        },
        widgetId: 'assetLinkEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'seoKeywords',
        settings: { helpText: '' },
        widgetId: 'tagEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'modelVersion',
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
    ],
  },
  globals: {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: { sys: { id: 'tctsmza39jg6', type: 'Link', linkType: 'Space' } },
      version: 2,
      createdAt: '2021-08-05T21:24:21.169Z',
      createdBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      updatedAt: '2021-08-05T21:24:26.403Z',
      updatedBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      contentType: {
        sys: { id: 'globals', type: 'Link', linkType: 'ContentType' },
      },
      environment: {
        sys: { id: 'master', type: 'Link', linkType: 'Environment' },
      },
    },
    controls: [
      {
        fieldId: 'title',
        settings: {
          helpText:
            'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
        },
        widgetId: 'singleLine',
      },
      {
        fieldId: 'siteAuthor',
        settings: { helpText: 'Beschiknaar in alle secties' },
        widgetId: 'singleLine',
      },
      {
        fieldId: 'siteDescription',
        settings: {
          helpText:
            'Omschrijving van de site, gebruikt door zoek machines zoals Google',
        },
        widgetId: 'singleLine',
      },
      {
        fieldId: 'siteHeading',
        settings: {
          helpText:
            'Titel van de site, gebruikt door zoek machines zoals Google',
        },
        widgetId: 'singleLine',
      },
      {
        fieldId: 'siteKeywords',
        settings: {
          helpText:
            'Sleutelwoorden voor de site, gebruikt door zoek machines zoals Google',
        },
        widgetId: 'tagEditor',
      },
      {
        fieldId: 'siteImage',
        settings: { helpText: '' },
        widgetId: 'assetLinkEditor',
      },
      {
        fieldId: 'siteEmbeds',
        settings: { helpText: '' },
        widgetId: 'entryLinksEditor',
      },
      {
        fieldId: 'skipToContentHeading',
        settings: {
          helpText:
            'Tekst voor schermlezers om direct door te gaan naar de content.',
        },
        widgetId: 'singleLine',
      },
      { fieldId: 'modelVersion' },
    ],
  },
  embed: {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: { sys: { id: 'tctsmza39jg6', type: 'Link', linkType: 'Space' } },
      version: 2,
      createdAt: '2021-08-05T21:24:20.813Z',
      createdBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      updatedAt: '2021-08-05T21:24:25.412Z',
      updatedBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      contentType: {
        sys: { id: 'embed', type: 'Link', linkType: 'ContentType' },
      },
      environment: {
        sys: { id: 'master', type: 'Link', linkType: 'Environment' },
      },
    },
    controls: [
      {
        fieldId: 'title',
        settings: {
          helpText:
            'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
        },
        widgetId: 'singleLine',
      },
      { fieldId: 'code', settings: { helpText: '' }, widgetId: 'multipleLine' },
      { fieldId: 'type', settings: { helpText: '' }, widgetId: 'dropdown' },
      { fieldId: 'modelVersion' },
    ],
  },
  action: {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: { sys: { id: 'tctsmza39jg6', type: 'Link', linkType: 'Space' } },
      version: 2,
      createdAt: '2021-08-05T21:24:20.506Z',
      createdBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      updatedAt: '2021-08-05T21:24:26.401Z',
      updatedBy: {
        sys: { id: '5TOHdotj5KMHTHKvucd6zZ', type: 'Link', linkType: 'User' },
      },
      contentType: {
        sys: { id: 'action', type: 'Link', linkType: 'ContentType' },
      },
      environment: {
        sys: { id: 'master', type: 'Link', linkType: 'Environment' },
      },
    },
    controls: [
      {
        fieldId: 'title',
        settings: {
          helpText:
            'Alleen gebruikt in Contentful, wordt nooit getoond op de site zelf',
        },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'heading',
        settings: { helpText: 'Naam van de actie, zonder punt aan eind' },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'description',
        settings: { helpText: 'Omschrijving van de actie, voor zoekmachines' },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'icon',
        settings: { helpText: '' },
        widgetId: 'dropdown',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'page',
        settings: {
          helpText: 'De pagina waar de actie naar linkt (of gebruik de URL)',
        },
        widgetId: 'entryLinkEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'url',
        settings: {
          helpText:
            'De URL waar de actie naar linkt (of gebruik de paginalink)',
        },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'anchor',
        settings: { helpText: 'Voorbeeld: mijn-anchor' },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'query',
        settings: { helpText: 'Voorbeeld: &x=1&y=2' },
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'eventId',
        settings: { helpText: 'Voorbeeld: mijn-event-id' },
        widgetId: 'slugEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'modelVersion',
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
    ],
  },
}
