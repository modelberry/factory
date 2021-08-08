import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { PullArgv, pullCommand } from './commands/pull/pull'
import { PushArgv, pushCommand } from './commands/push/push'

type YargsOptions = {
  'dry-run': yargs.Options
  force: yargs.Options
  locale: yargs.Options
  type: yargs.Options
}

const options: YargsOptions = {
  'dry-run': {
    alias: 'd',
    describe: 'Run without making any changes',
    requiresArg: false,
    type: 'boolean',
  },
  force: {
    alias: 'f',
    describe:
      'Ignore all messages and warnings, this could result in data loss',
    requiresArg: false,
    type: 'boolean',
  },
  locale: {
    alias: 'l',
    describe: 'Override @modelberry {@locale}',
    requiresArg: true,
    type: 'string',
  },
  type: {
    alias: 't',
    describe: 'Filter by type value @modelberry {@type value}',
    requiresArg: true,
    type: 'string',
  },
}

yargs(hideBin(process.argv))
  .scriptName('factory')
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1, 'Command required. Use --help to list all commands.')
  .recommendCommands()
  .strict()
  .alias('h', 'help')
  .alias('v', 'version')
  .wrap(null)
  .command(
    'push <push-type> <file>',
    'push models or content to content platform',
    (yargs) => {
      yargs
        .positional('push-type', {
          type: 'string',
          describe: 'push models or content',
          choices: ['models', 'content'],
        })
        .positional('file', {
          type: 'string',
          describe: 'path to source file',
        })
    },
    (argv: yargs.Arguments<PushArgv>) => {
      pushCommand({ argv })
    }
  )
  .command(
    'pull <pull-type> <path>',
    'pull models or content from content platform',
    (yargs: yargs.Argv<any>) => {
      yargs
        .positional('pulll-type', {
          type: 'string',
          describe: 'pull models or content',
          choices: ['models', 'content'],
        })
        .positional('path', {
          type: 'string',
          describe: 'path where source files are created',
        })
    },
    (argv: yargs.Arguments<PullArgv>) => {
      pullCommand({ argv })
    }
  )
  .options(options)
  .demandCommand()
  .recommendCommands()
  .strict()
  .help().argv
