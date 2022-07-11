import { Environment } from 'contentful-management/types'
import { logger, Options, TypeData } from '@modelberry/mbfactory/plain'

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
  logger.h1('\nSorry, this has not yet been implemented\n')
}
