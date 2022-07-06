import { Environment } from 'contentful-management/types'
import { Options, TypeData } from '@modelberry/mbfactory/plain'
import { fetchContentTypes } from '../lib/fetch-content-types'

export interface DiffContent {
  contentfulEnvironment: Environment
  options: Options
  typeData: TypeData
}

export const diffContent = async ({
  contentfulEnvironment,
  options,
  typeData,
}: DiffContent) => {
  const contentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })
  console.log('contentTypes', contentTypes)
  console.log('typeData', typeData)
}
