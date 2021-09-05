import { tsSyntaxKind } from '@modelberry/mbfactory/plain'
import { ContentFields } from 'contentful-management/types'

export interface GetTsSyntaxKind {
  contentField: ContentFields
}

export const getTsSyntaxKind = ({ contentField }: GetTsSyntaxKind) => {
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
      // linkType: Asset, Entry
      break
    case 'Array':
      // {type: 'Array', items: {type: 'Symbol'}}
      // {type: 'Array', items: {type: 'Link', linkType: 'Entry'}}
      // {type: 'Array', items: {type: 'Link', linkType: 'Asset'}}

      break

    default:
      return tsSyntaxKind.StringKeyword
  }
  return tsSyntaxKind.StringKeyword
}
