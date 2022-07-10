import { existsSync } from 'fs'
import ts from 'typescript'
import yargs from 'yargs'
import { getAllPluginData } from '../../get-all-plugin-data/get-all-plugin-data'
import { getCompilerOptions } from '../../get-compiler-options/get-compiler-options'
import { ArgvType, callHandler, Options } from '../../call-handler/call-handler'
import { getAndReportOptions } from '../../lib/get-and-report-options'
import { logger } from '../../lib/logger'

export type DiffArgv = Options & {
  diffType: ArgvType
  file: string
}

export interface DiffCommand {
  argv: yargs.Arguments<DiffArgv>
}

export const diffCommand = async ({ argv }: DiffCommand) => {
  logger.h1(`\nAnalyzing source files`)
  if (!existsSync(argv.file)) {
    logger.error(`- file not found: ${argv.file}`)
    return
  }
  const compilerOptions = getCompilerOptions()
  const program = ts.createProgram([argv.file], compilerOptions.options)
  const allPluginData = getAllPluginData({ program })
  if (Object.keys(allPluginData).length < 1) {
    logger.error(`- nothing to process in file: ${argv.file}`)
    return
  }
  const options = getAndReportOptions({ argv })

  for (const pluginName of Object.keys(allPluginData)) {
    await callHandler({
      command: 'diff',
      options,
      pluginData: allPluginData[pluginName],
      pluginName,
      type: argv.diffType,
    })
  }
}