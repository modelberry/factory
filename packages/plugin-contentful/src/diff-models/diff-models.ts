import { Environment } from 'contentful-management/types'
import { Options, TypeData } from '@modelberry/mbfactory/plain'
import { fetchContentTypes } from '../lib/fetch-content-types'
import { ValidationsMap } from '../lib/get-modelberry-plugin-data'

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
  const contentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })
  console.log('contentTypes', contentTypes)
  console.log('typeData', typeData)
  console.log('validationsMap', validationsMap)
}
