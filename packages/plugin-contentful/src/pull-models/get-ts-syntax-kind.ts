import { tsSyntaxKind } from '@modelberry/mbfactory/plain'
import { ContentFields } from 'contentful-management/types'

export interface GetTsSyntaxKind {
  contentField: ContentFields
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

export const getTsSyntaxKind = ({ contentField }: GetTsSyntaxKind) => {
  // __typename?: string
  // sys?: {
  //   id: string
  // }

  switch (contentField.type) {
    case 'Symbol':
      return tsSyntaxKind.StringKeyword

    case 'Text':
      return tsSyntaxKind.StringKeyword

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
      return tsSyntaxKind.NumberKeyword

    case 'Number':
      return tsSyntaxKind.NumberKeyword

    case 'Date':
      return tsSyntaxKind.StringKeyword

    case 'Boolean':
      return tsSyntaxKind.BooleanKeyword

    case 'Location':
      return tsSyntaxKind.StringKeyword

    case 'Object':
      return tsSyntaxKind.StringKeyword

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
  return tsSyntaxKind.StringKeyword
}
