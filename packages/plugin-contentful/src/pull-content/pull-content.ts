import { Environment } from 'contentful-management/types'
import { Options, Node } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
import { writeSourceFiles } from '../lib/write-source-files'
import { fetchContentTypes } from '../lib/fetch-content-types'
import { fetchLocales } from '../lib/fetch-locales'
import { fetchEntries } from '../lib/fetch-entries'
import { organizeEntriesByContentType } from '../lib/organize-entries-by-content-type'
import { getSourceFiles } from './get-source-files'

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
  const { defaultLocale } = await fetchLocales({
    contentfulEnvironment,
  })
  // Use locales in this order, cli overrides all others, remote default
  // locale is a last resort
  const localeCode = options.locale || defaultLocale?.code || 'en-US'
  log(chalk(`- pulling locale: ${localeCode}`))
  const contentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })
  // Fetch all entries
  const remoteEntries = await fetchEntries({
    contentfulEnvironment,
    options,
    localeCode,
  })

  const entriesByContentTypeId = organizeEntriesByContentType({
    contentTypes,
    remoteEntries,
  })

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
