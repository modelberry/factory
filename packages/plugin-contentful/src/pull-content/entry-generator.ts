import { firstUpperCase, Options } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
import { Environment } from 'contentful-management/types'
import { entriesToJsVariables } from '../lib/entries-to-js-variables'
import { fetchContentTypes } from '../lib/fetch-content-types'
import { fetchEntries } from '../lib/fetch-entries'
import { fetchLocales } from '../lib/fetch-locales'
import { organizeEntriesByContentType } from '../lib/organize-entries-by-content-type'

export interface EntryGenerator {
  contentfulEnvironment: Environment
  options: Options
}

export type EntryGeneratorInstance = AsyncGenerator<
  {
    contentTypeId: string
    varType: string
    varName: string
    contentArray: any[]
  },
  void,
  unknown
>

// Fetch all required data, then loop and yield an object for each entry
export async function* entryGenerator({
  contentfulEnvironment,
  options,
}: EntryGenerator) {
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

  // Each content type is a file with: export const myType: MyType = [...]
  for (const contentTypeId of Object.keys(entriesByContentTypeId)) {
    const varType = `Contentful${firstUpperCase(contentTypeId)}`
    const varName = contentTypeId
    // Get the content of the js variables from the Contentful entries
    const contentArray: any[] = entriesToJsVariables({
      entryTypeList: entriesByContentTypeId[contentTypeId].entryTypeList,
      localeCode,
    })
    yield { contentTypeId, varType, varName, contentArray }
  }
}
