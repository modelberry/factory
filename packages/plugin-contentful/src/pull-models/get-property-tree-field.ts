import {
  tsSyntaxKind,
  PropertryNode,
  PropertyTree,
} from '@modelberry/mbfactory/plain'
import { ContentFields } from 'contentful-management/types'
import {
  contentTypesToString,
  getLinkContentTypes,
} from './get-link-content-types'

export interface GetPropertyTreeField {
  comment: string
  contentField: ContentFields
  /** Empty array that gets filled with named imports */
  namedImports: string[]
  required: boolean
}

export const getPropertyTreeField = ({
  comment,
  contentField,
  namedImports,
  required,
}: GetPropertyTreeField) => {
  const node: PropertryNode = {
    comment,
    isRequired: required,
  }
  const edges: PropertyTree = {}
  const field = {
    node,
  }
  let contentTypes = []

  switch (contentField.type) {
    case 'Symbol':
      field.node.createKeywordTypeNode = tsSyntaxKind.StringKeyword
      return field

    case 'Text':
      field.node.createKeywordTypeNode = tsSyntaxKind.StringKeyword
      return field

    case 'RichText':
      edges.json = {
        node: {
          createTypeReferenceNode: 'Document',
        },
      }

      break

    case 'Integer':
      field.node.createKeywordTypeNode = tsSyntaxKind.NumberKeyword
      return field

    case 'Number':
      field.node.createKeywordTypeNode = tsSyntaxKind.NumberKeyword
      return field

    case 'Date':
      field.node.createKeywordTypeNode = tsSyntaxKind.StringKeyword
      return field

    case 'Boolean':
      field.node.createKeywordTypeNode = tsSyntaxKind.BooleanKeyword
      return field

    case 'Location':
      field.node.createKeywordTypeNode = tsSyntaxKind.StringKeyword
      return field

    case 'Object':
      field.node.createKeywordTypeNode = tsSyntaxKind.StringKeyword
      return field

    case 'Link':
      switch (contentField.linkType) {
        case 'Asset':
          namedImports.push('ContentfulAsset')
          field.node.createTypeReferenceNode = 'ContentfulAsset'
          return field
        case 'Entry':
          contentTypes = getLinkContentTypes({ contentField })
          // Track content types for generating import statements later
          namedImports.push(...contentTypes)
          field.node.createTypeReferenceNode = contentTypesToString({
            contentTypes,
          })
          return field
      }
      break
    case 'Array':
      field.node.isArrayTypeNode = true
      switch (contentField.items?.type) {
        case 'Symbol':
          field.node.createKeywordTypeNode = tsSyntaxKind.StringKeyword
          return field
        case 'Link':
          switch (contentField.items?.linkType) {
            case 'Asset':
              namedImports.push('ContentfulAsset')
              field.node.createTypeReferenceNode = 'ContentfulAsset'
              return field
            case 'Entry':
              contentTypes = getLinkContentTypes({ contentField })
              // Track content types for generating import statements later
              namedImports.push(...contentTypes)
              field.node.createTypeReferenceNode = contentTypesToString({
                contentTypes,
                isArray: true,
              })
              return field
          }
          break
      }
      break
  }
  field.node.createKeywordTypeNode = tsSyntaxKind.StringKeyword
  return field
}
