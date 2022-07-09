import chalk from 'chalk'
import { Options } from '../call-handler/call-handler'

export interface LoggerInit {
  options: Options
}

export type Logger = {
  error: (message: string) => void
  h1: (message: string) => void
  h2: (message: string) => void
  h3: (message: string) => void
  init: (args: LoggerInit) => void
  log: (message: string) => void
  options: Options
  p: (message: string) => void
}

export type LoggerFactory = () => Logger

export const LoggerFactory: LoggerFactory = () => ({
  error(message: string) {
    this.log(chalk.red(message))
  },
  bus: [] as string[],
  h1(message: string) {
    this.log(chalk.bold.underline(message))
  },
  h2(message: string) {
    this.log(chalk.bold(message))
  },
  h3(message: string) {
    this.log(chalk.underline(message))
  },
  init({ options }: LoggerInit) {
    Object.assign(this.options, options)
  },
  log: console.log,
  options: {},
  p(message: string) {
    this.log(chalk(message))
  },
})

export const logger = LoggerFactory()
