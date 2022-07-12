import { inspect } from 'util'
import chalk from 'chalk'
import { Options } from '../call-handler/call-handler'

export type LoggerType = 'h1' | 'h2' | 'h3' | 'info' | 'p' | 'warning' | 'error'

export interface LoggerInit {
  options: Options
}

export type Logger = {
  /** Not used */
  init: (args: LoggerInit) => void
  /** Heading 1 */
  h1: (message: string) => void
  /** Heading 2 */
  h2: (message: string) => void
  /** Heading 3 */
  h3: (message: string) => void
  /** Paragraph */
  p: (message: string) => void
  /** Information message */
  info: (message: string) => void
  /** Warning message */
  warning: (message: string) => void
  /** Error message */
  error: (message: string) => void
  /** Internally used by all log types */
  log: (message: string) => void
  /** For debugging, logs a formatted object */
  object: (heading: string, object: any) => void
  /** Not used */
  options: Options
  /** When set to true, logging is disabled */
  mute: boolean
}

export type LoggerFactory = () => Logger

export const LoggerFactory: LoggerFactory = () => ({
  init({ options }: LoggerInit) {
    Object.assign(this.options, options)
  },
  h1(message: string) {
    this.log(chalk.bold.underline(message))
  },
  h2(message: string) {
    this.log(chalk.bold(message))
  },
  h3(message: string) {
    this.log(chalk.underline(message))
  },
  p(message: string) {
    this.log(chalk(message))
  },
  info(message: string) {
    this.log(chalk.blue(message))
  },
  warning(message: string) {
    this.log(chalk.red.bold(message))
  },
  error(message: string) {
    this.log(chalk.red(message))
  },
  log(message: string) {
    if (this.mute) return
    console.log(message)
  },
  object(heading: string, object: any) {
    if (this.mute) return
    console.log(heading, inspect(object, false, 10, true))
  },
  options: {},
  mute: false,
})

export const logger = LoggerFactory()
