import {
  DropdownField,
  LongTextField,
  MediaField,
  MultipleComponentsField,
  RichTextField,
  ShortTextField,
  SingleComponentField,
  WheelroomComponents,
} from '@wheelroom/wheelroom'
import { featherIcons } from './feather-icons'

export const models: WheelroomComponents = {
  docSection: {
    fields: {
      variation: {
        items: ['doc'],
        type: 'dropdown',
      } as DropdownField,
      docs: {
        allowedComponents: ['doc'],
        type: 'multipleComponents',
      } as MultipleComponentsField,
      eventId: {
        type: 'shortText',
        initialContent: 'initial-content-for-doc-section-event-id',
        typePostfix: 'Slug',
        helpText: 'Example: my-event-id',
        unique: true,
      } as ShortTextField,
    },
    modelVersion: '1.0.0',
    settings: {
      // asPageSection will create boilerplate code
      asBoilerplate: false,
      asFragment: true,
      asPageSection: true,
    },
  },
  doc: {
    fields: {
      heading: {
        type: 'shortText',
      } as ShortTextField,
      abstract: {
        type: 'longText',
      } as LongTextField,
      media: {
        type: 'media',
      } as MediaField,
      icon: {
        items: featherIcons,
        type: 'dropdown',
      } as DropdownField,
      slug: {
        initialContent: 'initial-boilerplate-slug',
        required: true,
        type: 'shortText',
        typePostfix: 'Slug',
        unique: true,
      } as ShortTextField,
      text: {
        required: true,
        type: 'richText',
      } as RichTextField,
      parent: {
        allowedComponents: ['doc'],
        initialContent: undefined,
        type: 'singleComponent',
        expandFragmentRef: true,
      } as SingleComponentField,
      sortOrder: {
        type: 'shortText',
      } as ShortTextField,
    },
    modelVersion: '1.0.0',
    settings: {
      asFragment: true,
      asQuery: 'subPage',
    },
  },
}
