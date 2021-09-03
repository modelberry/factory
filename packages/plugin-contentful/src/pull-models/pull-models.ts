import { Environment } from 'contentful-management/types'
import { Options } from '@modelberry/mbfactory/plain'

export interface PullModels {
  contentfulEnvironment: Environment
  options: Options
  path: string
}

export const pullModels = async ({
  contentfulEnvironment,
  options,
}: PullModels) => {
  const log = console.log
  log(contentfulEnvironment, options)
}
