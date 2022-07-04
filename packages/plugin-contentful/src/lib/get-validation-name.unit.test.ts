import { ContentTypeFieldValidation } from 'contentful-management/types'
import { getValidationName } from './get-validation-name'

const validationA: ContentTypeFieldValidation = {
  regexp: {
    pattern: '^\\/[a-z0-9:\\._/~%\\-\\+&\\#\\?!=\\(\\)@]*$',
    flags: '',
  },
}
const validationB: ContentTypeFieldValidation = {
  enabledMarks: ['bold', 'italic', 'underline', 'code'],
}

const validationC: ContentTypeFieldValidation = {
  enabledMarks: ['italic'],
}

const validations = {
  'regexp-1': validationA,
  'enabledMarks-bold-italic-underline': validationB,
}

describe('getValidationName should', () => {
  test('create a new name', async () => {
    const validationName = getValidationName({
      val: validationC,
      vals: validations,
    })
    expect(validationName).toEqual('enabledMarks-italic')
  })
  test('create a new name with a postfix if the name exists', async () => {
    const validationName = getValidationName({
      val: validationA,
      vals: validations,
    })
    expect(validationName).toEqual('regexp-2')
  })
})
