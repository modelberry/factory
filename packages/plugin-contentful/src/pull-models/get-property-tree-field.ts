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
  let contentTypes = []

  switch (contentField.type) {
    case 'Symbol':
      node.createKeywordTypeNode = tsSyntaxKind.StringKeyword
      return { node }

    case 'Text':
      node.createKeywordTypeNode = tsSyntaxKind.StringKeyword
      return { node }

    case 'RichText':
      edges.json = {
        node: {
          createTypeReferenceNode: 'Document',
        },
      }
      return { node, edges }

    case 'Integer':
      node.createKeywordTypeNode = tsSyntaxKind.NumberKeyword
      return { node }

    case 'Number':
      node.createKeywordTypeNode = tsSyntaxKind.NumberKeyword
      return { node }

    case 'Date':
      node.createKeywordTypeNode = tsSyntaxKind.StringKeyword
      return { node }

    case 'Boolean':
      node.createKeywordTypeNode = tsSyntaxKind.BooleanKeyword
      return { node }

    case 'Location':
      node.createKeywordTypeNode = tsSyntaxKind.StringKeyword
      return { node }

    case 'Object':
      node.createKeywordTypeNode = tsSyntaxKind.StringKeyword
      return { node }

    case 'Link':
      switch (contentField.linkType) {
        case 'Asset':
          namedImports.push('ContentfulAsset')
          node.createTypeReferenceNode = 'ContentfulAsset'
          return { node }
        case 'Entry':
          contentTypes = getLinkContentTypes({ contentField })
          // Track content types for generating import statements later
          namedImports.push(...contentTypes)
          node.createTypeReferenceNode = contentTypesToString({
            contentTypes,
          })
          return { node }
      }
      break
    case 'Array':
      // Add an items property for arrays
      edges.items = {
        node: {
          createTypeReferenceNode: 'items',
          isArrayTypeNode: true,
          isRequired: true,
        },
      }

      switch (contentField.items?.type) {
        case 'Symbol':
          edges.items.node!.createKeywordTypeNode = tsSyntaxKind.StringKeyword
          return { node, edges }
        case 'Link':
          switch (contentField.items?.linkType) {
            case 'Asset':
              namedImports.push('ContentfulAsset')
              edges.items.node!.createTypeReferenceNode = 'ContentfulAsset'
              return { node, edges }
            case 'Entry':
              contentTypes = getLinkContentTypes({ contentField })
              // Track content types for generating import statements later
              namedImports.push(...contentTypes)
              edges.items.node!.createTypeReferenceNode = contentTypesToString({
                contentTypes,
                isArray: true,
              })
              return { node, edges }
          }
          break
      }
      break
  }
  node.createKeywordTypeNode = tsSyntaxKind.StringKeyword
  return { node }
}
