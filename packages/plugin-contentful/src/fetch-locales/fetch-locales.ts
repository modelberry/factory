import { Options, logger } from '@modelberry/mbfactory'
import { Environment, Locale } from 'contentful-management/types'

export interface FetchLocales {
  contentfulEnvironment: Environment
  options: Options
}

export type FetchLocalesReponse = {
  locales: Locale[]
  defaultLocaleCode: string
  cliLocaleCode?: string
  badCliLocale?: boolean
}

export const fetchLocales = async ({
  contentfulEnvironment,
  options,
}: FetchLocales) => {
  const result = await contentfulEnvironment.getLocales()
  const locales = result.items
  const defaultLocale = locales.find((locale: any) => locale.default)
  logger.p(`- remote default locale: ${defaultLocale?.code}`)

  const response: FetchLocalesReponse = {
    locales,
    defaultLocaleCode: defaultLocale?.code || 'en-US',
  }
  if (options.locale) {
    const cliLocale = locales.find((locale) => locale.code === options.locale)
    if (cliLocale) {
      response.cliLocaleCode = options.locale
    } else {
      logger.error(`- could not find cli locale ${options.locale} at remote`)
      response.badCliLocale = true
    }
  }
  return response
}
