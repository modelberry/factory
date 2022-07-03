import { mkdir } from 'fs/promises'
import yargs from 'yargs'
import { ArgvType, callHandler, Options } from '../../call-handler/call-handler'
import { getAndReportOptions } from '../../lib/get-and-report-options'

export type PullArgv = Options & {
  path: string
  plugin: string
  pullType: ArgvType
}

export interface PullCommand {
  argv: yargs.Arguments<PullArgv>
}

export const pullCommand = async ({ argv }: PullCommand) => {
  const options = getAndReportOptions({ argv })

  await mkdir(argv.path, { recursive: true })

  await callHandler({
    command: 'pull',
    options,
    path: argv.path,
    pluginName: argv.plugin,
    type: argv.pullType,
  })
}
