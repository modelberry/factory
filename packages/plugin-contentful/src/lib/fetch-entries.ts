import { Options } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
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
  const log = console.log
  log(chalk(`- fetching entries`))
  const query: QueryOptions = { skip: 0, locale: localeCode }
  if (options.type) query['content_type'] = options.type

  const batchSize = 100
  let remoteEntries: Entry[] = []
  let collection: Collection<Entry, EntryProps<KeyValueMap>>
  do {
    query.limit = batchSize
    collection = await contentfulEnvironment.getEntries(query)
    remoteEntries = remoteEntries.concat(collection.items)
    log(
      chalk(
        `- fetched ${remoteEntries.length} of ${collection.total} entries (in batches of ${collection.limit})`
      )
    )
    query.skip = query.skip! + batchSize
  } while (query.skip <= collection.total)

  return remoteEntries
}
