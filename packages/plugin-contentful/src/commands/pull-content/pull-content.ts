import { Environment } from 'contentful-management/types'
import { Options } from '@modelberry/mbfactory'
import { writeSourceFiles } from '../../write-source-files/write-source-files'
import { fetchLocales } from '../../fetch-locales/fetch-locales'
import { remoteSourceEntryGenerator } from '../../generators/remote-source-entry-generator/remote-source-entry-generator'
import { prepareTsFiles } from './prepare-ts-files'

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
