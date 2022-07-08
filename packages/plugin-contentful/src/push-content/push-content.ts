import { Options, TypeData } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
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
  const { defaultLocale } = await fetchLocales({
    contentfulEnvironment,
  })
  const localVariableIterator = localVariableGenerator({ options, typeData })
  for (const mbVariable of localVariableIterator) {
    for (const fieldValues of mbVariable.fieldValuesArray) {
      const { entryId, entryFields } = getEntryFields({
        localeCodes: {
          default: defaultLocale?.code || 'en-US',
          interface: mbVariable.interfaceLocaleTag,
          cliOption: options.locale,
        },
        fieldValues,
        fields: mbVariable.fields,
      })
      console.log(
        chalk(
          `- pushing entry ${mbVariable.interfaceTypeTag} with ${
            Object.keys(entryFields).length
          } fields` + (entryId ? ` (id:${entryId})` : ``)
        )
      )
      if (!options.dryRun) {
        await pushEntryToContentful({
          contentfulEnvironment,
          contentTypeId: mbVariable.interfaceTypeTag,
          entryFields,
          entryId,
        })
      }
    }
  }
}
