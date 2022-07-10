import { logger, Options, TypeData } from '@modelberry/mbfactory/plain'
import { Environment } from 'contentful-management/types'
import { fetchLocales } from '../lib/fetch-locales'
import { getEntryFields } from './get-entry-fields'
import { localVariableGenerator } from './local-variable-generator'
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
  const localVariableIterator = localVariableGenerator({ options, typeData })
  for (const localVariable of localVariableIterator) {
    for (const fieldValues of localVariable.fieldValuesArray) {
      const { entryId, entryFields } = getEntryFields({
        localeCodes: {
          default: defaultLocaleCode,
          interface: localVariable.interfaceLocaleTag,
          cliOption: cliLocaleCode,
        },
        fieldValues,
        fields: localVariable.fields,
      })
      logger.p(
        `- pushing entry ${localVariable.interfaceTypeTag} with ${
          Object.keys(entryFields).length
        } fields` + (entryId ? ` (id:${entryId})` : ``)
      )
      if (!options.dryRun) {
        await pushEntryToContentful({
          contentfulEnvironment,
          contentTypeId: localVariable.interfaceTypeTag,
          entryFields,
          entryId,
        })
      }
    }
  }
}
