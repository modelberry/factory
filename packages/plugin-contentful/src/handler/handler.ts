import chalk from 'chalk'
import { PushHandler } from '@modelberry/mbfactory/plain'
import inquirer from 'inquirer'
import { getModelberryPluginData } from '../lib/get-modelberry-plugin-data'
import { getAndValidateEnv } from '../lib/get-and-validate-env'
import { pushModels } from '../push-models/push-models'
import { pushContent } from '../push-content/push-content'
import { getContentfulEnvironment } from '../lib/get-contentful-environment'
import { continueQuestion } from '../lib/questions'

export const handler: PushHandler = async ({
  command,
  options,
  pluginData,
  type,
}) => {
  const log = console.log
  const isValid = getAndValidateEnv()
  if (!isValid) return
  if (!pluginData) return
  if (process.env.MODELBERRY_PROJECT_NAME) {
    log(chalk(`- modelberry project: ${process.env.MODELBERRY_PROJECT_NAME}`))
  }
  if (!options.force) {
    const answers = await inquirer.prompt(continueQuestion)
    if (answers.policy === 'a') return
  }

  const dataVarObj = getModelberryPluginData({ dataVar: pluginData.dataVar })
  const validationsMap = dataVarObj?.validations || {}
  const contentfulEnvironment = await getContentfulEnvironment()
  if (command === 'push' && type === 'models') {
    await pushModels({
      contentfulEnvironment,
      options,
      typeData: pluginData.types,
      validationsMap,
    })
  }
  if (command === 'push' && type === 'content') {
    await pushContent({
      contentfulEnvironment,
      options,
      typeData: pluginData.types,
    })
  }
}
