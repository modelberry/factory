import { Environment } from 'contentful-management/types'
import { logger, Options, TypeData } from '@modelberry/mbfactory/plain'
import { ValidationsMap } from '../lib/get-modelberry-plugin-data'
import { remoteSourceContentTypeGenerator } from '../pull-models/remote-source-content-type-generator'
import { localSourceContentTypeGenerator } from '../push-models/local-source-content-type-generator'
import { asyncIteratorToArray } from '../lib/async-iterator-to-array'

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

  for (const remoteSourceContentType of remoteSourceContentTypes) {
    for (const localContentType of localContentTypes) {
      logger.object('remoteSourceContentType', remoteSourceContentType)
      logger.object('localContentType', localContentType)
    }
  }
}
