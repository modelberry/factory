import { Environment } from 'contentful-management/types'
import { logger, Options, TypeData } from '@modelberry/mbfactory/plain'

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
  logger.h1('\nSorry, this has not yet been implemented\n')
}
