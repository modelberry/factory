import chalk from 'chalk'
import { PushHandler } from '@modelberry/mbfactory/plain'
import { getModelberryPluginData } from '../lib/get-modelberry-plugin-data'
import { getAndValidateEnv } from '../lib/get-and-validate-env'
import { pushModels } from '../push-models/push-models'
import { pushContent } from '../push-content/push-content'
import { getContentfulEnvironment } from '../lib/get-contentful-environment'

export const handler: PushHandler = async ({
  command,
  type,
  pluginData,
}) => {
  const log = console.log
  const isValid = getAndValidateEnv()
  if (!isValid) return
  if (!pluginData) return
  if (process.env.MODELBERRY_PROJECT_NAME) {
    log(chalk(`- modelberry project: ${process.env.MODELBERRY_PROJECT_NAME}`))
  }

  const dataVarObj = getModelberryPluginData({ dataVar: pluginData.dataVar })
  const validationsMap = dataVarObj?.validations || {}
  const contentfulEnvironment = await getContentfulEnvironment()
  if (command === 'push' && type === 'models') {
    await pushModels({
      contentfulEnvironment,
      typeData: pluginData.types,
      validationsMap,
    })
  }
  if (command === 'push' && type === 'content') {
    await pushContent({
      contentfulEnvironment,
      typeData: pluginData.types,
    })
  }
}
