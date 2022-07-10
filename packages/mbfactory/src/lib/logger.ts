import { inspect } from 'util'
import chalk from 'chalk'
import { Options } from '../call-handler/call-handler'

export interface LoggerInit {
  options: Options
}

export type Logger = {
  init: (args: LoggerInit) => void
  h1: (message: string) => void
  h2: (message: string) => void
  h3: (message: string) => void
  p: (message: string) => void
  info: (message: string) => void
  warning: (message: string) => void
  error: (message: string) => void
  log: (message: string) => void
  object: (heading: string, object: any) => void
  options: Options
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
