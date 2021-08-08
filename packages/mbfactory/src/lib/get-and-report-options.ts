import chalk from 'chalk'
import yargs from 'yargs'
import { PullArgv } from '../commands/pull/pull'
import { PushArgv } from '../commands/push/push'
import { Options } from './call-handler'

export interface GetAndGeportOptions {
  argv: yargs.Arguments<PushArgv> | yargs.Arguments<PullArgv>
}

export const getAndGeportOptions = ({ argv }: GetAndGeportOptions) => {
  const options: Options = {
    dryRun: argv.dryRun,
    force: argv.force,
    locale: argv.locale,
    type: argv.type,
  }

  if (options.dryRun) {
    console.log(chalk(`- dry run enabled, running without making any changes`))
  }
  if (options.force) {
    console.log(chalk(`- force enabled, ignoring all messages and warnings`))
  }
  if (options.locale) {
    console.log(
      chalk.red(`- overriding @modelberry {@locale} with ${options.locale}`)
    )
  }
  if (options.type) {
    console.log(chalk.red(`- filtering by type value ${options.type}`))
  }

  return options
}
