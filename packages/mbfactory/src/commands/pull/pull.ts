import yargs from 'yargs'
import { ArgvType, callHandler } from '../../lib/call-handler'

export type PullArgv = {
  pullType: ArgvType
  path: string
}

export interface PullCommand {
  argv: yargs.Arguments<PullArgv>
}

// TODO: Make pluginName a cli parameter
export const pullCommand = async ({ argv }: PullCommand) => {
  await callHandler({
    command: 'pull',
    path: argv.path,
    pluginName: 'contentful',
    type: argv.pullType,
  })
}
