import yargs from 'yargs'
import { ArgvType, callHandler, Options } from '../../lib/call-handler'

export type PullArgv = Options & {
  pullType: ArgvType
  path: string
}

export interface PullCommand {
  argv: yargs.Arguments<PullArgv>
}

// TODO: Make pluginName a cli parameter
export const pullCommand = async ({ argv }: PullCommand) => {
  const options: Options = {
    dryRun: argv.dryRun,
    force: argv.force,
    locale: argv.locale,
    type: argv.type,
  }
  await callHandler({
    command: 'pull',
    options,
    path: argv.path,
    pluginName: 'contentful',
    type: argv.pullType,
  })
}
