import { Handler, logger } from '@modelberry/mbfactory/plain'
import inquirer from 'inquirer'
import { getModelberryPluginData } from '../push/models/get-modelberry-plugin-data'
import { getAndValidateEnv } from '../lib/get-and-validate-env'
import { pushModels } from '../push/models/push-models'
import { pushContent } from '../push/content/push-content'
import { getContentfulEnvironment } from '../lib/get-contentful-environment'
import { continueQuestion } from '../lib/questions'
import { pullModels } from '../pull/models/pull-models'
import { pullContent } from '../pull/content/pull-content'
import { fetchStatistics } from '../lib/fetch-statistics'

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
  if (command === 'push' && pluginData?.types) {
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
    if (options.diff) {
      logger.p(`- comparing local models to Contentful models`)
      logger.p(modelList)
    } else {
      logger.p(`- pushing models to Contentful`)
      logger.p(modelList)
    }
  }
  if (command === 'push' && type === 'content') {
    if (options.diff) {
      logger.p(`- comparing local content to Contentful content`)
      logger.p(modelList)
    } else {
      logger.p(`- pushing content to Contentful`)
      logger.p(modelList)
    }
  }
  if (command === 'pull' && type === 'models') {
    if (options.diff) {
      logger.p(`- comparing Contentful models to local models`)
    } else {
      logger.p(`- pulling models from Contentful`)
      logger.p(`- write to: ${path}`)
    }
  }
  if (command === 'pull' && type === 'content') {
    if (options.diff) {
      logger.p(`- comparing Contentful content to local content`)
    } else {
      logger.p(`- pulling content from Contentful`)
      logger.p(`- write to: ${path}`)
    }
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
  logger.p(`- entries found at Contentful: ${statistics.entriesTotal}`)
  logger.p(
    `- content types found at Contentful: ${statistics.contentTypesTotal}`
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
}
