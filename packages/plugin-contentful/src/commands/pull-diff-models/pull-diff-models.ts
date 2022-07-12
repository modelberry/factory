import { Environment } from 'contentful-management/types'
import { logger, Options, TypeData } from '@modelberry/mbfactory/plain'
import { ValidationsMap } from '../../handler/get-modelberry-plugin-data'

export interface PullDiffModels {
  contentfulEnvironment: Environment
  options: Options
  typeData: TypeData
  validationsMap: ValidationsMap
}

export const pullDiffModels = async ({
  contentfulEnvironment,
  options,
  typeData,
}: PullDiffModels) => {
  logger.h2(
    '\nNOTE: This feature is experimental and still under development\n'
  )
}
