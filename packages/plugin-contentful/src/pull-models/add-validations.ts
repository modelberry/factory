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
  /** Object to add @validations inline tags to */
  tags: Record<string, any>
  /** Object to add validations to */
  validations: Record<string, any>
}

export const addValidations = ({ add, tags, validations }: AddValidation) => {
  for (const newValidation of add) {
    const tagCount = Object.keys(tags).length
    const existingValidationName = getExistingValidation({
      test: newValidation,
      validations,
    })
    if (existingValidationName) {
      tags[`@validations__${tagCount}`] = existingValidationName
      continue
    }
    const codeAChar = 'A'.charCodeAt(0)
    const validationCount = Object.keys(validations).length
    const validationName = `validation${String.fromCharCode(
      codeAChar + validationCount
    )}`
    validations[validationName] = newValidation
    // The __xx postfix will be ignored when tags are converted intoi ts docs comments
    tags[`@validations__${tagCount}`] = validationName
  }
}
