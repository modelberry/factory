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
  logger.p(`- modelberry project: ${process.env.MODELBERRY_PROJECT_NAME}`)
  logger.p(`- contentful space id: ${process.env.CONTENTFUL_SPACE_ID}`)
  logger.p(`- contentful environment: ${process.env.CONTENTFUL_ENVIRONMENT}`)

  let modelList = ''
  const createNodeList =
    command === 'push' || command === 'push-diff' || command === 'pull-diff'
  if (createNodeList && pluginData?.types) {
    const atTypeList = Object.values(pluginData?.types)
      .map((type) => type.interface.interfaceTags?.['@type'])
      .filter((atType) => !options?.filter || options?.filter === atType)
      .join(', ')
    if (!atTypeList) {
      logger.error('- no content types found')
      return
    }
    modelList = `- ${options?.filter ? 'filtered' : 'all'} models: ${
      atTypeList || 'none'
    }`
  }

  if (command === 'push' && type === 'models') {
    logger.p(`- pushing models to Contentful`)
    logger.p(modelList)
  }
  if (command === 'push-diff' && type === 'models') {
    logger.p(`- comparing local models to Contentful models`)
    logger.p(modelList)
  }
  if (command === 'push' && type === 'content') {
    logger.p(`- pushing content to Contentful`)
    logger.p(modelList)
  }
  if (command === 'push-diff' && type === 'content') {
    logger.p(`- comparing local content to Contentful content`)
    logger.p(modelList)
  }
  if (command === 'pull' && type === 'models') {
    logger.p(`- pulling models from Contentful`)
    logger.p(`- write to: ${path}`)
  }
  if (command === 'pull-diff' && type === 'models') {
    logger.p(`- comparing Contentful models to local models`)
  }
  if (command === 'pull' && type === 'content') {
    logger.p(`- pulling content from Contentful`)
    logger.p(`- write to: ${path}`)
  }
  if (command === 'pull-diff' && type === 'content') {
    logger.p(`- comparing Contentful content to local content`)
  }

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
  const statistics = await fetchStatistics({ contentfulEnvironment })
  logger.p(`- total entries found at Contentful: ${statistics.entriesTotal}`)
  logger.p(
    `- total content types found at Contentful: ${statistics.contentTypesTotal}`
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
