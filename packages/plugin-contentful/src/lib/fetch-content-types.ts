import { Options } from '@modelberry/mbfactory/plain'
import { ContentType, Environment } from 'contentful-management/types'

export interface FetchContentTypes {
  options: Options
  contentfulEnvironment: Environment
}

export const fetchContentTypes = async ({
  contentfulEnvironment,
  options,
}: FetchContentTypes) => {
  let contentTypes: ContentType[] = []
  if (options.type) {
    const ctResponse = await contentfulEnvironment.getContentType(options.type)
    contentTypes.push(ctResponse)
  } else {
    const ctResponse = await contentfulEnvironment.getContentTypes()
    contentTypes = ctResponse.items
  }
  return contentTypes
}
