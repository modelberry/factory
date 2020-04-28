import {
  CheckboxField,
  DropdownField,
  LongTextField,
  MediaField,
  MultipleComponentsField,
  RichTextField,
  ShortTextField,
  SingleComponentField,
  TagsField,
  WheelroomComponents,
} from '@wheelroom/wheelroom'

export const models: WheelroomComponents = {
  topic: {
    fields: {
      heading: {
        helpText: 'Titel van het onderwerp, zonder punt aan eind',
        name: 'Onderwerp titel',
        type: 'shortText',
      } as ShortTextField,
      abstract: {
        helpText: 'Korte omschrijving van het onderwerp, sluit af met een punt',
        name: 'Onderwerp tekst',
        type: 'longText',
      } as LongTextField,
      media: {
        helpText: 'Afbeelding bij het onderwerp',
        name: 'Onderwerp afbeelding',
        type: 'media',
      } as MediaField,
      icon: {
        helpText: 'Icoon bij het onderwerp',
        name: 'Onderwerp icoon',
        items: [
          'activity',
          'airplay',
          'alert-circle',
          'alert-octagon',
          'alert-triangle',
          'align-center',
          'align-justify',
          'align-left',
          'align-right',
          'anchor',
          'aperture',
          'archive',
          'arrow-down-circle',
          'arrow-down-left',
          'arrow-down-right',
          'arrow-down',
          'arrow-left-circle',
          'arrow-left',
          'arrow-right-circle',
          'arrow-right',
          'arrow-up-circle',
          'arrow-up-left',
          'arrow-up-right',
          'arrow-up',
          'at-sign',
          'award',
          'bar-chart-2',
          'bar-chart',
          'battery-charging',
          'battery',
          'bell-off',
          'bell',
          'bluetooth',
          'bold',
          'book-open',
          'book',
          'bookmark',
          'box',
          'briefcase',
          'calendar',
          'camera-off',
          'camera',
          'cast',
          'check-circle',
          'check-square',
          'check',
          'chevron-down',
          'chevron-left',
          'chevron-right',
          'chevron-up',
          'chevrons-down',
          'chevrons-left',
          'chevrons-right',
          'chevrons-up',
          'chrome',
          'circle',
          'clipboard',
          'clock',
          'cloud-drizzle',
          'cloud-lightning',
          'cloud-off',
          'cloud-rain',
          'cloud-snow',
          'cloud',
          'code',
          'codepen',
          'codesandbox',
          'coffee',
          'columns',
          'command',
          'compass',
          'copy',
          'corner-down-left',
          'corner-down-right',
          'corner-left-down',
          'corner-left-up',
          'corner-right-down',
          'corner-right-up',
          'corner-up-left',
          'corner-up-right',
          'cpu',
          'credit-card',
          'crop',
          'crosshair',
          'database',
          'delete',
          'disc',
          'dollar-sign',
          'download-cloud',
          'download',
          'droplet',
          'edit-2',
          'edit-3',
          'edit',
          'external-link',
          'eye-off',
          'eye',
          'facebook',
          'fast-forward',
          'feather',
          'figma',
          'file-minus',
          'file-plus',
          'file-text',
          'file',
          'film',
          'filter',
          'flag',
          'folder-minus',
          'folder-plus',
          'folder',
          'framer',
          'frown',
          'gift',
          'git-branch',
          'git-commit',
          'git-merge',
          'git-pull-request',
          'github',
          'gitlab',
          'globe',
          'grid',
          'hard-drive',
          'hash',
          'headphones',
          'heart',
          'help-circle',
          'hexagon',
          'home',
          'image',
          'inbox',
          'info',
          'instagram',
          'italic',
          'key',
          'layers',
          'layout',
          'life-buoy',
          'link-2',
          'link',
          'linkedin',
          'list',
          'loader',
          'lock',
          'log-in',
          'log-out',
          'mail',
          'map-pin',
          'map',
          'maximize-2',
          'maximize',
          'meh',
          'menu',
          'message-circle',
          'message-square',
          'mic-off',
          'mic',
          'minimize-2',
          'minimize',
          'minus-circle',
          'minus-square',
          'minus',
          'monitor',
          'moon',
          'more-horizontal',
          'more-vertical',
          'mouse-pointer',
          'move',
          'music',
          'navigation-2',
          'navigation',
          'octagon',
          'package',
          'paperclip',
          'pause-circle',
          'pause',
          'pen-tool',
          'percent',
          'phone-call',
          'phone-forwarded',
          'phone-incoming',
          'phone-missed',
          'phone-off',
          'phone-outgoing',
          'phone',
          'pie-chart',
          'play-circle',
          'play',
          'plus-circle',
          'plus-square',
          'plus',
          'pocket',
          'power',
          'printer',
          'radio',
          'refresh-ccw',
          'refresh-cw',
          'repeat',
          'rewind',
          'rotate-ccw',
          'rotate-cw',
          'rss',
          'save',
          'scissors',
          'search',
          'send',
          'server',
          'settings',
          'share-2',
          'share',
          'shield-off',
          'shield',
          'shopping-bag',
          'shopping-cart',
          'shuffle',
          'sidebar',
          'skip-back',
          'skip-forward',
          'slack',
          'slash',
          'sliders',
          'smartphone',
          'smile',
          'speaker',
          'square',
          'star',
          'stop-circle',
          'sun',
          'sunrise',
          'sunset',
          'tablet',
          'tag',
          'target',
          'terminal',
          'thermometer',
          'thumbs-down',
          'thumbs-up',
          'toggle-left',
          'toggle-right',
          'tool',
          'trash-2',
          'trash',
          'trello',
          'trending-down',
          'trending-up',
          'triangle',
          'truck',
          'tv',
          'twitch',
          'twitter',
          'type',
          'umbrella',
          'underline',
          'unlock',
          'upload-cloud',
          'upload',
          'user-check',
          'user-minus',
          'user-plus',
          'user-x',
          'user',
          'users',
          'video-off',
          'video',
          'voicemail',
          'volume-1',
          'volume-2',
          'volume-x',
          'volume',
          'watch',
          'wifi-off',
          'wifi',
          'wind',
          'x-circle',
          'x-octagon',
          'x-square',
          'x',
          'youtube',
          'zap-off',
          'zap',
          'zoom-in',
          'zoom-out',
        ],
        type: 'dropdown',
      } as DropdownField,
      actions: {
        allowedComponents: ['action'],
        helpText:
          'Eén of meerdere acties bij het onderwerp. Een actie heeft een eigen naam en kan ook linken naar een extern bron.',
        name: 'Onderwerp acties',
        type: 'multipleComponents',
      } as MultipleComponentsField,
    },
    settings: {
      asBoilerplate: true,
      asFragment: true,
    },
    modelVersion: '1.0.0',
  },
  action: {
    fields: {
      heading: {
        helpText: 'Naam van de actie, zonder punt aan eind',
        name: 'Actie naam',
        type: 'shortText',
      } as ShortTextField,
      description: {
        helpText: 'Omschrijving van de actie, voor zoekmachines',
        name: 'Actie omschrijving',
        type: 'shortText',
      } as ShortTextField,
      page: {
        allowedComponents: ['page'],
        // Limit expanding pages, prevent circ refs
        expandFragmentRef: true,
        helpText: 'De pagina waar de actie naar linkt (of gebruik de URL)',
        name: 'Actie paginalink',
        type: 'singleComponent',
      } as SingleComponentField,
      url: {
        helpText: 'De URL waar de actie naar linkt (of gebruik de paginalink)',
        initialContent: 'https://localhost:8000',
        name: 'Actie URL',
        type: 'shortText',
        typePostfix: 'Url',
      } as ShortTextField,
    },
    settings: {
      asBoilerplate: true,
      asFragment: true,
    },
    modelVersion: '1.0.0',
  },
  navigationSegment: {
    fields: {
      heading: {
        helpText:
          'De naam van dit navigatiesegment. Alleen nodig bij meerdere segmenten.',
        name: 'Navigatiesegment titel',
        type: 'shortText',
      } as ShortTextField,
      pages: {
        allowedComponents: ['page'],
        helpText: "De pagina's in dit navigatie segment.",
        name: "Naviagtie segment Pagina's",
        // Limit expanding pages, prevent circ refs
        expandFragmentRef: true,
        type: 'multipleComponents',
      } as MultipleComponentsField,
    },
    settings: {
      asBoilerplate: true,
      asFragment: true,
    },
    modelVersion: '1.0.0',
  },
  navigation: {
    fields: {
      segments: {
        allowedComponents: ['navigationSegment'],
        helpText:
          "Een navigatie segment bevat verwijzingen naar pagina's. Navigatie kan worden opgebouwd uit meerdere segmenten.",
        name: 'Navigatie segmenten',
        type: 'multipleComponents',
      } as MultipleComponentsField,
      skipToContentHeading: {
        helpText:
          'Tekst voor schermlezers om direct door te gaan naar de content.',
        name: 'Direct naar content',
        type: 'shortText',
      } as ShortTextField,
      brandAction: {
        allowedComponents: ['action'],
        helpText: 'Actie die wordt gebruikt voor het logo',
        name: 'Logo actie',
        type: 'singleComponent',
      } as SingleComponentField,
    },
    settings: {
      asBoilerplate: true,
      asFragment: true,
    },
    modelVersion: '1.0.0',
  },
  text: {
    fields: {
      text: {
        helpText: 'Eenvoudig opgemaakte tekstveld met kopjes en afbeeldingen',
        name: 'Tekst',
        required: true,
        type: 'richText',
      } as RichTextField,
    },
    modelVersion: '1.0.0',
    settings: {
      asBoilerplate: true,
      asFragment: true,
    },
  },
  pageSection: {
    fields: {
      variation: {
        helpText: 'Hoe de sectie wordt weergegeven',
        name: 'Sectie weergave',
        items: [
          'block-wr',
          'card-wr',
          'featured-wr',
          'gallery-wr',
          'headline-wr',
          'hero-wr',
          'image-wr',
          'navigation-wr',
          'quote-wr',
          'showcase-wr',
          'text-wr',
          'video-wr',
        ],
        type: 'dropdown',
      } as DropdownField,
      topics: {
        allowedComponents: ['topic'],
        helpText:
          'Eén of meerder onderwerpen die worden weergegeven in de sectie',
        name: 'Sectie onderwerpen',
        type: 'multipleComponents',
      } as MultipleComponentsField,
      topicOptions: {
        helpText:
          'Deze opties passen de weergave van de onderwerpen in de sectie aan.',
        initialContent: ['Verberg icoon'],
        items: [
          'Verberg actie',
          'Verberg icoon',
          'Verberg media',
          'Verberg tekst',
          'Verberg titel',
          'Draai volgorde om',
        ],
        name: 'Onderwerp opties',
        type: 'checkbox',
      } as CheckboxField,
      text: {
        allowedComponents: ['text'],
        helpText: 'Tekst die wordt weergegeven in de sectie',
        name: 'Sectie tekst',
        type: 'singleComponent',
      } as SingleComponentField,
      navigation: {
        allowedComponents: ['navigation'],
        helpText: 'De navigatie die gebruikt wordt in de sectie',
        name: 'Sectie navigatie',
        type: 'singleComponent',
      } as SingleComponentField,
      actions: {
        allowedComponents: ['action'],
        helpText:
          'Eén of meerdere acties in de sectie. Een actie heeft een eigen naam en kan ook linken naar een extern bron.',
        name: 'Sectie acties',
        type: 'multipleComponents',
      } as MultipleComponentsField,
    },
    modelVersion: '1.0.0',
    settings: {
      // asPageSection will create boilerplate code
      asBoilerplate: false,
      asFragment: true,
      asPageSection: true,
    },
  },
  page: {
    fields: {
      path: {
        helpText:
          'Laatste deel van de URL naar deze pagina. Bijvoorbeeld: www.mijnsite.nl/stel-dit-deel-hier-in',
        initialContent: '/boilerplate',
        name: 'Pagina URL',
        required: true,
        type: 'shortText',
        typePostfix: 'Path',
        unique: true,
      } as ShortTextField,
      navigationHeading: {
        helpText:
          'De titel die wordt gebruikt wanneer de pagina in een menu staat',
        name: 'Menu titel',
        type: 'shortText',
      } as ShortTextField,
      sections: {
        allowedComponents: [
          '%componentNameArray(filter:settings.asPageSection)%',
        ],
        helpText: 'Kies de secties die met elkaar deze pagina vormen',
        initialContent: ['%componentNameArray(filter:settings.asPageSection)%'],
        name: 'Paginasecties',
        required: true,
        type: 'multipleComponents',
      } as MultipleComponentsField,
      theme: {
        helpText: 'Kies het thema voor deze pagina',
        items: ['light', 'dark'],
        name: 'Paginathema',
        type: 'dropdown',
      } as DropdownField,
      seoTitle: {
        helpText:
          'Titel van de pagina, gebruikt door zoek machines zoals Google',
        name: 'SEO titel',
        type: 'shortText',
      } as ShortTextField,
      seoDescription: {
        helpText:
          'Omschrijving van de pagina, gebruikt door zoek machines zoals Google',
        maxLength: 155,
        name: 'SEO omschrijving',
        type: 'shortText',
      } as ShortTextField,
      seoImage: {
        helpText:
          'Afbeelding bij de pagina, wordt meegegeven aan een link en weergegeven door social media',
        name: 'SEO afbeelding',
        type: 'media',
      } as MediaField,
    },
    modelVersion: '1.0.0',
    settings: {
      asFragment: true,
      asQuery: 'page',
    },
  },
  globals: {
    fields: {
      siteAuthor: {
        helpText: 'Beschiknaar in alle secties',
        name: 'Site auteur',
        type: 'shortText',
      } as ShortTextField,
      siteDescription: {
        helpText:
          'Omschrijving van de site, gebruikt door zoek machines zoals Google',
        name: 'Site omschrijving',
        type: 'shortText',
      } as ShortTextField,
      siteHeading: {
        helpText: 'Titel van de site, gebruikt door zoek machines zoals Google',
        name: 'Site titel',
        type: 'shortText',
      } as ShortTextField,
      siteKeywords: {
        helpText:
          'Sleutelwoorden voor de site, gebruikt door zoek machines zoals Google',
        name: 'Site sleutelwoorden',
        type: 'tags',
      } as TagsField,
    },
    modelVersion: '1.0.0',
    settings: {
      asFragment: true,
      asQuery: 'global',
    },
  },
}
