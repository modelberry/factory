import yargs from 'yargs'
import { PullArgv } from '../commands/pull/pull'
import { PushArgv } from '../commands/push/push'
import { Options } from '../call-handler/call-handler'
import { DiffArgv } from '../commands/diff/diff'

export interface GetAndGeportOptions {
  argv:
    | yargs.Arguments<PushArgv>
    | yargs.Arguments<PullArgv>
    | yargs.Arguments<DiffArgv>
}

export const getAndReportOptions = ({ argv }: GetAndGeportOptions) => {
  const options: Options = {
    dryRun: argv.dryRun,
    force: argv.force,
    locale: argv.locale,
    type: argv.type,
  }
  return options
}
