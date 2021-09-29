import chalk from 'chalk'
import { allTags } from './all-tags'

export interface CheckTags {
  fieldTags?: Record<string, string>
  interfaceTags?: Record<string, string>
}
export const checkTags = ({ fieldTags, interfaceTags }: CheckTags) => {
  const log = console.log

  if (interfaceTags) {
    const validInterfaceTags = Object.keys(allTags)
      .filter((tagName) => allTags[tagName].interface)
      .join(', ')
    for (const interfaceTag of Object.keys(interfaceTags)) {
      if (!(interfaceTag in allTags)) {
        log(
          chalk.red(
            `- Unknown interface tag: ${interfaceTag}. Valid interface tags are: ${validInterfaceTags}`
          )
        )
      }
    }
  }
  if (fieldTags) {
    const validFieldTags = Object.keys(allTags)
      .filter((tagName) => allTags[tagName].field)
      .join(', ')
    for (const fieldTag of Object.keys(fieldTags)) {
      if (!(fieldTag in allTags)) {
        log(
          chalk.red(
            `- Unknown field tag: ${fieldTag}. Valid field tags are: ${validFieldTags}`
          )
        )
      }
    }
  }
}
