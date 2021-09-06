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
  if (process.env.MODELBERRY_PROJECT_NAME) {
    log(chalk(`- modelberry project: ${process.env.MODELBERRY_PROJECT_NAME}`))
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
