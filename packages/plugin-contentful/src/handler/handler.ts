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

  if (command === 'push' && pluginData?.types) {
    const atTypeList = Object.values(pluginData?.types)
      .map((type) => type.interface.interfaceTags?.['@type'])
      .filter((atType) => !options?.type || options?.type === atType)
      .join(', ')
    const modelList = chalk[atTypeList ? 'black' : 'red'](
      `- ${options?.type ? 'filtered' : 'all'} models: ${atTypeList || 'none'}`
    )

    if (type === 'models') {
      log(chalk(`- pushing models to Contentful`))
      log(modelList)
    }
    if (type === 'content') {
      log(chalk(`- pushing content to Contentful`))
      log(modelList)
    }
    if (!atTypeList) {
      return
    }
  }
  if (command === 'pull') {
    if (type === 'models') {
      log(chalk(`- pulling models from Contentful`))
      log(chalk(`- write to: ${path}`))
    }
    if (type === 'content') {
      log(chalk(`- pulling content from Contentful`))
      log(chalk(`- write to: ${path}`))
    }
  }

  if (options.dryRun) {
    console.log(chalk(`- dry run enabled, running without making any changes`))
  }
  if (options.force) {
    console.log(chalk(`- force enabled, ignoring all messages and warnings`))
  }
  if (options.locale) {
    console.log(
      chalk(`- overriding @modelberry {@locale} with ${options.locale}`)
    )
  }

  if (!options.force) {
    const answers = await inquirer.prompt(continueQuestion)
    if (answers.policy === 'q') return
  }

  const contentfulEnvironment = await getContentfulEnvironment()
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
