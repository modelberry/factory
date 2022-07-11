import { Environment } from 'contentful-management/types'
import { Options, TypeData } from '@modelberry/mbfactory/plain'
import { fetchContentTypes } from '../models/fetch-content-types'

export interface PullDiffContent {
  contentfulEnvironment: Environment
  options: Options
  typeData: TypeData
}

export const pullDiffContent = async ({
  contentfulEnvironment,
  options,
  typeData,
}: PullDiffContent) => {
  const contentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })
  let dum = typeof typeData + typeof contentTypes
  if (dum) dum = dum + dum
}
