import { existsSync } from 'fs'
import ts from 'typescript'
import yargs from 'yargs'
import { getAllPluginData } from '../../get-all-plugin-data/get-all-plugin-data'
import { getCompilerOptions } from '../../get-compiler-options/get-compiler-options'
import { ArgvType, callHandler, Options } from '../../call-handler/call-handler'
import { getAndReportOptions } from '../../lib/get-and-report-options'
import { logger } from '../../lib/logger'
import { ExitCodes } from '../../lib/exit-codes'

export type PushDiffArgv = Options & {
  diffType: ArgvType
  file: string
}

export interface PushDiffCommand {
  argv: yargs.Arguments<PushDiffArgv>
}

export const pushDiffCommand = async ({ argv }: PushDiffCommand) => {
  logger.h1(`\nAnalyzing source files`)
  if (!existsSync(argv.file)) {
    logger.error(`- file not found: ${argv.file}`)
    process.exitCode = ExitCodes.FileNotFound
    return
  }
  const compilerOptions = getCompilerOptions()
  const program = ts.createProgram([argv.file], compilerOptions.options)
  const allPluginData = getAllPluginData({ program })
  if (Object.keys(allPluginData).length < 1) {
    logger.error(`- nothing to process in file: ${argv.file}`)
    process.exitCode = ExitCodes.NothingToProcess
    return
  }
  const options = getAndReportOptions({ argv })

  for (const pluginName of Object.keys(allPluginData)) {
    await callHandler({
      command: 'push-diff',
      options,
      pluginData: allPluginData[pluginName],
      pluginName,
      type: argv.diffType,
    })
  }
}
