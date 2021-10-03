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
          // import { Document } from '@contentful/rich-text-types'
          //
          // Document needs BLOCKS, INLINE enums. Use any type here instead of
          // Document. This is because nodeType expects ENUM numbers (BLOCKS,
          // INLINE, etc.), while the API returns strings like 'heading-1' and
          // 'text'.
          createTypeReferenceNode: 'any',
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
          namedImports.push('ContentfulAsset', 'ContentfulReference')
          node.createTypeReferenceNode = 'ContentfulAsset | ContentfulReference'
          return { node }
        case 'Entry':
          contentTypes = getLinkContentTypes({ contentField })
          contentTypes.push('ContentfulReference')
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
              namedImports.push('ContentfulAsset', 'ContentfulReference')
              edges.items.node!.createTypeReferenceNode =
                'ContentfulAsset | ContentfulReference'
              return { node, edges }
            case 'Entry':
              contentTypes = getLinkContentTypes({ contentField })
              contentTypes.push('ContentfulReference')
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
