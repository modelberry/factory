import { tsSyntaxKind, PropertryNode } from '@modelberry/mbfactory/plain'
import { ContentFields } from 'contentful-management/types'

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
    tsSyntaxKind: tsSyntaxKind.StringKeyword,
  }
  const field = {
    node,
  }

  switch (contentField.type) {
    case 'Symbol':
      return field

    case 'Text':
      return field

    case 'RichText':
      // text?: {
      //   json?: Document
      //   links: {
      //     assets: {
      //       block: ContentfulAsset[]
      //       hyperlink: ContentfulAsset[]
      //     }
      //     entries: {
      //       block: ContentfulTextEntry[]
      //       hyperlink: ContentfulTextEntry[]
      //       inline: ContentfulTextEntry[]
      //     }
      //   }
      // }

      break

    case 'Integer':
      field.node.tsSyntaxKind = tsSyntaxKind.NumberKeyword
      return field

    case 'Number':
      field.node.tsSyntaxKind = tsSyntaxKind.NumberKeyword
      return field

    case 'Date':
      return field

    case 'Boolean':
      field.node.tsSyntaxKind = tsSyntaxKind.BooleanKeyword
      return field

    case 'Location':
      return field

    case 'Object':
      return field

    case 'Link':
      switch (contentField.linkType) {
        case 'Asset':
          // ContentfulAsset
          break
        case 'Entry':
          // Use in validation lookup
          break
      }
      break
    case 'Array':
      switch (contentField.items?.type) {
        case 'Symbol':
          // string[]
          break
        case 'Link':
          switch (contentField.items?.linkType) {
            case 'Asset':
              // ContentfulAsset[]
              break
            case 'Entry':
              // Use in validation lookup - Array
              break
          }
          break
      }
      break
  }
  return field
}
