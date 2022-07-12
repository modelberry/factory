import { TypeData, Options, logger } from '@modelberry/mbfactory/plain'
import { ContentType, Environment } from 'contentful-management/types'
import { ValidationsMap } from '../../handler/get-modelberry-plugin-data'
import { pushFieldsToContentful } from './push-fields-to-contentful'
import { pushControlsToContentful } from './push-controls-to-contentful'
import { localSourceContentTypeGenerator } from './local-source-content-type-generator'
import { getRemoteTargetContentTypeFields } from './get-remote-target-content-type-fields'
import { getRemoteTargetContentTypeControls } from './get-remote-target-content-type-controls'

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
  const localSourceContentTypeIterator = localSourceContentTypeGenerator({
    options,
    typeData,
  })
  for (const localSourceContentType of localSourceContentTypeIterator) {
    logger.h2(`\nPushing to Contentful`)
    const remoteFields = getRemoteTargetContentTypeFields({
      contentTypeFields: localSourceContentType.fields,
      validationsMap,
    })
    const remoteControls = getRemoteTargetContentTypeControls({
      contentTypeFields: localSourceContentType.fields,
    })
    if (remoteFields.length < 1) {
      logger.error(`- no valid fields found, skipping`)
    } else {
      logger.p(`- pushing content type...`)

      let contentType: ContentType | undefined
      let contentTypeData
      if (!options.dryRun) {
        contentTypeData = {
          name:
            localSourceContentType.interfaceTags['@name'] ||
            localSourceContentType.interfaceTypeTag,
          description: localSourceContentType.interfaceTags['@description'],
          displayField: localSourceContentType.interfaceTags['@displayField'],
          fields: remoteFields,
        } as ContentType

        contentType = await pushFieldsToContentful({
          contentTypeData,
          contentfulEnvironment,
          yesOption: options.yes,
          interfaceTypeTag: localSourceContentType.interfaceTypeTag,
        })
      }
      if (remoteControls.length > 0) {
        logger.p(`- pushing editor interface...`)
        if (!options.dryRun) {
          if (!contentType) {
            logger.error(`- skipping`)
            continue
          }
          await pushControlsToContentful({
            contentType,
            controls: remoteControls,
          })
        }
      }
    }
  }
}
