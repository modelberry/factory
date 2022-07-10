import { Options, logger } from '@modelberry/mbfactory/plain'
import {
  Collection,
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
  QueryOptions,
} from 'contentful-management/types'

export interface FetchEntries {
  options: Options
  contentfulEnvironment: Environment
  localeCode: string
}

export const fetchEntries = async ({
  contentfulEnvironment,
  options,
  localeCode,
}: FetchEntries) => {
  logger.p(`- fetching entries`)
  const query: QueryOptions = { skip: 0, locale: localeCode }
  if (options.filter) query['content_type'] = options.filter

  const batchSize = 100
  let remoteEntries: Entry[] = []
  let collection: Collection<Entry, EntryProps<KeyValueMap>>
  do {
    query.limit = batchSize
    collection = await contentfulEnvironment.getEntries(query)
    remoteEntries = remoteEntries.concat(collection.items)
    logger.p(
      `- fetched ${remoteEntries.length} of ${collection.total} entries (in batches of ${collection.limit})`
    )

    query.skip = query.skip! + batchSize
  } while (query.skip <= collection.total)

  return remoteEntries
}
