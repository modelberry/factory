import { EntryType } from '../pull-content/entries-by-content-type-id'
import { removeLinkAndLinkType } from '../pull-content/remove-link-and-link-type'

export interface EntriesToJsVariables {
  localeCode: string
  entryTypeList: EntryType[]
}

// Convert the Contentful entries into the a js content array
export const entriesToJsVariables = ({
  localeCode,
  entryTypeList,
}: EntriesToJsVariables) => {
  const contentArray: any[] = []
  // Add entries, convert arrays into Collections, etc.
  entryTypeList.forEach((entryType: EntryType) => {
    // Create a new entry with sys.id
    const addEntry: Record<string, any> = {
      sys: { id: entryType.sys.id },
    }
    // Add fields to entry
    Object.keys(entryType.fields).forEach((fieldId: string) => {
      // Remove type and linkType attributes because they can be resolved
      // by lookup up the content type
      const remoteEntryFieldValue = removeLinkAndLinkType({
        fieldValue: entryType.fields[fieldId].fieldValue[localeCode],
      })
      const remoteFieldType = entryType.fields[fieldId].contentFieldType
      if (remoteFieldType?.type === 'Array') {
        const itemsType =
          entryType.fields[fieldId].contentFieldType?.items?.type
        if (itemsType === 'Symbol') {
          // Same as the default below, but more explicit to code it this way
          addEntry[fieldId] = remoteEntryFieldValue
        } else {
          addEntry[`${fieldId}Collection`] = {
            items: remoteEntryFieldValue,
          }
        }
      } else if (remoteFieldType?.type === 'RichText') {
        // TODO: (maybe?) Convert all nodeTypes from string into numbers
        addEntry[fieldId] = {
          json: remoteEntryFieldValue,
        }
      } else {
        addEntry[fieldId] = remoteEntryFieldValue
      }
    })
    contentArray.push(addEntry)
  })
  return contentArray
}
