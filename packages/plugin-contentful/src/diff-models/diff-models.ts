import { Environment } from 'contentful-management/types'
import { Options, TypeData } from '@modelberry/mbfactory/plain'
import { ValidationsMap } from '../lib/get-modelberry-plugin-data'
import { remoteContentTypeGenerator } from '../pull-models/remote-content-type-generator'
import { localContentTypeGenerator } from '../push-models/local-content-type-generator'
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
  validationsMap,
}: DiffModels) => {
  // Empty object that gets filled with validations
  const validations: Record<string, any> = {}

  const remoteContentTypeIterator = remoteContentTypeGenerator({
    contentfulEnvironment,
    options,
    validations,
  })
  const remoteContentTypes = await asyncIteratorToArray(
    remoteContentTypeIterator
  )
  const localContentTypeIterator = localContentTypeGenerator({
    options,
    typeData,
    validationsMap,
  })
  const localContentTypes = Array.from(localContentTypeIterator)

  let dum = typeof remoteContentTypes + typeof localContentTypes
  if (dum) dum = dum + dum
}