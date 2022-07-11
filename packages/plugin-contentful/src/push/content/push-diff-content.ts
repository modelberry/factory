import { Environment } from 'contentful-management/types'
import { Options, TypeData } from '@modelberry/mbfactory/plain'
import { fetchContentTypes } from '../../pull/models/fetch-content-types'

export interface PushDiffContent {
  contentfulEnvironment: Environment
  options: Options
  typeData: TypeData
}

export const pushDiffContent = async ({
  contentfulEnvironment,
  options,
  typeData,
}: PushDiffContent) => {
  const contentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })
  let dum = typeof typeData + typeof contentTypes
  if (dum) dum = dum + dum
}
