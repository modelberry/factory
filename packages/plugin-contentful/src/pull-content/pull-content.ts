import { Environment } from 'contentful-management/types'
import { Options } from '@modelberry/mbfactory/plain'

export interface PullContent {
  contentfulEnvironment: Environment
  options: Options
  path: string
}

export const pullContent = async ({
  contentfulEnvironment,
  options,
}: PullContent) => {
  const log = console.log
  log(options)
  const data = await contentfulEnvironment.getEntries({
    content_type: 'testTopic',
  })
  console.log(data)
}
