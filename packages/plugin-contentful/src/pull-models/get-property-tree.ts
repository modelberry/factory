import { ContentFields } from 'contentful-management/types'
import {
  PropertyTree,
  tagsToTsDocComment,
  tsSyntaxKind,
} from '@modelberry/mbfactory/plain'
import { copyKeysIfExists } from './copy-keys-if-exists'
import { addValidations } from './add-validations'
import { getPropertyTreeField } from './get-property-tree-field'

export interface GetPropertyTree {
  /** Fields used to build property tree from */
  contentFields: ContentFields[]
  /** Editor settings to get 'widgetId', 'widgetNamespace' and 'helpText' tags from */
  editorInterfaces: Record<string, any>
  /** Empty array that gets filled with named imports */
  namedImports: string[]
  /** Empty object that gets filled with validations */
  validations: Record<string, any>
}

/**
 * Build property tree with all interface fields, this tree can be passed to
 * createTsInterface to create the typescript interface definition
 */
export const getPropertyTree = ({
  contentFields,
  editorInterfaces,
  namedImports,
  validations,
}: GetPropertyTree) => {
  const propertyTree: PropertyTree = {
    __typename: {
      node: {
        isRequired: false,
        createKeywordTypeNode: tsSyntaxKind.StringKeyword,
      },
    },
    sys: {
      node: { isRequired: true },
      edges: {
        id: { node: { createKeywordTypeNode: tsSyntaxKind.StringKeyword } },
      },
    },
  }
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
    const comment = tagsToTsDocComment({
      blockTag: '@modelberry',
      inlineTags,
    })
    propertyTree[contentField.id] = getPropertyTreeField({
      comment: `* ${comment}`,
      contentField,
      namedImports,
      required: contentField.required,
    })
  }
  return propertyTree
}
