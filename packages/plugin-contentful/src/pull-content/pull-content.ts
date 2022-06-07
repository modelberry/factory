import {
  Collection,
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
  QueryOptions,
} from 'contentful-management/types'
import { Options, Node } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
import { writeSourceFiles } from '../lib/write-source-files'
import { fetchContentTypes } from '../lib/fetch-content-types'
import { getContentfulLocales } from '../lib/get-contentful-locales'
import { getSourceFiles } from './get-source-files'
import { EntriesByContentTypeId, EntryType } from './entries-by-content-type-id'

export interface PullContent {
  contentfulEnvironment: Environment
  options: Options
  path: string
}

export const pullContent = async ({
  contentfulEnvironment,
  options,
  path,
}: PullContent) => {
  const log = console.log
  const { defaultLocale } = await getContentfulLocales({
    contentfulEnvironment,
  })
  // Use locales in this order, cli overrides all others, remote default
  // locale is a last resort
  const localeCode = options.locale || defaultLocale?.code || 'en-US'
  log(chalk(`- remote default locale: ${defaultLocale?.code}`))
  log(chalk(`- pulling locale: ${localeCode}`))
  log(chalk(`- fetching content types`))
  const contentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })
  log(
    chalk(
      `- fetched ${contentTypes.length} content ${
        contentTypes.length > 1 ? 'types' : 'type'
      }`
    )
  )
  // Initialize struture to organize entires per content type
  const entriesByContentTypeId: EntriesByContentTypeId = {}
  contentTypes.forEach((contentType) => {
    entriesByContentTypeId[contentType.sys.id] = {
      contentType,
      entryTypeList: [],
    }
  })
  const query: QueryOptions = { skip: 0 }
  if (options.type) query['content_type'] = options.type
  // Fetch all entries
  log(chalk(`- fetching entries`))
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
  // Generate import statements for each type to be added to the main file
  const allTypesImportStatements: Node[] = []
  const files = getSourceFiles({
    allTypesImportStatements,
    entriesByContentTypeId,
    localeCode,
    path,
  })
  files.push({
    filename: 'main-content.ts',
    nodes: allTypesImportStatements,
    path,
  })
  await writeSourceFiles({ files, options })
}
