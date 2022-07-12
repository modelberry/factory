import { Handler, logger } from '@modelberry/mbfactory/plain'
import inquirer from 'inquirer'
import { pushModels } from '../push/models/push-models'
import { pushContent } from '../push/content/push-content'
import { pullModels } from '../pull/models/pull-models'
import { pullContent } from '../pull/content/pull-content'
import { pullDiffContent } from '../pull/content/pull-diff-content'
import { pullDiffModels } from '../pull/models/pull-diff-models'
import { pushDiffContent } from '../push/content/push-diff-content'
import { pushDiffModels } from '../push/models/push-diff-models'
import { getAndValidateEnv } from './get-and-validate-env'
import { getContentfulEnvironment } from './get-contentful-environment'
import { continueQuestion } from './questions'
import { fetchStatistics } from './fetch-statistics'
import { getModelberryPluginData } from './get-modelberry-plugin-data'

export const handler: Handler = async ({
  command,
  options,
  path,
  pluginData,
  type,
}) => {
  const isValid = getAndValidateEnv()
  if (!isValid) return

  // Log environment
  logger.p(`- modelberry project: ${process.env.MODELBERRY_PROJECT_NAME}`)
  logger.p(`- contentful space id: ${process.env.CONTENTFUL_SPACE_ID}`)
  logger.p(`- contentful environment: ${process.env.CONTENTFUL_ENVIRONMENT}`)

  // Log heading
  if (command === 'push' && type === 'models') {
    logger.h1(`\nPushing models to Contentful`)
  }
  if (command === 'push-diff' && type === 'models') {
    logger.h1(`\nComparing local models to Contentful models`)
  }
  if (command === 'push' && type === 'content') {
    logger.h1(`\nPushing content to Contentful`)
  }
  if (command === 'push-diff' && type === 'content') {
    logger.h1(`\nComparing local content to Contentful content`)
  }
  if (command === 'pull' && type === 'models') {
    logger.h1(`\nPulling models from Contentful`)
  }
  if (command === 'pull-diff' && type === 'models') {
    logger.h1(`\nComparing Contentful models to local models`)
  }
  if (command === 'pull' && type === 'content') {
    logger.h1(`\nPulling content from Contentful`)
  }
  if (command === 'pull-diff' && type === 'content') {
    logger.h1(`\nComparing Contentful content to local content`)
  }

  // Log path
  if (command === 'pull') {
    logger.p(`- write to: ${path}`)
  }

  // Log node list
  if (
    (command === 'push' ||
      command === 'push-diff' ||
      command === 'pull-diff') &&
    pluginData?.types
  ) {
    const atTypeList = Object.values(pluginData?.types)
      .map((type) => type.interface.interfaceTags?.['@type'])
      .filter((atType) => !options?.filter || options?.filter === atType)
      .join(', ')
    if (!atTypeList) {
      logger.error('- no content types found')
      return
    }
    const modelList = `- ${options?.filter ? 'filtered' : 'all'} models: ${
      atTypeList || 'none'
    }`
    logger.p(modelList)
  }

  // Report when options are enabled
  if (options.dryRun) {
    logger.p(`- dry run enabled, running without making any changes`)
  }
  if (options.yes) {
    logger.p(`- yes option, answering yes to all messages and warnings`)
  }
  if (options.locale) {
    logger.p(`- using locale: ${options.locale}`)
  }

  const contentfulEnvironment = await getContentfulEnvironment()
  logger.p(`- fetching statisitcs from Contentful...`)
  const statistics = await fetchStatistics({ contentfulEnvironment })
  logger.p(
    `- stats: entries: ${statistics.entriesTotal}, content types: ${statistics.contentTypesTotal}`
  )

  if (!options.yes) {
    const answers = await inquirer.prompt(continueQuestion)
    if (answers.policy === 'q') return
  }

  if (command === 'push' && type === 'models') {
    if (!pluginData) return
    const dataVarObj = getModelberryPluginData({ dataVar: pluginData.dataVar })
    const validationsMap = dataVarObj?.validations || {}
    await pushModels({
      contentfulEnvironment,
      options,
      typeData: pluginData.types,
      validationsMap,
    })
  }
  if (command === 'push' && type === 'content') {
    if (!pluginData) return
    await pushContent({
      contentfulEnvironment,
      options,
      typeData: pluginData.types,
    })
  }
  if (command === 'pull' && type === 'models') {
    if (!path) return
    await pullModels({
      contentfulEnvironment,
      options,
      path,
    })
  }
  if (command === 'pull' && type === 'content') {
    if (!path) return
    await pullContent({
      contentfulEnvironment,
      options,
      path,
    })
  }
  if (command === 'push-diff' && type === 'models') {
    if (!pluginData) return
    const dataVarObj = getModelberryPluginData({ dataVar: pluginData.dataVar })
    const validationsMap = dataVarObj?.validations || {}
    await pushDiffModels({
      contentfulEnvironment,
      options,
      typeData: pluginData.types,
      validationsMap,
    })
  }
  if (command === 'push-diff' && type === 'content') {
    if (!pluginData) return
    await pushDiffContent({
      contentfulEnvironment,
      options,
      typeData: pluginData.types,
    })
  }
  if (command === 'pull-diff' && type === 'models') {
    if (!pluginData) return
    const dataVarObj = getModelberryPluginData({ dataVar: pluginData.dataVar })
    const validationsMap = dataVarObj?.validations || {}
    await pullDiffModels({
      contentfulEnvironment,
      options,
      typeData: pluginData.types,
      validationsMap,
    })
  }
  if (command === 'pull-diff' && type === 'content') {
    if (!pluginData) return
    await pullDiffContent({
      contentfulEnvironment,
      options,
      typeData: pluginData.types,
    })
  }
}
