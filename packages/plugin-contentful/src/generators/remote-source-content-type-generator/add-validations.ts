import deepEqual from 'deep-equal'
import { getValidationName } from './get-validation-name'

export interface GetExistingValidation {
  /** Validation to test */
  test: any
  /** Existing validations */
  validationsMap: Record<string, any>
}

export const getExistingValidation = ({
  test,
  validationsMap,
}: GetExistingValidation) => {
  for (const existingValidationName of Object.keys(validationsMap)) {
    if (deepEqual(test, validationsMap[existingValidationName]))
      return existingValidationName
  }
  return
}

export interface AddValidation {
  /** Array of validations from Contentful API */
  add: any[]
  /** Tag name that contains validation string */
  tag: '@validations' | '@itemsValidations'
  /** Object to add inline tag to */
  tags: Record<string, any>
  /** Empty object that gets filled with validations */
  validationsMap: Record<string, any>
}

export const addValidations = ({
  add,
  tag,
  tags,
  validationsMap,
}: AddValidation) => {
  for (const newValidation of add) {
    const validationNames = tags[tag] ? tags[tag].split(' ') : []
    const existingValidationName = getExistingValidation({
      test: newValidation,
      validationsMap,
    })
    if (existingValidationName) {
      // No need to add if we have this validation already
      if (validationNames.includes(existingValidationName)) continue
      validationNames.push(existingValidationName)
      tags[tag] = validationNames.join(' ')
      continue
    }
    // New validation, add to validations object with a new name
    const validationName = getValidationName({
      val: newValidation,
      vals: validationsMap,
    })
    // Add empty flags. Typescript defs require this but the API does not return
    // this.
    if (newValidation.regexp && !newValidation.regexp.flags)
      newValidation.regexp.flags = ''
    validationsMap[validationName] = newValidation

    // No need to add if we have this validation already
    if (validationNames.includes(validationName)) continue
    validationNames.push(validationName)

    tags[tag] = validationNames.join(' ')
  }
}
