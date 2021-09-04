import { ContentFields } from 'contentful-management/types'
import { tsSyntaxKind } from '@modelberry/mbfactory/plain'
import { copyKeysIfExists } from './copy-keys-if-exists'

export interface CreateFields {
  contentFields: ContentFields[]
}

export const createFields = ({ contentFields }: CreateFields) => {
  const fields: Record<string, any> = {}
  for (const contentField of contentFields) {
    const inlineTags = {
      '@validation': 'shortString',
    }
    copyKeysIfExists({
      asTag: true,
      source: contentField,
      target: inlineTags,
      keys: ['disabled', 'localized', 'name', 'omited', 'required', 'type'],
    })
    if (contentField.type === 'Array' && contentField.items) {
      copyKeysIfExists({
        asItems: true,
        asTag: true,
        source: contentField.items,
        target: inlineTags,
        keys: ['type', 'linkType'],
      })
    }
    if (contentField.type === 'Link') {
      copyKeysIfExists({
        asTag: true,
        source: contentField,
        target: inlineTags,
        keys: ['linkType'],
      })
    }
    fields[contentField.id] = {
      blockTag: '@modelberry',
      inlineTags,
      isRequired: contentField.required,
      tsSyntaxKind: tsSyntaxKind.StringKeyword,
    }
  }
  return fields
}
