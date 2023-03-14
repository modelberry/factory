import { logger } from '@modelberry/mbfactory'
import { environmentMock } from '../../contentful-mock/contentful-mock'
import { pushModels } from './push-models'
import { allTags } from './__fixtures__/all-tags'
import { badArraySymbol } from './__fixtures__/bad-array-symbol'
import { badFieldTag } from './__fixtures__/bad-field-tag'
import { badInterfaceTag } from './__fixtures__/bad-interface-tag'
import { badValidation } from './__fixtures__/bad-validation'
import { ignoreField } from './__fixtures__/ignore-field'
import { ignoreInterface } from './__fixtures__/ignore-interface'
import { multipleBadValidations } from './__fixtures__/multiple-bad-validations'
import { noFieldType } from './__fixtures__/no-field-type'
import { noInterfaceType } from './__fixtures__/no-interface-type'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

describe('Push models should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('process allTags correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: allTags,
      validationsMap: { mockedValidation: {} },
    })

    expect(logSpy.h1).toHaveBeenCalledWith('\nTopic')
    expect(logSpy.h2).toHaveBeenCalledWith('\nPushing to Contentful')
    expect(logSpy.h3).toHaveBeenCalledWith('heading')

    expect(logSpy.p).toHaveBeenCalledWith('- pushing content type...')
    expect(logSpy.p).toHaveBeenCalledWith('- pushing editor interface...')
  })

  test('process badValidation correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: badValidation,
      validationsMap: { mockedValidation: {} },
    })

    expect(logSpy.h1).toHaveBeenCalledWith('\nTopic')
    expect(logSpy.h3).toHaveBeenCalledWith('heading')
    expect(logSpy.h2).toHaveBeenCalledWith('\nPushing to Contentful')
    expect(logSpy.error).toHaveBeenCalledWith(
      '- validation doesNotExist not found'
    )
    expect(logSpy.error).toHaveBeenCalledWith(
      '- no valid fields found, skipping'
    )
  })

  test('process multipleBadValidation correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: multipleBadValidations,
      validationsMap: { mockedValidation: {} },
    })

    expect(logSpy.h1).toHaveBeenCalledWith('\nTopic')
    expect(logSpy.h3).toHaveBeenCalledWith('heading')
    expect(logSpy.error).toHaveBeenCalledWith(
      '- validation doesNotExist not found'
    )
    expect(logSpy.error).toHaveBeenCalledWith(
      '- validation doesNotExistEither not found'
    )
    expect(logSpy.h2).toHaveBeenCalledWith('\nPushing to Contentful')
    expect(logSpy.error).toHaveBeenCalledWith(
      '- no valid fields found, skipping'
    )
  })

  test('process ignoreField correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: ignoreField,
      validationsMap: { mockedValidation: {} },
    })

    expect(logSpy.h1).toHaveBeenCalledWith('\nTopic')
    expect(logSpy.h3).toHaveBeenCalledWith('heading')
    expect(logSpy.p).toHaveBeenCalledWith('- skipping because @ignore')
    expect(logSpy.h2).toHaveBeenCalledWith('\nPushing to Contentful')
    expect(logSpy.error).toHaveBeenCalledWith(
      '- no valid fields found, skipping'
    )
  })

  test('process ignoreInterface correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: ignoreInterface,
      validationsMap: { mockedValidation: {} },
    })

    expect(logSpy.h1).toHaveBeenCalledWith('\nTopic')
    expect(logSpy.p).toHaveBeenCalledWith('- skipping because @ignore')
  })

  test('process noFieldType correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: noFieldType,
      validationsMap: { mockedValidation: {} },
    })

    expect(logSpy.h1).toHaveBeenCalledWith('\nTopic')
    expect(logSpy.h3).toHaveBeenCalledWith('heading')
    expect(logSpy.error).toHaveBeenCalledWith('- no @type inline tag')
    expect(logSpy.h2).toHaveBeenCalledWith('\nPushing to Contentful')
    expect(logSpy.error).toHaveBeenCalledWith(
      '- no valid fields found, skipping'
    )
  })

  test('process noInterfaceType correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: noInterfaceType,
      validationsMap: { mockedValidation: {} },
    })

    expect(logSpy.h1).toHaveBeenCalledWith('\nTopic')
    expect(logSpy.error).toHaveBeenCalledWith(
      '- skipping because no @type inline tag'
    )
  })

  test('process badInterfaceTag correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: badInterfaceTag,
      validationsMap: { mockedValidation: {} },
    })

    expect(logSpy.h1).toHaveBeenCalledWith('\nTopic')
    expect(logSpy.error).toHaveBeenCalledWith(
      '- Unknown interface tag: @bad. Valid interface tags are: @description, @displayField, @locale, @localized, @name, @plugin, @type'
    )
    expect(logSpy.h3).toHaveBeenCalledWith('heading')
    expect(logSpy.h2).toHaveBeenCalledWith('\nPushing to Contentful')
    expect(logSpy.p).toHaveBeenCalledWith('- pushing content type...')
    expect(logSpy.p).toHaveBeenCalledWith('- pushing editor interface...')
  })

  test('process badFieldTag correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: badFieldTag,
      validationsMap: { mockedValidation: {} },
    })

    expect(logSpy.h1).toHaveBeenCalledWith('\nTopic')
    expect(logSpy.h3).toHaveBeenCalledWith('heading')
    expect(logSpy.error).toHaveBeenCalledWith(
      '- Unknown field tag: @bad. Valid field tags are: @description, @disabled, @ignore, @helpText, @itemsType, @itemsLinkType, @itemsValidations, @linkType, @locale, @localized, @name, @omitted, @required, @type, @validations, @widgetId'
    )
    expect(logSpy.h2).toHaveBeenCalledWith('\nPushing to Contentful')
    expect(logSpy.p).toHaveBeenCalledWith('- pushing content type...')
    expect(logSpy.p).toHaveBeenCalledWith('- pushing editor interface...')
  })
  test('process badArraySymbol correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: badArraySymbol,
      validationsMap: { mockedValidation: {} },
    })

    expect(logSpy.h1).toHaveBeenCalledWith('\nTopic')
    expect(logSpy.h3).toHaveBeenCalledWith('keywords')
    expect(logSpy.error).toHaveBeenCalledWith(
      '- @type=Array, @itemsType=Symbol must be of type string'
    )
    expect(logSpy.h2).toHaveBeenCalledWith('\nPushing to Contentful')
    expect(logSpy.error).toHaveBeenCalledWith(
      '- no valid fields found, skipping'
    )
  })
})
