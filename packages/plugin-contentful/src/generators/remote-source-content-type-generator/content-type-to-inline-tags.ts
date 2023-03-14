import { ContentType } from 'contentful-management/types'
import { copyKeysIfExists } from './copy-keys-if-exists'

export interface ContentTypeToInlineTags {
  /** Content types to get tags from */
  contentType: ContentType
}

export const contentTypeToInlineTags = ({
  contentType,
}: ContentTypeToInlineTags) => {
  const inlineTags: Record<string, any> = {}
  inlineTags['@plugin'] = '"@modelberry/plugin-contentful"'
  const contentTypeId = contentType.sys.id
  inlineTags['@type'] = contentTypeId
  copyKeysIfExists({
    asTag: true,
    keys: ['displayField', 'description', 'name'],
    source: contentType,
    target: inlineTags,
  })
  // Remove @name when tag value equals value of @type tag
  if (inlineTags['@name'] && inlineTags['@name'] === inlineTags['@type'])
    delete inlineTags['@name']
  return inlineTags
}
