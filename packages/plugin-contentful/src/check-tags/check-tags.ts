import { logger } from '@modelberry/mbfactory'
import { allTags } from './all-tags'

export interface CheckTags {
  fieldTags?: Record<string, string>
  interfaceTags?: Record<string, string>
}
export const checkTags = ({ fieldTags, interfaceTags }: CheckTags) => {
  if (interfaceTags) {
    const validInterfaceTags = Object.keys(allTags).filter(
      (tagName) => allTags[tagName].interface
    )
    for (const interfaceTag of Object.keys(interfaceTags)) {
      if (!validInterfaceTags.includes(interfaceTag)) {
        logger.error(
          `- Unknown interface tag: ${interfaceTag}. Valid interface tags are: ${validInterfaceTags.join(
            ', '
          )}`
        )
      }
    }
  }
  if (fieldTags) {
    const validFieldTags = Object.keys(allTags).filter(
      (tagName) => allTags[tagName].field
    )
    for (const fieldTag of Object.keys(fieldTags)) {
      if (!validFieldTags.includes(fieldTag)) {
        logger.error(
          `- Unknown field tag: ${fieldTag}. Valid field tags are: ${validFieldTags.join(
            ', '
          )}`
        )
      }
    }
  }
}
