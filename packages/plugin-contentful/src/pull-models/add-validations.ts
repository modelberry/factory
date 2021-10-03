import deepEqual from 'deep-equal'
import { getValidationName } from './get-validation-name'

export interface GetExistingValidation {
  /** Validation to test */
  test: any
  /** Existing validations */
  validations: Record<string, any>
}

export const getExistingValidation = ({
  test,
  validations,
}: GetExistingValidation) => {
  for (const existingValidationName of Object.keys(validations)) {
    if (deepEqual(test, validations[existingValidationName]))
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
  validations: Record<string, any>
}

export const addValidations = ({
  add,
  tag,
  tags,
  validations,
}: AddValidation) => {
  for (const newValidation of add) {
    const validationNames = tags[tag] ? tags[tag].split(' ') : []
    const existingValidationName = getExistingValidation({
      test: newValidation,
      validations,
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
      vals: validations,
    })
    // Add empty flags. Typescript defs require this but the API does not return
    // this.
    if (newValidation.regexp && !newValidation.regexp.flags)
      newValidation.regexp.flags = ''
    validations[validationName] = newValidation
    validationNames.push(validationName)
    tags[tag] = validationNames.join(' ')
  }
}
