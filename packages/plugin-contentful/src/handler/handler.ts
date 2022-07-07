import chalk from 'chalk'
import { Handler } from '@modelberry/mbfactory/plain'
import inquirer from 'inquirer'
import { getModelberryPluginData } from '../lib/get-modelberry-plugin-data'
import { getAndValidateEnv } from '../lib/get-and-validate-env'
import { pushModels } from '../push-models/push-models'
import { pushContent } from '../push-content/push-content'
import { getContentfulEnvironment } from '../lib/get-contentful-environment'
import { continueQuestion } from '../lib/questions'
import { pullModels } from '../pull-models/pull-models'
import { pullContent } from '../pull-content/pull-content'
import { fetchStatistics } from '../lib/fetch-statistics'
import { diffModels } from '../diff-models/diff-models'
import { diffContent } from '../diff-content/diff-content'

export const handler: Handler = async ({
  command,
  options,
  path,
  pluginData,
  type,
}) => {
  const log = console.log
  const isValid = getAndValidateEnv()
  if (!isValid) return
  log(chalk(`- modelberry project: ${process.env.MODELBERRY_PROJECT_NAME}`))
  log(chalk(`- contentful space id: ${process.env.CONTENTFUL_SPACE_ID}`))
  log(chalk(`- contentful environment: ${process.env.CONTENTFUL_ENVIRONMENT}`))

  let modelList = ''
  if (command === 'push' && pluginData?.types) {
    const atTypeList = Object.values(pluginData?.types)
      .map((type) => type.interface.interfaceTags?.['@type'])
      .filter((atType) => !options?.type || options?.type === atType)
      .join(', ')
    if (!atTypeList) {
      log(chalk.red('- no content types found'))
      return
    }
    modelList = chalk(
      `- ${options?.type ? 'filtered' : 'all'} models: ${atTypeList || 'none'}`
    )
  }

  if (command === 'push' && type === 'models') {
    log(chalk(`- pushing models to Contentful`))
    log(modelList)
  }
  if (command === 'push' && type === 'content') {
    log(chalk(`- pushing content to Contentful`))
    log(modelList)
  }
  if (command === 'pull' && type === 'models') {
    log(chalk(`- pulling models from Contentful`))
    log(chalk(`- write to: ${path}`))
  }
  if (command === 'pull' && type === 'content') {
    log(chalk(`- pulling content from Contentful`))
    log(chalk(`- write to: ${path}`))
  }
  if (command === 'diff' && type === 'models') {
    log(chalk(`- comparing local models with Contentful`))
  }
  if (command === 'diff' && type === 'content') {
    log(chalk(`- comparing local content with Contentful`))
  }

  if (options.dryRun) {
    log(chalk(`- dry run enabled, running without making any changes`))
  }
  if (options.force) {
    log(chalk(`- force enabled, ignoring all messages and warnings`))
  }
  if (options.locale) {
    log(chalk(`- overriding @modelberry {@locale} with ${options.locale}`))
  }

  const contentfulEnvironment = await getContentfulEnvironment()
  const statistics = await fetchStatistics({ contentfulEnvironment })
  log(chalk(`- entries found at Contentful: ${statistics.entriesTotal}`))
  log(
    chalk(
      `- content types found at Contentful: ${statistics.contentTypesTotal}`
    )
  )

  if (!options.force) {
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
  if (command === 'diff' && type === 'models') {
    if (!pluginData) return
    const dataVarObj = getModelberryPluginData({ dataVar: pluginData.dataVar })
    const validationsMap = dataVarObj?.validations || {}
    await diffModels({
      contentfulEnvironment,
      options,
      typeData: pluginData.types,
      validationsMap,
    })
  }
  if (command === 'diff' && type === 'content') {
    if (!pluginData) return
    await diffContent({
      contentfulEnvironment,
      options,
      typeData: pluginData.types,
    })
  }
}
