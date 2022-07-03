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
  // TODO: Change force into silent
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
  // TODO: Change type into filter
  type: {
    alias: 't',
    describe: 'Filter by type value @modelberry {@type value}',
    requiresArg: true,
    type: 'string',
  },
}

const pushBuilder: yargs.BuilderCallback<any, any> = (yargs) => {
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
}

const pushHandler = (argv: yargs.ArgumentsCamelCase<PushArgv>) => {
  pushCommand({ argv })
}

const pullBuilder: yargs.BuilderCallback<any, any> = (yargs) => {
  yargs
    .positional('pulll-type', {
      type: 'string',
      describe: 'pull models or content',
      choices: ['models', 'content'],
    })
    .positional('plugin', {
      type: 'string',
      describe: 'plugin to use for pull',
    })
    .positional('path', {
      type: 'string',
      describe: 'path where source files are created',
    })
}

const pullHandler = (argv: yargs.ArgumentsCamelCase<PullArgv>) => {
  pullCommand({ argv })
}

yargs(hideBin(process.argv))
  .scriptName('mbfactory')
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
    pushBuilder,
    pushHandler
  )
  .command(
    'pull <pull-type> <plugin> <path>',
    'pull models or content from content platform',
    pullBuilder,
    pullHandler
  )
  .options(options)
  .demandCommand()
  .recommendCommands()
  .strict()
  .help().argv
