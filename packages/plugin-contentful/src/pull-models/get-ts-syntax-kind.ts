import { tsSyntaxKind } from '@modelberry/mbfactory/plain'
import { ContentFields } from 'contentful-management/types'

export interface GetTsSyntaxKind {
  contentField: ContentFields
}

export const getTsSyntaxKind = ({ contentField }: GetTsSyntaxKind) => {
  if (contentField.type === 'Symbol') return tsSyntaxKind.StringKeyword

  return tsSyntaxKind.StringKeyword
}
