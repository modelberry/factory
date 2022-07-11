import { Environment } from 'contentful-management/types'
import { logger, Options, TypeData } from '@modelberry/mbfactory/plain'
import { remoteSourceContentTypeGenerator } from '../pull-models/remote-source-content-type-generator'
import { asyncIteratorToArray } from '../lib/async-iterator-to-array'
import { ValidationsMap } from './get-modelberry-plugin-data'
import { localSourceContentTypeGenerator } from './local-source-content-type-generator'

export interface DiffModels {
  contentfulEnvironment: Environment
  options: Options
  typeData: TypeData
  validationsMap: ValidationsMap
}

export const diffModels = async ({
  contentfulEnvironment,
  options,
  typeData,
}: DiffModels) => {
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
}
