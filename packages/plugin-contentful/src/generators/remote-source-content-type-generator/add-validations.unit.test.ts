import { ContentTypeFieldValidation } from 'contentful-management/types'
import { addValidations } from './add-validations'

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
  enabledMarks: ['bold', 'italic', 'underline', 'code', 'h1'],
}

describe('addValidations should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('add a validation correctly', async () => {
    const validationsMap = {}
    const tags = { '@validations': 'existingValidation' }
    addValidations({
      add: [validationA, validationB],
      tag: '@validations',
      tags,
      validationsMap,
    })

    expect(validationsMap).toEqual({
      'enabledMarks-bold-italic-underline': validationB,
      'regexp-1': validationA,
    })
    expect(tags).toEqual({
      '@validations':
        'existingValidation regexp-1 enabledMarks-bold-italic-underline',
    })
  })

  test('not add a validation with the same name', async () => {
    const validationsMap = {
      'enabledMarks-bold-italic-underline': validationB,
      'regexp-1': validationA,
    }
    const tags = { '@validations': 'enabledMarks-bold-italic-underline' }
    addValidations({
      add: [validationC],
      tag: '@validations',
      tags,
      validationsMap,
    })

    expect(validationsMap).toEqual({
      'enabledMarks-bold-italic-underline': validationB,
      'enabledMarks-bold-italic-underline-3': validationC,
      'regexp-1': validationA,
    })
    expect(tags).toEqual({
      '@validations':
        'enabledMarks-bold-italic-underline enabledMarks-bold-italic-underline-3',
    })
  })

  test('not add a validation with a name that already exists', async () => {
    const validationsMap = {
      'enabledMarks-bold-italic-underline': validationB,
    }
    const tags = {
      '@validations': 'regexp-1 enabledMarks-bold-italic-underline',
    }
    addValidations({
      add: [validationA],
      tag: '@validations',
      tags,
      validationsMap,
    })

    expect(validationsMap).toEqual({
      'enabledMarks-bold-italic-underline': validationB,
      'regexp-1': validationA,
    })
    expect(tags).toEqual({
      '@validations': 'regexp-1 enabledMarks-bold-italic-underline',
    })
  })

  test('not add a validation twice', async () => {
    const validationsMap = {
      'enabledMarks-bold-italic-underline': validationB,
      'regexp-1': validationA,
    }
    const tags = {
      '@validations': 'regexp-1 enabledMarks-bold-italic-underline',
    }
    addValidations({
      add: [validationB],
      tag: '@validations',
      tags,
      validationsMap,
    })

    expect(validationsMap).toEqual({
      'enabledMarks-bold-italic-underline': validationB,
      'regexp-1': validationA,
    })
    expect(tags).toEqual({
      '@validations': 'regexp-1 enabledMarks-bold-italic-underline',
    })
  })
})
