import { Environment } from 'contentful-management/types'
import { logger, Options, TypeData } from '@modelberry/mbfactory'

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
  logger.h2(
    '\nNOTE: This feature is experimental and still under development\n'
  )
}
