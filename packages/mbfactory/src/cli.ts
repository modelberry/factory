import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { DiffArgv, diffCommand } from './commands/diff/diff'
import { PullArgv, pullCommand } from './commands/pull/pull'
import { PushArgv, pushCommand } from './commands/push/push'

type YargsOptions = {
  'dry-run': yargs.Options
  filter: yargs.Options
  locale: yargs.Options
  yes: yargs.Options
}

const options: YargsOptions = {
  'dry-run': {
    alias: 'd',
    describe: 'Run without making any changes',
    requiresArg: false,
    type: 'boolean',
  },
  filter: {
    alias: 'f',
    describe: 'Filter by type value @modelberry {@type value}',
    requiresArg: true,
    type: 'string',
  },
  locale: {
    alias: 'l',
    describe: 'Override @modelberry {@locale}',
    requiresArg: true,
    type: 'string',
  },
  yes: {
    alias: 'y',
    describe:
      'Answer yes to all messages and warnings, this could result in data loss',
    requiresArg: false,
    type: 'boolean',
  },
}

/**
 * PUSH COMMAND
 *********************************/
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

/**
 * PULL COMMAND
 *********************************/

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

/**
 * DIFF COMMAND
 *********************************/

const diffBuilder: yargs.BuilderCallback<any, any> = (yargs) => {
  yargs
    .positional('diffl-type', {
      type: 'string',
      describe: 'diff models or content',
      choices: ['models', 'content'],
    })
    .positional('file', {
      type: 'string',
      describe: 'path to source file',
    })
}

const diffHandler = (argv: yargs.ArgumentsCamelCase<DiffArgv>) => {
  diffCommand({ argv })
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
  .command(
    'diff <diff-type> <file>',
    'compare locally defined models or content with content platform',
    diffBuilder,
    diffHandler
  )
  .options(options)
  .demandCommand()
  .recommendCommands()
  .strict()
  .help().argv
