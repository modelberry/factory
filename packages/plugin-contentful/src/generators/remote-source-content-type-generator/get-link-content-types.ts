import { firstUpperCase } from '@modelberry/mbfactory'
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
      contentTypes = validation.linkContentType.map(
        (type: string) => `Contentful${firstUpperCase(type)}`
      )
    }
  }
  return contentTypes
}
