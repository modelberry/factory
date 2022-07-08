import { Environment } from 'contentful-management/types'
import { Options } from '@modelberry/mbfactory/plain'
import { writeSourceFiles } from '../lib/write-source-files'
import { getSourceFiles } from './get-source-files'
import { remoteContentTypeGenerator } from './remote-content-type-generator'

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
  const remoteContentTypeIterator = remoteContentTypeGenerator({
    contentfulEnvironment,
    options,
    validations,
  })
  const files = await getSourceFiles({
    remoteContentTypeIterator,
    path,
    validations,
  })
  await writeSourceFiles({ files, options })
}
