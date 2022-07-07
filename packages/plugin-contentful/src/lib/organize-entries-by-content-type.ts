import { ContentType, Entry } from 'contentful-management/types'
import { EntriesByContentTypeId, EntryType } from './entries-by-content-type-id'

export interface OrganizeEntriesByContentType {
  contentTypes: ContentType[]
  remoteEntries: Entry[]
}

export const organizeEntriesByContentType = ({
  contentTypes,
  remoteEntries,
}: OrganizeEntriesByContentType) => {
  // Initialize struture to organize entires per content type
  const entriesByContentTypeId: EntriesByContentTypeId = {}
  contentTypes.forEach((contentType) => {
    entriesByContentTypeId[contentType.sys.id] = {
      contentType,
      entryTypeList: [],
    }
  })
  // Find entries and organize them with the content type
  for (const remoteEntry of remoteEntries) {
    const contentTypeId = remoteEntry.sys.contentType.sys.id
    const entryType: EntryType = { sys: remoteEntry.sys, fields: {} }
    // Find fields for content type and entry and organize them together
    for (const fieldId of Object.keys(remoteEntry.fields)) {
      entryType.fields[fieldId] = {
        contentFieldType: entriesByContentTypeId[
          contentTypeId
        ].contentType.fields.find((field: any) => field.id === fieldId),
        fieldValue: remoteEntry.fields[fieldId],
      }
    }
    entriesByContentTypeId[contentTypeId].entryTypeList.push(entryType)
  }
  return entriesByContentTypeId
}
