import { Environment } from 'contentful-management/types'
import { Options } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
import { writeSourceFiles } from '../lib/write-source-files'
import { fetchContentTypes } from '../lib/fetch-content-types'
import { getContentfulLocales } from '../lib/get-contentful-locales'
import { ContentTypesById, getSourceFiles, NewEntry } from './get-source-files'

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
  // Organize content types by name
  const contentTypesById: ContentTypesById = {}
  contentTypes.forEach((contentType) => {
    contentTypesById[contentType.name] = {
      contentType: contentType,
      entries: [],
    }
  })
  const query = options.type
    ? {
        content_type: 'testTopic',
      }
    : undefined
  // Fetch all entries
  const entries = await contentfulEnvironment.getEntries(query)
  // Find entries and organize them with the content type
  for (const entry of entries.items) {
    const contentTypeId = entry.sys.contentType.sys.id
    const newEntry: NewEntry = {}
    // Find fields for content type and entry and organize them together
    for (const fieldId of Object.keys(entry.fields)) {
      newEntry[fieldId] = {
        contentType: contentTypesById[contentTypeId].contentType.fields.find(
          (field: any) => field.id === fieldId
        ),
        entry: entry.fields[fieldId],
      }
    }
    contentTypesById[contentTypeId].entries.push(newEntry)
  }
  const files = getSourceFiles({
    contentTypesById,
    localeCode,
    path,
  })
  await writeSourceFiles({ files, options })
}
