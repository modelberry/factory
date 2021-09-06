import { firstUpperCase } from '@modelberry/mbfactory/plain'
import { ContentFields } from 'contentful-management/types'

export interface GetLinkContentTypes {
  contentField: ContentFields
}

export const getLinkContentTypes = ({ contentField }: GetLinkContentTypes) => {
  let contentTypes = []
  const isArray = contentField.type === 'Array'
  const field: any = isArray ? contentField.items : contentField
  if (!field.validations) return []
  for (const validation of field.validations) {
    if (validation.linkContentType) {
      contentTypes = validation.linkContentType.map((type: string) =>
        firstUpperCase(type)
      )
    }
  }
  return contentTypes
}

export interface ContentTypesToString {
  contentTypes: string[]
  isArray?: boolean
}

export const contentTypesToString = ({
  contentTypes,
  isArray,
}: ContentTypesToString) => {
  if (contentTypes.length === 0) return 'ValidationNotFound'
  if (contentTypes.length === 1) return contentTypes[0]
  const joined = contentTypes.join(' | ')
  return isArray ? `(${joined})` : joined
}
