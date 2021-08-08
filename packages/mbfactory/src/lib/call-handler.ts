import chalk from 'chalk'
import { TypeData, PluginData } from './get-all-plugin-data/get-all-plugin-data'
import { ModelberryVariable } from './parse-modelberry-variable'

export type Command = 'push' | 'pull'
export type ArgvType = 'content' | 'models'

export interface CallHandler {
  command: Command
  type: ArgvType
  path?: string
  pluginData?: PluginData
  pluginName: string
}

export type PushHandlerArgs = {
  command: Command
  type: ArgvType
  pluginData?: {
    types: TypeData
    dataVar: ModelberryVariable
  }
}

export type PushHandler = (args: PushHandlerArgs) => Promise<void>

export interface Module {
  handler?: PushHandler
}

export const callHandler = async ({
  command,
  type,
  pluginData,
  pluginName,
}: CallHandler) => {
  const log = console.log
  log(chalk.bold.underline(`\nRunning plugin`))
  console.log(chalk(`- plugin: ${pluginName}`))
  let module: Module = {}
  try {
    module = <Module>await import(pluginName)
  } catch (e) {
    console.log(chalk.red(`- could not find plugin (${e.code})`))
    return
  }

  if (module.handler) {
    await module.handler({ command, type, pluginData })
  } else {
    log(chalk.red(`- could not find handler method on plugin`))
    return
  }
}
