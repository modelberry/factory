import { ContentFields } from 'contentful-management/types'
import { copyKeysIfExists } from './copy-keys-if-exists'
import { addValidations } from './add-validations'
import { getTsSyntaxKind } from './get-ts-syntax-kind'

export interface GetFields {
  contentFields: ContentFields[]
  editorInterfaces: Record<string, any>
  validations: Record<string, any>
}

export const getFields = ({
  contentFields,
  editorInterfaces,
  validations,
}: GetFields) => {
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
    copyKeysIfExists({
      asTag: true,
      keys: ['widgetId', 'widgetNamespace', 'helpText'],
      source: editorInterfaces[contentField.id],
      target: inlineTags,
    })
    if (contentField.validations) {
      addValidations({
        add: contentField.validations,
        tag: '@validations',
        tags: inlineTags,
        validations,
      })
    }
    const tsSyntaxKind = getTsSyntaxKind({ contentField })
    fields[contentField.id] = {
      blockTag: '@modelberry',
      inlineTags,
      isRequired: contentField.required,
      tsSyntaxKind,
    }
  }
  return fields
}
