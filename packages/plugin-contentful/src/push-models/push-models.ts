import { TypeData, Options, logger } from '@modelberry/mbfactory/plain'
import { ContentType, Environment } from 'contentful-management/types'
import { ValidationsMap } from '../lib/get-modelberry-plugin-data'
import { pushFieldsToContentful } from './push-fields-to-contentful'
import { pushControlsToContentful } from './push-controls-to-contentful'
import { localContentTypeGenerator } from './local-content-type-generator'

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
  const localContentTypeIterator = localContentTypeGenerator({
    options,
    typeData,
    validationsMap,
  })
  for (const localContentType of localContentTypeIterator) {
    logger.h2(`\nPushing to Contentful`)
    if (localContentType.fields.length < 1) {
      logger.error(`- no valid fields found, skipping`)
    } else {
      logger.p(`- pushing content type`)
      let contentType: ContentType | undefined
      let contentTypeData
      if (!options.dryRun) {
        contentTypeData = {
          name:
            localContentType.interfaceTags['@name'] ||
            localContentType.interfaceTypeTag,
          description: localContentType.interfaceTags['@description'],
          displayField: localContentType.interfaceTags['@displayField'],
          fields: localContentType.fields,
        } as ContentType

        contentType = await pushFieldsToContentful({
          contentTypeData,
          contentfulEnvironment,
          yesOption: options.yes,
          interfaceTypeTag: localContentType.interfaceTypeTag,
        })
      }
      if (localContentType.controls.length > 0) {
        logger.p(`- pushing editor interface`)
        if (!options.dryRun) {
          if (!contentType) {
            logger.error(`- skipping`)
            continue
          }
          await pushControlsToContentful({
            contentType,
            controls: localContentType.controls,
          })
        }
      }
    }
  }
}
