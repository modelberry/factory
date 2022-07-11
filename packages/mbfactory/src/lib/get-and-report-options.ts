import yargs from 'yargs'
import { PullArgv } from '../commands/pull/pull'
import { PushArgv } from '../commands/push/push'
import { Options } from '../call-handler/call-handler'

export interface GetAndGeportOptions {
  argv: yargs.Arguments<PushArgv> | yargs.Arguments<PullArgv>
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
