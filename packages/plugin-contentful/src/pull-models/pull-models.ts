import { Environment } from 'contentful-management/types'
import { Options } from '@modelberry/mbfactory/plain'
import { writeSourceFiles } from '../lib/write-source-files'
import { fetchContentTypes } from '../lib/fetch-content-types'
import { getSourceFiles } from './get-source-files'

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
  const contentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })
  // Empty object that gets filled with validations
  const validations: Record<string, any> = {}

  const files = await getSourceFiles({
    contentTypes,
    path,
    validations,
  })
  await writeSourceFiles({ files, options })
}
