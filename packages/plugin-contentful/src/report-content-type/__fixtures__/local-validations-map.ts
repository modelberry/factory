export const localValidationsMap = {
  'shortString': { size: { max: 155, min: 0 } },
  'longString': { size: { max: 200, min: 1000 } },
  'linkContentType-testAction': { linkContentType: ['testAction'] },
  'linkContentType-someOtherAction': { linkContentType: ['someOtherAction'] },
  'linkContentType-action': { linkContentType: ['action'] },
  'linkContentType-navigationSegment': {
    linkContentType: ['navigationSegment'],
  },
  'in-block-card-divider': {
    in: [
      'block',
      'card',
      'divider',
      'featured',
      'gallery',
      'headline',
      'hero',
      'image',
      'quote',
      'showcase',
      'video',
    ],
  },
  'linkContentType-topic': { linkContentType: ['topic'] },
  'unique-true': { unique: true },
  'in-glacierLight-glacierDark': { in: ['glacierLight', 'glacierDark'] },
  'size-min1-max4': { size: { min: 1, max: 4 } },
  'in-activity-airplay': { in: ['activity', 'airplay'] },
  'linkMimetypeGroup-image': { linkMimetypeGroup: ['image'] },
  'linkContentType-embed': { linkContentType: ['embed'] },
  'in-text': { in: ['text'] },
  'enabledMarks-bold-italic-underline': {
    enabledMarks: ['bold', 'italic', 'underline', 'code'],
    message: 'Only bold, italic, underline, and code marks are allowed',
  },
  richText: {
    nodes: {
      'embedded-entry-block': [{ linkContentType: ['embed', 'topicSection'] }],
      'embedded-entry-inline': [
        { linkContentType: ['embed', 'topicSection'], message: null },
      ],
    },
  },
  'regexp-1': {
    message: 'Please use a valid path: /this/is/a/valid/path/with/:slug',
    regexp: {
      pattern: '^\\/[a-z0-9:\\._/~%\\-\\+&\\#\\?!=\\(\\)@]*$',
      flags: '',
    },
  },
  'linkContentType-navigationSection-tableSection-textSection': {
    linkContentType: [
      'navigationSection',
      'tableSection',
      'textSection',
      'topicSection',
    ],
  },
  'in-html-js-action-js-app': {
    in: [
      'html',
      'js-action',
      'js-app',
      'js-page-section',
      'js-page',
      'youtube',
    ],
  },
  'linkContentType-page': { linkContentType: ['page'] },
  'regexp-2': {
    message: 'Please use a valid url: https://this/is/a/valid/url',
    regexp: {
      pattern:
        '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$',
      flags: '',
    },
  },
}
