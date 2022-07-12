import { Environment } from 'contentful-management/types'
import { Options } from '@modelberry/mbfactory/plain'
import { writeSourceFiles } from '../../write-source-files/write-source-files'
import { remoteSourceContentTypeGenerator } from '../../generators/remote-source-content-type-generator/remote-source-content-type-generator'
import { prepareTsFiles } from './prepare-ts-files'

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
