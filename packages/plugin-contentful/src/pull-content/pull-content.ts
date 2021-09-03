import { Environment } from 'contentful-management/types'
import { Options } from '@modelberry/mbfactory/plain'
import { getContentfulLocales } from '../lib/get-contentful-locales'

export interface PullContent {
  contentfulEnvironment: Environment
  options: Options
  path: string
}

export const pullContent = async ({
  contentfulEnvironment,
  options,
}: PullContent) => {
  const log = console.log
  const { defaultLocale } = await getContentfulLocales({
    contentfulEnvironment,
  })
  log(options, defaultLocale)
}
