import chalk from 'chalk'
import { Options } from '../call-handler/call-handler'

export interface LoggerInit {
  options: Options
}

export type Logger = {
  bus: string[]
  error: (message: string) => void
  h1: (message: string) => void
  h2: (message: string) => void
  h3: (message: string) => void
  p: (message: string) => void
  init: (args: LoggerInit) => void
  options: Options
}

export type LoggerFactory = () => Logger

export const LoggerFactory: LoggerFactory = () => ({
  bus: [] as string[],
  h1(message: string) {
    this.bus.push(chalk.bold.underline(message))
  },
  h2(message: string) {
    this.bus.push(chalk.underline(message))
  },
  h3(message: string) {
    this.bus.push(chalk.bold(message))
  },
  p(message: string) {
    this.bus.push(chalk(message))
  },
  error(message: string) {
    this.bus.push(chalk(message))
  },
  options: {},
  init({ options }: LoggerInit) {
    Object.assign(this.options, options)
  },
})

export const logger = LoggerFactory()
