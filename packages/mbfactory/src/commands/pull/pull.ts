import yargs from 'yargs'
import { ArgvType, callHandler, Options } from '../../lib/call-handler'
import { getAndGeportOptions } from '../../lib/get-and-report-options'

export type PullArgv = Options & {
  pullType: ArgvType
  path: string
}

export interface PullCommand {
  argv: yargs.Arguments<PullArgv>
}

// TODO: Make pluginName a cli parameter
export const pullCommand = async ({ argv }: PullCommand) => {
  const options = getAndGeportOptions({ argv })

  await callHandler({
    command: 'pull',
    options,
    path: argv.path,
    pluginName: 'contentful',
    type: argv.pullType,
  })
}
