import yargs from 'yargs'
import { PullArgv } from '../commands/pull/pull'
import { PushArgv } from '../commands/push/push'
import { Options } from '../call-handler/call-handler'
import { PullDiffArgv } from '../commands/pull-diff/pull-diff'
import { PushDiffArgv } from '../commands/push-diff/push-diff'

export interface GetAndGeportOptions {
  argv:
    | yargs.Arguments<PushArgv>
    | yargs.Arguments<PullArgv>
    | yargs.Arguments<PullDiffArgv>
    | yargs.Arguments<PushDiffArgv>
}

export const getAndReportOptions = ({ argv }: GetAndGeportOptions) => {
  const options: Options = {
    dryRun: argv.dryRun,
    filter: argv.filter,
    locale: argv.locale,
    yes: argv.yes,
  }
  return options
}
