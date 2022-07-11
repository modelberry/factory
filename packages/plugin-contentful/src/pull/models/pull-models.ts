import { Environment } from 'contentful-management/types'
import { Options } from '@modelberry/mbfactory/plain'
import { writeSourceFiles } from '../../lib/write-source-files'
import { prepareTsFiles } from './prepare-ts-files'
import { remoteSourceContentTypeGenerator } from './remote-source-content-type-generator'
import { pullModelsDiff } from './pull-models-diff'

export interface PullModels {
  contentfulEnvironment: Environment
  options: Options
  path: string
}

export const pullModels = async ({
  contentfulEnvironment,
  options,
  path,
}: PullModels) => {
  // TODO: Fix required arguments
  if (options.diff) {
    pullModelsDiff({
      contentfulEnvironment,
      options,
      typeData: {},
      validationsMap: {},
    })
  }

  // Empty object that gets filled with validations
  const validations: Record<string, any> = {}
  const remoteSourceContentTypeIterator = remoteSourceContentTypeGenerator({
    contentfulEnvironment,
    options,
    validations,
  })
  const files = await prepareTsFiles({
    remoteSourceContentTypeIterator,
    path,
    validations,
  })
  await writeSourceFiles({ files, options })
}
