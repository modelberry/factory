import {
  PluginData,
  TypeData,
} from '../get-all-plugin-data/get-all-plugin-data'
import { logger } from '../lib/logger'
import { ModelberryVariable } from '../modelberry-parser/parse-modelberry-variable'

export type Command = 'push' | 'pull' | 'diff'
export type ArgvType = 'content' | 'models'

export type Options = {
  /** Run without making any changes */
  dryRun?: boolean
  /** Ignore all messages and warnings, this could result in data loss */
  force?: boolean
  /** Override @modelberry {@locale} */
  locale?: string
  /** Filter by type value @modelberry {@type value} */
  type?: string
}

export interface CallHandler {
  command: Command
  options: Options
  path?: string
  pluginData?: PluginData
  pluginName: string
  type: ArgvType
}

export type HandlerArgs = {
  command: Command
  options: Options
  path?: string
  pluginData?: {
    types: TypeData
    dataVar: ModelberryVariable
  }
  type: ArgvType
}

export type Handler = (args: HandlerArgs) => Promise<void>

export interface Module {
  handler?: Handler
}

export const callHandler = async ({
  command,
  options,
  path,
  pluginData,
  pluginName,
  type,
}: CallHandler) => {
  logger.h1(`\nRunning plugin`)
  logger.p(`- plugin: ${pluginName}`)
  let module: Module = {}
  try {
    module = <Module>await import(pluginName)
  } catch (e: any) {
    logger.error(`- could not find plugin (${e.code})`)
    return
  }

  if (module.handler) {
    await module.handler({ command, options, path, pluginData, type })
  } else {
    logger.error(`- could not find handler method on plugin`)
    return
  }
}
