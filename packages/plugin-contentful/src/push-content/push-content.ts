import { TypeData } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
import { Environment, KeyValueMap } from 'contentful-management/types'
import { getContentfulLocales } from '../lib/get-contentful-locales'
import { getEntryFields } from './get-entry-fields'
import { pushEntryToContentful } from './push-entry-to-contentful'

export interface PushTypes {
  contentfulEnvironment: Environment
  typeData: TypeData
}

export const pushContent = async ({
  contentfulEnvironment,
  typeData,
}: PushTypes) => {
  const log = console.log
  const { defaultLocale } = await getContentfulLocales({
    contentfulEnvironment,
  })
  log(chalk(`- default locale: ${defaultLocale?.code}`))
  for (const modelberryType of Object.values(typeData)) {
    const interfaceTags = modelberryType.interface.interfaceTags || {}
    const typescriptInterfaceName = modelberryType.interface.typeName
    const interfaceTypeTag = interfaceTags['@type']

    log(chalk.bold.underline(`\n${typescriptInterfaceName}`))
    if ('@ignore' in interfaceTags) {
      log(chalk(`- ignoring interface`))
      continue
    }
    if (!interfaceTypeTag) {
      log(chalk.red(`- no @type inline tag`))
      continue
    }

    for (const wrVar of modelberryType.variables) {
      console.log(chalk.underline(`${wrVar.name}`))
      const valueFn = new Function(`return ${wrVar.value}`)
      const fieldsArray = valueFn() as KeyValueMap[]
      for (const fields of fieldsArray) {
        const { entryId, entryFields } = getEntryFields({
          localeCode: defaultLocale?.code || 'en-US',
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
