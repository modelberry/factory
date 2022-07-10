import { Environment } from 'contentful-management/types'
import { Options } from '@modelberry/mbfactory/plain'
import { writeSourceFiles } from '../lib/write-source-files'
import { fetchLocales } from '../lib/fetch-locales'
import { prepareTsFiles } from './prepare-ts-files'
import { remoteSourceEntryGenerator } from './remote-source-entry-generator'

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
  const { badCliLocale, defaultLocaleCode, cliLocaleCode } = await fetchLocales(
    {
      contentfulEnvironment,
      options,
    }
  )
  if (badCliLocale) return
  const localeCode = cliLocaleCode || defaultLocaleCode

  const remoteSourceEntryIterator = remoteSourceEntryGenerator({
    contentfulEnvironment,
    localeCode,
    options,
  })
  const files = await prepareTsFiles({
    remoteSourceEntryIterator,
    path,
  })
  await writeSourceFiles({ files, options })
}
