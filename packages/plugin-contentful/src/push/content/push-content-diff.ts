import { Environment } from 'contentful-management/types'
import { Options, TypeData } from '@modelberry/mbfactory/plain'
import { fetchContentTypes } from '../../pull/models/fetch-content-types'

export interface PushContentDiff {
  contentfulEnvironment: Environment
  options: Options
  typeData: TypeData
}

export const pushContentDiff = async ({
  contentfulEnvironment,
  options,
  typeData,
}: PushContentDiff) => {
  const contentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })
  let dum = typeof typeData + typeof contentTypes
  if (dum) dum = dum + dum
}
