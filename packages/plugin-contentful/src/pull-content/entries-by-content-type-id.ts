import {
  ContentFields,
  ContentType,
  SysLink,
} from 'contentful-management/types'

export type EntryTypeField = {
  contentFieldType?: ContentFields
  fieldValue: {
    /** Either syslink, an array of syslinks or a record of fieldIds */
    [localeCode: string]: SysLink | SysLink[] | Record<string, any>
  }
}

export type EntryTypeFields = {
  [fieldId: string]: EntryTypeField
}

export type Sys = {
  id: string
}

export type EntryType = {
  sys: Sys
  fields: EntryTypeFields
}

export type EntriesByContentTypeId = {
  [contentTypeId: string]: {
    contentType: ContentType
    entryTypeList: EntryType[]
  }
}
