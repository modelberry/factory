import { Environment } from 'contentful-management/types'
import { logger, Options, TypeData } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
import { remoteSourceContentTypeGenerator } from '../../generators/remote-source-content-type-generator/remote-source-content-type-generator'
import { asyncIteratorToArray } from '../../lib/async-iterator-to-array'
import { ValidationsMap } from '../../handler/get-modelberry-plugin-data'
import { localSourceContentTypeGenerator } from '../../generators/local-source-content-type-generator/local-source-content-type-generator'
import { compareArrays } from '../../lib/compare-arrays'
import { getAddRemoveColor } from '../../lib/get-add-remove-color'

export interface PushDiffModels {
  contentfulEnvironment: Environment
  options: Options
  typeData: TypeData
  validationsMap: ValidationsMap
}

export const pushDiffModels = async ({
  contentfulEnvironment,
  options,
  typeData,
}: PushDiffModels) => {
  // Empty object that gets filled with validations
  const validations: Record<string, any> = {}

  const remoteSourceContentTypeIterator = remoteSourceContentTypeGenerator({
    contentfulEnvironment,
    options,
    validations,
  })
  // Mute logging when fetching remote and local content types
  logger.mute = true
  const remoteSourceContentTypes = await asyncIteratorToArray(
    remoteSourceContentTypeIterator
  )
  const localContentTypeIterator = localSourceContentTypeGenerator({
    options,
    typeData,
  })
  const localContentTypes = Array.from(localContentTypeIterator)
  logger.mute = false

  const localContentTypeIds = localContentTypes.map((i) => i.interfaceTypeTag)
  const remoteContentTypeIds = remoteSourceContentTypes.map(
    (i) => i.contentTypeId
  )
  const comparedContentTypeIds = compareArrays(
    localContentTypeIds,
    remoteContentTypeIds
  )

  logger.h1(`\nHow models will change at Contentful\n`)
  logger.p(chalk.green('itemAdded') + '/' + chalk.red('itemRemoved') + '\n')

  comparedContentTypeIds.union.forEach((contentTypeId) => {
    /**
     *
     * LOG TYPE LEVEL
     */
    const contentTypeColor = getAddRemoveColor({
      compared: comparedContentTypeIds,
      item: contentTypeId,
    })
    logger.h2(chalk[contentTypeColor](contentTypeId))
    // When the contentTypeColor is black, we compare the fields
    if (contentTypeColor === 'black') {
      // Get local type and fields
      const localContentType = localContentTypes.find(
        (type) => type.interfaceTypeTag === contentTypeId
      )
      const localFieldIds = Object.keys(localContentType?.fields || {})
      // Get remote type and fields
      const remoteContentType = remoteSourceContentTypes.find(
        (type) => type.contentTypeId === contentTypeId
      )
      const remoteFieldIds = Object.keys(remoteContentType?.propertyTree || {})
      const comparedFieldIds = compareArrays(localFieldIds, remoteFieldIds)
      comparedFieldIds.union.forEach((fieldId) => {
        /**
         *
         * LOG FIELD LEVEL
         */
        const fieldColor = getAddRemoveColor({
          compared: comparedFieldIds,
          item: fieldId,
        })
        logger.p('  ' + chalk[fieldColor](fieldId))
        // When the fieldColor is black, we compare the tags
        if (fieldColor === 'black') {
          // Get local field and tags
          const localField = localContentType?.fields[fieldId]
          const localTagIds = Object.keys(localField?.tags || {})
          // Get remote field and tags
          const remoteField = remoteContentType?.propertyTree[fieldId] || {}
          const remoteTagIds = Object.keys(remoteField?.node?.inlineTags || {})
          const comparedTagIds = compareArrays(localTagIds, remoteTagIds)
          comparedTagIds.union.forEach((tagId) => {
            /**
             *
             * LOG TAG LEVEL
             */
            const tagColor = getAddRemoveColor({
              compared: comparedTagIds,
              item: tagId,
            })
            logger.p('    ' + chalk[tagColor](tagId))
            // When the tagColor is black, we compare the tag value
            if (tagColor === 'black') {
              // Get local tag value
              let localTagValue: string | boolean | undefined =
                localField?.tags?.[tagId] || 'none'
              // Get remote tag value
              const remoteTagValue = remoteField?.node?.inlineTags?.[tagId]
              // When a local tag that represents a boolean value is present,
              // the value is always handled as a true value.
              if (typeof remoteTagValue === 'boolean') localTagValue = true
              if (localTagValue !== remoteTagValue) {
                logger.p(
                  '      ' +
                    chalk.red(remoteTagValue) +
                    ' => ' +
                    chalk.green(localTagValue)
                )
              }
            }
          })
        }
      })
    }
  })
  logger.h2(
    '\nNOTE: This feature is experimental and still under development\n'
  )
}
