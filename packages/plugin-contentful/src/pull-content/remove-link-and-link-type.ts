import { SysLink } from 'contentful-management/types'

export interface RemoveLinkAndLinkType {
  fieldValue: SysLink | SysLink[] | Record<string, any>
}

export const removeLinkAndLinkType = ({
  fieldValue,
}: RemoveLinkAndLinkType) => {
  if (!fieldValue) return fieldValue
  if (Array.isArray(fieldValue)) {
    fieldValue.forEach((field) => {
      if (field.sys) {
        delete (field.sys as any).type
        delete (field.sys as any).linkType
      }
    })
  } else {
    if (fieldValue.sys) {
      delete (fieldValue.sys as any).type
      delete (fieldValue.sys as any).linkType
    }
  }
  return fieldValue
}
