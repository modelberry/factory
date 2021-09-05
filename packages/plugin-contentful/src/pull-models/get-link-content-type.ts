import { firstUpperCase } from '@modelberry/mbfactory/plain'
import { ContentFields } from 'contentful-management/types'

export interface GetLinkContentType {
  contentField: ContentFields
}

const NOT_FOUND = 'ValidationNotFound'

export const getLinkContentType = ({ contentField }: GetLinkContentType) => {
  const isArray = contentField.type === 'Array'
  const field: any = isArray ? contentField.items : contentField
  if (!field.validations) return NOT_FOUND
  for (const validation of field.validations) {
    if (validation.linkContentType) {
      const upperCased = validation.linkContentType.map((type: string) =>
        firstUpperCase(type)
      )
      if (upperCased.length === 0) return NOT_FOUND
      if (upperCased.length === 1) return upperCased[0]
      const joined = upperCased.join(' | ')
      return isArray ? `(${joined})` : joined
    }
  }
  return NOT_FOUND
}
