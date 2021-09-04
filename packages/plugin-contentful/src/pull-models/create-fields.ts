import { ContentFields } from 'contentful-management/types'
import { tsSyntaxKind } from '@modelberry/mbfactory/plain'
import { copyKeysIfExists } from './copy-keys-if-exists'
import { addValidations } from './add-validations'

export interface CreateFields {
  contentFields: ContentFields[]
  validations: Record<string, any>
}

export const createFields = ({ contentFields, validations }: CreateFields) => {
  const fields: Record<string, any> = {}
  for (const contentField of contentFields) {
    const inlineTags: Record<string, any> = {}
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
      if (contentField.items.validations) {
        addValidations({
          add: contentField.items.validations,
          tag: '@itemsValidations',
          tags: inlineTags,
          validations,
        })
      }
    }
    if (contentField.type === 'Link') {
      copyKeysIfExists({
        asTag: true,
        source: contentField,
        target: inlineTags,
        keys: ['linkType'],
      })
    }
    if (contentField.validations) {
      addValidations({
        add: contentField.validations,
        tag: '@validations',
        tags: inlineTags,
        validations,
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
