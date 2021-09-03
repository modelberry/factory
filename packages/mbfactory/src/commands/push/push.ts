import { existsSync } from 'fs'
import ts from 'typescript'
import chalk from 'chalk'
import yargs from 'yargs'
import { getAllPluginData } from '../../get-all-plugin-data/get-all-plugin-data'
import { getCompilerOptions } from '../../get-compiler-options/get-compiler-options'
import { ArgvType, callHandler, Options } from '../../call-handler/call-handler'
import { getAndGeportOptions } from '../../lib/get-and-report-options'

export type PushArgv = Options & {
  pushType: ArgvType
  file: string
}

export interface PushCommand {
  argv: yargs.Arguments<PushArgv>
}

export const pushCommand = async ({ argv }: PushCommand) => {
  const log = console.log
  log(chalk.bold.underline(`\nAnalyzing source files`))
  if (!existsSync(argv.file)) {
    log(chalk.red(`- file not found: ${argv.file}`))
    return
  }
  const compilerOptions = getCompilerOptions()
  const program = ts.createProgram([argv.file], compilerOptions.options)
  const allPluginData = getAllPluginData({ program })
  if (Object.keys(allPluginData).length < 1) {
    log(chalk.red(`- nothing to process in file: ${argv.file}`))
    return
  }
  const options = getAndGeportOptions({ argv })

  for (const pluginName of Object.keys(allPluginData)) {
    await callHandler({
      command: 'push',
      options,
      pluginData: allPluginData[pluginName],
      pluginName,
      type: argv.pushType,
    })
  }
}
