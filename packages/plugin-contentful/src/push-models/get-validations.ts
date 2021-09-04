import chalk from 'chalk'
import { ValidationsMap } from '../lib/get-modelberry-plugin-data'

export interface GetValidations {
  fieldTags: Record<string, string>
  tag: '@validations' | '@itemsValidations'
  validationsMap: ValidationsMap
}

export const getValidations = ({
  fieldTags,
  tag,
  validationsMap,
}: GetValidations) => {
  const log = console.log
  const validations = []
  let validationNotFound = false
  if (fieldTags[tag]) {
    const validationsList = fieldTags[tag].split(' ')
    for (const validation of validationsList) {
      if (validation in validationsMap) {
        log(chalk(`- validation ${validation}`))
        validations.push(validationsMap[validation])
      } else {
        log(chalk.red(`- validation ${validation} not found`))
        validationNotFound = true
      }
    }
  }
  return { validations, validationNotFound }
}
