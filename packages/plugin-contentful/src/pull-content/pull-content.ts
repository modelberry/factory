import { Environment } from 'contentful-management/types'
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

  const contentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })
  // Initialize struture to organize entires per content type
  const entriesByContentTypeId: EntriesByContentTypeId = {}
  contentTypes.forEach((contentType) => {
    entriesByContentTypeId[contentType.sys.id] = {
      contentType,
      entryTypeList: [],
    }
  })
  const query = options.type
    ? {
        content_type: 'testTopic',
      }
    : undefined
  // Fetch all entries
  const remoteEntries = await contentfulEnvironment.getEntries(query)
  // Find entries and organize them with the content type
  for (const remoteEntry of remoteEntries.items) {
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
