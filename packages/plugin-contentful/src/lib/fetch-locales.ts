import chalk from 'chalk'
import { Environment } from 'contentful-management/types'

export interface FetchLocales {
  contentfulEnvironment: Environment
}

export const fetchLocales = async ({ contentfulEnvironment }: FetchLocales) => {
  const result = await contentfulEnvironment.getLocales()
  const locales = result.items
  const defaultLocale = locales.find((locale: any) => locale.default)
  console.log(chalk(`- remote default locale: ${defaultLocale?.code}`))
  return { locales, defaultLocale }
}
