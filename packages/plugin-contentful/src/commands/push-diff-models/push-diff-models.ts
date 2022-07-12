import { Environment } from 'contentful-management/types'
import { logger, Options, TypeData } from '@modelberry/mbfactory/plain'
import { remoteSourceContentTypeGenerator } from '../../generators/remote-source-content-type-generator/remote-source-content-type-generator'
import { asyncIteratorToArray } from '../../lib/async-iterator-to-array'
import { ValidationsMap } from '../../handler/get-modelberry-plugin-data'
import { localSourceContentTypeGenerator } from '../../generators/local-source-content-type-generator/local-source-content-type-generator'

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

  const localIds = localContentTypes.map((i) => i.interfaceTypeTag)
  const remoteIds = remoteSourceContentTypes.map((i) => i.contentTypeId)
  const allIds = Array.from(new Set([...localIds, ...remoteIds]))
  const intersectIds = localIds.filter((id) => remoteIds.includes(id))
  const localOnlyIds = localIds.filter((id) => !intersectIds.includes(id))
  const remoteOnlyIds = remoteIds.filter((id) => !intersectIds.includes(id))
  logger.p(`All: ${allIds.join(', ')}`)
  logger.p(`Intersect: ${intersectIds.join(', ')}`)
  logger.p(`Local only: ${remoteOnlyIds.join(', ')}`)
  logger.p(`Remote only: ${localOnlyIds.join(', ')}`)
  logger.h2(
    '\nNOTE: This feature is experimental and still under development\n'
  )
}
