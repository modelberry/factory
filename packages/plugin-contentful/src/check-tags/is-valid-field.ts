import { logger } from '@modelberry/mbfactory/plain'

export interface IsValidField {
  fieldTags: Record<string, string>
  fieldType?: string
}

export const isValidField = ({ fieldTags, fieldType }: IsValidField) => {
  if ('@ignore' in fieldTags) {
    logger.p(`- skipping because @ignore`)
    return false
  }
  if (!fieldTags['@type']) {
    logger.error(`- no @type inline tag`)
    return false
  }
  if (fieldTags['@type'] === 'Link' && !fieldTags['@linkType']) {
    logger.error(`- @type=Link without @linkType`)
    return false
  }
  if (fieldTags['@type'] === 'Array' && !fieldTags['@itemsType']) {
    logger.error(`- @type=Array without @itemsType`)
    return false
  }
  if (
    fieldTags['@type'] === 'Array' &&
    fieldTags['@itemsType'] === 'Link' &&
    !fieldTags['@itemsLinkType']
  ) {
    logger.error(`- @type=Array, @itemsType=Link without @itemsLinkType`)
    return false
  }
  if (
    fieldTags['@type'] === 'Array' &&
    fieldTags['@itemsType'] === 'Symbol' &&
    fieldType?.trim().startsWith('{')
  ) {
    logger.error(`- @type=Array, @itemsType=Symbol must be of type string`)
    return false
  }
  return true
}
