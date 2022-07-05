import { ContentTypeFieldValidation } from 'contentful-management/types'
import { getValidationName } from './get-validation-name'

const validationLinkContentType: ContentTypeFieldValidation = {
  linkContentType: ['action'],
}
const validationIn: ContentTypeFieldValidation = {
  in: ['option1', 'option2'],
}
const validationLinkMimetypeGroup: ContentTypeFieldValidation = {
  in: ['image'],
}
const validationSize: ContentTypeFieldValidation = {
  size: {
    max: 10,
    min: 3,
  },
}
const validationRange: ContentTypeFieldValidation = {
  range: {
    max: 10,
    min: 3,
  },
}
const validationRegexp: ContentTypeFieldValidation = {
  regexp: {
    pattern: '^\\/[a-z0-9:\\._/~%\\-\\+&\\#\\?!=\\(\\)@]*$',
    flags: '',
  },
}
const validationProhibitRegexp: ContentTypeFieldValidation = {
  prohibitRegexp: {
    pattern: '^\\/[a-z0-9:\\._/~%\\-\\+&\\#\\?!=\\(\\)@]*$',
    flags: '',
  },
}
const validationUnique: ContentTypeFieldValidation = {
  unique: true,
}
const validationDateRange: ContentTypeFieldValidation = {
  dateRange: {
    max: '332211',
    min: '112233',
  },
}
const assetImageDimensions: ContentTypeFieldValidation = {
  assetImageDimensions: {
    width: {
      min: 111,
      max: 222,
    },
    height: {
      min: 333,
      max: 444,
    },
  },
}
const validationAssetFileSize: ContentTypeFieldValidation = {
  assetFileSize: {
    min: 333,
    max: 444,
  },
}
const validationEnabledNodeTypes: ContentTypeFieldValidation = {
  enabledNodeTypes: ['typeA', 'typeB'],
}
const validationEnabledMarks: ContentTypeFieldValidation = {
  enabledMarks: ['bold', 'italic', 'underline', 'code'],
}
const validationAssetRichText = {
  nodes: {
    'embedded-entry-block': [{ linkContentType: ['embed', 'topicSection'] }],
    'embedded-entry-inline': [
      { linkContentType: ['embed', 'topicSection'], message: null },
    ],
  },
}
const validationDoesNotExist = {
  badValue: ['None'],
}

const validations: Record<string, ContentTypeFieldValidation> = {}

describe('getValidationName should', () => {
  test('create a new name for validationLinkContentType', async () => {
    const validationName = getValidationName({
      val: validationLinkContentType,
      vals: validations,
    })
    expect(validationName).toEqual('linkContentType-action')
  })
  test('create a new name with a postfix if the name exists', async () => {
    validations['linkContentType-action'] = validationLinkContentType
    const validationName = getValidationName({
      val: validationLinkContentType,
      vals: validations,
    })
    expect(validationName).toEqual('linkContentType-action-2')
  })
  test('create a new name for validationIn', async () => {
    const validationName = getValidationName({
      val: validationIn,
      vals: validations,
    })
    expect(validationName).toEqual('in-option1-option2')
  })
  test('create a new name for validationLinkMimetypeGroup', async () => {
    const validationName = getValidationName({
      val: validationLinkMimetypeGroup,
      vals: validations,
    })
    expect(validationName).toEqual('in-image')
  })
  test('create a new name for validationSize', async () => {
    const validationName = getValidationName({
      val: validationSize,
      vals: validations,
    })
    expect(validationName).toEqual('size-min3-max10')
  })
  test('create a new name for validationRange', async () => {
    const validationName = getValidationName({
      val: validationRange,
      vals: validations,
    })
    expect(validationName).toEqual('range-min3-max10')
  })
  test('create a new name for validationRegexp', async () => {
    const validationName = getValidationName({
      val: validationRegexp,
      vals: validations,
    })
    expect(validationName).toEqual('regexp-1')
  })
  test('create a new name for validationProhibitRegexp', async () => {
    const validationName = getValidationName({
      val: validationProhibitRegexp,
      vals: validations,
    })
    expect(validationName).toEqual('prohibitRegexp-1')
  })
  test('create a new name for validationUnique', async () => {
    const validationName = getValidationName({
      val: validationUnique,
      vals: validations,
    })
    expect(validationName).toEqual('unique-true')
  })
  test('create a new name for validationDateRange', async () => {
    const validationName = getValidationName({
      val: validationDateRange,
      vals: validations,
    })
    expect(validationName).toEqual('dateRange-min112233-max332211')
  })
  test('create a new name for assetImageDimensions', async () => {
    const validationName = getValidationName({
      val: assetImageDimensions,
      vals: validations,
    })
    expect(validationName).toEqual(
      'assetImageDimensions-width-min111-max222-height-min333-max444'
    )
  })
  test('create a new name for validationAssetFileSize', async () => {
    const validationName = getValidationName({
      val: validationAssetFileSize,
      vals: validations,
    })
    expect(validationName).toEqual('assetFileSize-min333-max444')
  })
  test('create a new name for validationEnabledNodeTypes', async () => {
    const validationName = getValidationName({
      val: validationEnabledNodeTypes,
      vals: validations,
    })
    expect(validationName).toEqual('enabledNodeTypes-typeA-typeB')
  })
  test('create a new name for validationEnabledMarks', async () => {
    const validationName = getValidationName({
      val: validationEnabledMarks,
      vals: validations,
    })
    expect(validationName).toEqual('enabledMarks-bold-italic-underline')
  })
  test('create a new name for validationAssetRichText', async () => {
    const validationName = getValidationName({
      val: validationAssetRichText,
      vals: validations,
    })
    expect(validationName).toEqual('richText')
  })
  test('create a new name for validationDoesNotExist', async () => {
    const validationName = getValidationName({
      val: validationDoesNotExist,
      vals: validations,
    })
    expect(validationName).toEqual('unknown')
  })
})
