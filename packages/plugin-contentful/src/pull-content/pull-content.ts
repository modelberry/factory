import { Environment } from 'contentful-management/types'
import { Options } from '@modelberry/mbfactory/plain'
import { writeSourceFiles } from '../lib/write-source-files'
import { getSourceFiles } from './get-source-files'
import { remoteEntryGenerator } from './remote-entry-generator'

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
  const remoteEntryIterator = remoteEntryGenerator({
    contentfulEnvironment,
    options,
  })
  const files = await getSourceFiles({
    remoteEntryIterator,
    path,
  })
  await writeSourceFiles({ files, options })
}
