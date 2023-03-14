import { Environment } from 'contentful-management/types'
import { logger, Options, TypeData } from '@modelberry/mbfactory'

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
  logger.h2(
    '\nNOTE: This feature is experimental and still under development\n'
  )
}
