import chalk from 'chalk'
import { environmentMock } from '../contentful-mock/contentful-mock'
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

const headingResponse = [
  [chalk.bold.underline('\nTopic')],
  [chalk.underline('heading')],
]

const pushingResponse = [
  [chalk.bold('\nPushing to Contentful')],
  [chalk('- pushing content type')],
  [chalk('- pushing editor interface')],
]

const notPushingResponse = [
  [chalk.bold('\nPushing to Contentful')],
  [chalk.red('- no valid fields found, skipping')],
]

describe('Push models should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })

  test('process allTags correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: allTags,
      validationsMap: { mockedValidation: {} },
    })
    expect(consoleSpy.mock.calls).toEqual([
      ...headingResponse,
      [chalk('- validation mockedValidation')],
      [chalk('- editor control singleLine')],
      [chalk('- help text')],
      ...pushingResponse,
    ])
  })

  test('process badValidation correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: badValidation,
      validationsMap: { mockedValidation: {} },
    })
    expect(consoleSpy.mock.calls).toEqual([
      [chalk.bold.underline('\nTopic')],
      [chalk.underline('heading')],
      [chalk.red('- validation doesNotExist not found')],
      ...notPushingResponse,
    ])
  })

  test('process multipleBadValidation correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: multipleBadValidations,
      validationsMap: { mockedValidation: {} },
    })
    expect(consoleSpy.mock.calls).toEqual([
      [chalk.bold.underline('\nTopic')],
      [chalk.underline('heading')],
      [chalk.red('- validation doesNotExist not found')],
      [chalk.red('- validation doesNotExistEither not found')],
      ...notPushingResponse,
    ])
  })

  test('process ignoreField correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: ignoreField,
      validationsMap: { mockedValidation: {} },
    })
    expect(consoleSpy.mock.calls).toEqual([
      [chalk.bold.underline('\nTopic')],
      [chalk.underline('heading')],
      [chalk('- skipping because @ignore')],
      ...notPushingResponse,
    ])
  })

  test('process ignoreInterface correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: ignoreInterface,
      validationsMap: { mockedValidation: {} },
    })
    expect(consoleSpy.mock.calls).toEqual([
      [chalk.bold.underline('\nTopic')],
      [chalk('- skipping because @ignore')],
    ])
  })

  test('process noFieldType correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: noFieldType,
      validationsMap: { mockedValidation: {} },
    })
    expect(consoleSpy.mock.calls).toEqual([
      [chalk.bold.underline('\nTopic')],
      [chalk.underline('heading')],
      [chalk.red('- no @type inline tag')],
      ...notPushingResponse,
    ])
  })

  test('process noInterfaceType correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: noInterfaceType,
      validationsMap: { mockedValidation: {} },
    })
    expect(consoleSpy.mock.calls).toEqual([
      [chalk.bold.underline('\nTopic')],
      [chalk.red('- skipping because no @type inline tag')],
    ])
  })

  test('process badInterfaceTag correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: badInterfaceTag,
      validationsMap: { mockedValidation: {} },
    })
    expect(consoleSpy.mock.calls).toEqual([
      [chalk.bold.underline('\nTopic')],
      [
        chalk.red(
          '- Unknown interface tag: @bad. Valid interface tags are: @description, @displayField, @locale, @localized, @name, @plugin, @type'
        ),
      ],
      [chalk.underline('heading')],
      [chalk('- editor control singleLine')],
      ...pushingResponse,
    ])
  })

  test('process badFieldTag correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: badFieldTag,
      validationsMap: { mockedValidation: {} },
    })
    expect(consoleSpy.mock.calls).toEqual([
      ...headingResponse,
      [
        chalk.red(
          '- Unknown field tag: @bad. Valid field tags are: @description, @disabled, @ignore, @helpText, @itemsType, @itemsLinkType, @itemsValidations, @linkType, @locale, @localized, @name, @omitted, @required, @type, @validations, @widgetId'
        ),
      ],
      [chalk('- editor control singleLine')],
      ...pushingResponse,
    ])
  })
  test('process badArraySymbol correctly', async () => {
    await pushModels({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: badArraySymbol,
      validationsMap: { mockedValidation: {} },
    })
    expect(consoleSpy.mock.calls).toEqual([
      [chalk.bold.underline('\nTopic')],
      [chalk.underline('keywords')],
      [chalk.red('- @type=Array, @itemsType=Symbol must be of type string')],
      ...notPushingResponse,
    ])
  })
})
