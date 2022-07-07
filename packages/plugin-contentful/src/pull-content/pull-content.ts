import { Environment } from 'contentful-management/types'
import { Options } from '@modelberry/mbfactory/plain'
import { writeSourceFiles } from '../lib/write-source-files'
import { getSourceFiles } from './get-source-files'
import { entryGenerator } from './entry-generator'

export interface PullContent {
  contentfulEnvironment: Environment
  options: Options
  path: string
}

export const pullContent = async ({
  contentfulEnvironment,
  options,
  path,
}: PullContent) => {
  const entryGenInstance = entryGenerator({
    contentfulEnvironment,
    options,
  })
  const files = await getSourceFiles({
    entryGenInstance,
    path,
  })
  await writeSourceFiles({ files, options })
}
