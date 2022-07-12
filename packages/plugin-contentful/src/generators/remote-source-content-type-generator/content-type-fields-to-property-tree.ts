import { ContentFields } from 'contentful-management/types'
import { PropertyTree, tsSyntaxKind } from '@modelberry/mbfactory/plain'
import { getPropertyTreeField } from './get-property-tree-field'
import { copyKeysIfExists } from './copy-keys-if-exists'
import { addValidations } from './add-validations'

export interface ContentTypeFieldsToPropertyTree {
  /** Fields used to build property tree from */
  contentTypeFields: ContentFields[]
  /** Editor settings to get 'widgetId', 'widgetNamespace' and 'helpText' tags from */
  editorInterfaces: Record<string, any>
  /** Empty array that gets filled with named imports */
  namedImports: string[]
  /** Empty object that gets filled with validations */
  validations: Record<string, any>
}

/**
 * The sys and __typename fields are added to models with the 'ignore' field tag
 * when generating Typescript source files
 */
export const systemFieldspropertyTree: PropertyTree = {
  __typename: {
    node: {
      isRequired: false,
      blockTag: '@modelberry',
      inlineTags: {
        '@ignore': '',
      },
      createKeywordTypeNode: tsSyntaxKind.StringKeyword,
    },
  },
  sys: {
    node: {
      isRequired: false,
      blockTag: '@modelberry',
      inlineTags: {
        '@ignore': '',
      },
    },
    edges: {
      id: {
        node: {
          isRequired: false,
          createKeywordTypeNode: tsSyntaxKind.StringKeyword,
        },
      },
    },
  },
}

/**
 * Build property tree with all interface fields, this tree can be passed to
 * createTsInterface to create the typescript interface definition
 */
export const contentTypeFieldsToPropertyTree = ({
  contentTypeFields,
  editorInterfaces,
  namedImports,
  validations,
}: ContentTypeFieldsToPropertyTree) => {
  const propertyTree: PropertyTree = {}
  for (const contentTypeField of contentTypeFields) {
    const inlineTags: Record<string, any> = {}
    copyKeysIfExists({
      asTag: true,
      source: contentTypeField,
      target: inlineTags,
      keys: ['disabled', 'localized', 'name', 'omited', 'required', 'type'],
    })
    if (contentTypeField.type === 'Array' && contentTypeField.items) {
      copyKeysIfExists({
        asItems: true,
        asTag: true,
        source: contentTypeField.items,
        target: inlineTags,
        keys: ['type', 'linkType'],
      })
      if (contentTypeField.items.validations) {
        addValidations({
          add: contentTypeField.items.validations,
          tag: '@itemsValidations',
          tags: inlineTags,
          validations,
        })
      }
    }
    if (contentTypeField.type === 'Link') {
      copyKeysIfExists({
        asTag: true,
        source: contentTypeField,
        target: inlineTags,
        keys: ['linkType'],
      })
    }
    copyKeysIfExists({
      asTag: true,
      keys: ['widgetId', 'widgetNamespace', 'helpText'],
      source: editorInterfaces[contentTypeField.id],
      target: inlineTags,
    })
    if (contentTypeField.validations) {
      addValidations({
        add: contentTypeField.validations,
        tag: '@validations',
        tags: inlineTags,
        validations,
      })
    }
    const isArray = contentTypeField.type === 'Array'
    // Do not add Collection postfix to arrays of symbols
    const isItemsTypeSymbol = contentTypeField.items?.type === 'Symbol'

    const fieldName = `${contentTypeField.id}${
      isArray && !isItemsTypeSymbol ? 'Collection' : ''
    }`
    propertyTree[fieldName] = getPropertyTreeField({
      blockTag: '@modelberry',
      inlineTags,
      contentField: contentTypeField,
      namedImports,
      required: contentTypeField.required,
    })
  }
  return propertyTree
}
