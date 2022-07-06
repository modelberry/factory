import {
  ContentFields,
  ContentType,
  EntityMetaSysProps,
  SysLink,
} from 'contentful-management/types'

export type EntryTypeField = {
  contentFieldType?: ContentFields
  fieldValue: {
    /** Either syslink, an array of syslinks, a string Symbol value or a record of fieldIds */
    [localeCode: string]: SysLink | SysLink[] | Record<string, any> | string
  }
}

export type EntryTypeFields = {
  [fieldId: string]: EntryTypeField
}

export type EntryType = {
  fields: EntryTypeFields
  sys: EntityMetaSysProps
}

export type EntriesByContentTypeId = {
  [contentTypeId: string]: {
    contentType: ContentType
    entryTypeList: EntryType[]
  }
}
