import {
  tsSyntaxKind,
  PropertryNode,
  PropertyTree,
} from '@modelberry/mbfactory/plain'
import { ContentFields } from 'contentful-management/types'
import { getLinkContentType } from './get-link-content-type'

export interface GetPropertyTreeField {
  comment: string
  contentField: ContentFields
  required: boolean
}

// export type ContentfulAsset = {
//   sys: {
//     id: string
//   }
//   contentType: string
//   description: string
//   fileName: string
//   height: number
//   size: number
//   title: string
//   url: string
//   width: number
// }

export const getPropertyTreeField = ({
  comment,
  contentField,
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
          field.node.createTypeReferenceNode = 'ContentfulAsset'
          return field
        case 'Entry':
          field.node.createTypeReferenceNode = getLinkContentType({
            contentField,
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
              field.node.createTypeReferenceNode = 'ContentfulAsset'
              return field
            case 'Entry':
              field.node.createTypeReferenceNode = getLinkContentType({
                contentField,
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
