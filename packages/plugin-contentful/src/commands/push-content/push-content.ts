import { logger, Options, TypeData } from '@modelberry/mbfactory/plain'
import { Environment } from 'contentful-management/types'
import { fetchLocales } from '../../lib/fetch-locales'
import { localSourceVariableGenerator } from '../../generators/local-source-variable-generator/local-source-variable-generator'
import { getEntryFields } from './get-entry-fields'
import { pushEntryToContentful } from './push-entry-to-contentful'

export interface PushContent {
  contentfulEnvironment: Environment
  options: Options
  typeData: TypeData
}

export const pushContent = async ({
  contentfulEnvironment,
  options,
  typeData,
}: PushContent) => {
  const { badCliLocale, defaultLocaleCode, cliLocaleCode } = await fetchLocales(
    {
      contentfulEnvironment,
      options,
    }
  )
  if (badCliLocale) return
  const localSourceVariableIterator = localSourceVariableGenerator({
    options,
    typeData,
  })
  for (const localSourceVariable of localSourceVariableIterator) {
    for (const fieldValues of localSourceVariable.fieldValuesArray) {
      const { entryId, entryFields } = getEntryFields({
        localeCodes: {
          default: defaultLocaleCode,
          interface: localSourceVariable.interfaceLocaleTag,
          cliOption: cliLocaleCode,
        },
        fieldValues,
        fields: localSourceVariable.fields,
      })
      logger.p(
        `- pushing entry ${localSourceVariable.interfaceTypeTag} with ${
          Object.keys(entryFields).length
        } fields` + (entryId ? ` (id:${entryId})` : ``)
      )
      if (!options.dryRun) {
        await pushEntryToContentful({
          contentfulEnvironment,
          contentTypeId: localSourceVariable.interfaceTypeTag,
          entryFields,
          entryId,
        })
      }
    }
  }
}
