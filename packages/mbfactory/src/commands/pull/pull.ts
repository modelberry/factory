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
  if (argv.pullType === 'content') {
    await callHandler({
      command: 'pull',
      type: 'content',
      path: argv.path,
      pluginName: 'contentful',
    })
  }
  if (argv.pullType === 'models') {
    await callHandler({
      command: 'pull',
      type: 'models',
      path: argv.path,
      pluginName: 'contentful',
    })
  }
}
