import chalk from 'chalk'
import { TypeData, Options } from '@modelberry/mbfactory/plain'
import { ContentType, Environment } from 'contentful-management/types'
import { ValidationsMap } from '../lib/get-modelberry-plugin-data'
import { getModelFieldsAndControls } from './get-model-fields-and-controls'
import { pushFieldsToContentful } from './push-fields-to-contentful'
import { pushControlsToContentful } from './push-controls-to-contentful'

export interface PushModels {
  contentfulEnvironment: Environment
  options: Options
  typeData: TypeData
  validationsMap: ValidationsMap
}

export const pushModels = async ({
  contentfulEnvironment,
  options,
  typeData,
  validationsMap,
}: PushModels) => {
  const log = console.log
  for (const modelberryType of Object.values(typeData)) {
    const modelFields = modelberryType.interface.fields || {}
    const interfaceTags = modelberryType.interface.interfaceTags || {}
    const typescriptInterfaceName = modelberryType.interface.typeName
    const interfaceTypeTag = interfaceTags['@type']

    if (options.type && options.type !== interfaceTypeTag) continue

    log(chalk.bold.underline(`\n${typescriptInterfaceName}`))
    if ('@ignore' in interfaceTags) {
      log(chalk(`- ignoring interface`))
      continue
    }
    if (!interfaceTypeTag) {
      log(chalk.red(`- no @type inline tag`))
      continue
    }

    const { fields, controls } = getModelFieldsAndControls({
      modelFields,
      validationsMap,
    })

    log(chalk.bold(`\nPushing to Contentful`))
    if (fields.length < 1) {
      log(chalk.red(`- no valid fields found, skipping`))
    } else {
      log(chalk(`- pushing content type`))
      let contentType: ContentType | undefined
      let contentTypeData
      if (!options.dryRun) {
        contentTypeData = {
          name: interfaceTags['@name'] || interfaceTypeTag,
          description: interfaceTags['@description'],
          displayField: interfaceTags['@displayField'],
          fields,
        } as ContentType

        contentType = await pushFieldsToContentful({
          contentTypeData,
          contentfulEnvironment,
          forceOption: options.force,
          interfaceTypeTag,
        })
      }
      if (controls.length > 0) {
        console.log(chalk(`- pushing editor interface`))
        if (!options.dryRun) {
          if (!contentType) {
            console.log(chalk.red(`- skipping`))
            continue
          }
          await pushControlsToContentful({
            contentType,
            controls,
          })
        }
      }
    }
  }
}
