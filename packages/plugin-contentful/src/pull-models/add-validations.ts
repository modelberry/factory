import deepEqual from 'deep-equal'

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
  /** Object to add validations to */
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
    const codeAChar = 'A'.charCodeAt(0)
    const validationCount = Object.keys(validations).length
    const validationName = `validation${String.fromCharCode(
      codeAChar + validationCount
    )}`
    validations[validationName] = newValidation
    validationNames.push(validationName)
    tags[tag] = validationNames.join(' ')
  }
}
