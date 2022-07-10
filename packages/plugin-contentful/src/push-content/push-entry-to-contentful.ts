import { logger } from '@modelberry/mbfactory/plain'
import {
  CreateEntryProps,
  Entry,
  Environment,
} from 'contentful-management/types'
import { EntryFields } from './get-entry-fields'

export interface PushEntryToContentful {
  contentfulEnvironment: Environment
  contentTypeId: string
  entryFields: EntryFields
  entryId?: string
}

const publishEntry = async (entry: Entry) => {
  let newEntry = entry
  try {
    newEntry = await entry.publish()
  } catch {
    logger.p(`- could not publish entry, pushed as draft`)
  }
  return newEntry
}

export const pushEntryToContentful = async ({
  contentfulEnvironment,
  contentTypeId,
  entryFields,
  entryId,
}: PushEntryToContentful) => {
  let entry: Entry
  if (entryId) {
    try {
      // Get existing entry
      entry = await contentfulEnvironment.getEntry(entryId)
      Object.assign(entry.fields, entryFields)
      entry = await entry.update()
      entry = await publishEntry(entry)
    } catch (contentfulError: any) {
      let errorData
      // We expect a 404, throw other errors if they occur
      try {
        errorData = JSON.parse(contentfulError.message)
        if (errorData.status !== 404) throw contentfulError
      } catch (jsonError: any) {
        throw contentfulError
      }
      // Create a new entry with the entry id
      entry = await contentfulEnvironment.createEntryWithId(
        contentTypeId,
        entryId,
        {
          fields: entryFields,
        } as CreateEntryProps
      )
      entry = await publishEntry(entry)
    }
  } else {
    // We don't have a specific id, the remote will assign a random one
    entry = await contentfulEnvironment.createEntry(contentTypeId, {
      fields: entryFields,
    } as CreateEntryProps)
    entry = await entry.publish()
  }
  return entry
}
