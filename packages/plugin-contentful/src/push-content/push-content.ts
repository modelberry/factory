import { Options, TypeData } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
import { Environment, KeyValueMap } from 'contentful-management/types'
import { checkTags } from '../check-tags/check-tags'
import { mustIgnoreInterface } from '../check-tags/must-ignore-interface'
import { fetchLocales } from '../lib/fetch-locales'
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
  const log = console.log
  const { defaultLocale } = await fetchLocales({
    contentfulEnvironment,
  })
  for (const modelberryType of Object.values(typeData)) {
    const interfaceTags = modelberryType.interface.interfaceTags || {}
    const typescriptInterfaceName = modelberryType.interface.typeName
    const interfaceTypeTag = interfaceTags['@type']
    const interfaceLocaleTag = interfaceTags['@locale']

    log(chalk.bold.underline(`\n${typescriptInterfaceName}`))
    if (mustIgnoreInterface({ options, interfaceTags })) continue
    checkTags({ interfaceTags })

    for (const mbVariable of modelberryType.variables) {
      console.log(chalk(`- parsing js variable: ${mbVariable.name}`))
      const valueFn = new Function(`return ${mbVariable.value}`)
      const fieldsArray = valueFn() as KeyValueMap[]
      for (const fields of fieldsArray) {
        const { entryId, entryFields } = getEntryFields({
          localeCodes: {
            default: defaultLocale?.code || 'en-US',
            interface: interfaceLocaleTag,
            cliOption: options.locale,
          },
          fieldValues: fields,
          fields: modelberryType.interface.fields,
        })
        console.log(
          chalk(
            `- pushing entry ${interfaceTypeTag} with ${
              Object.keys(entryFields).length
            } fields` + (entryId ? ` (id:${entryId})` : ``)
          )
        )
        if (!options.dryRun) {
          await pushEntryToContentful({
            contentfulEnvironment,
            contentTypeId: interfaceTypeTag,
            entryFields,
            entryId,
          })
        }
      }
    }
  }
}
