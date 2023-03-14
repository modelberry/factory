import { Options, logger } from '@modelberry/mbfactory'
import { ContentType, Environment } from 'contentful-management/types'

export interface FetchContentTypes {
  options: Options
  contentfulEnvironment: Environment
}

export const fetchContentTypes = async ({
  contentfulEnvironment,
  options,
}: FetchContentTypes) => {
  logger.p(`- fetching content types`)

  let contentTypes: ContentType[] = []
  if (options.filter) {
    const ctResponse = await contentfulEnvironment.getContentType(
      options.filter
    )
    contentTypes.push(ctResponse)
  } else {
    const ctResponse = await contentfulEnvironment.getContentTypes()
    contentTypes = ctResponse.items
  }
  logger.p(
    `- fetched ${contentTypes.length} content ${
      contentTypes.length > 1 ? 'types' : 'type'
    }`
  )
  return contentTypes
}
