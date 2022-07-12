import { logger } from '@modelberry/mbfactory/plain'
import { ValidationsMap } from './get-modelberry-plugin-data'

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
  const validations = []
  let validationNotFound = false
  if (fieldTags[tag]) {
    const validationsList = fieldTags[tag].split(' ')
    for (const validation of validationsList) {
      if (validation in validationsMap) {
        validations.push(validationsMap[validation])
      } else {
        logger.error(`- validation ${validation} not found`)
        validationNotFound = true
      }
    }
  }
  return { validations, validationNotFound }
}
