import chalk from 'chalk'
import { logger } from './logger'

const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

describe('Logger should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('log h1', async () => {
    logger.h1('My message')
    expect(consoleSpy).toHaveBeenCalledWith(chalk.bold.underline('My message'))
  })
  test('log h2', async () => {
    logger.h2('My message')
    expect(consoleSpy).toHaveBeenCalledWith(chalk.bold('My message'))
  })
  test('log h3', async () => {
    logger.h3('My message')
    expect(consoleSpy).toHaveBeenCalledWith(chalk.underline('My message'))
  })
  test('log p', async () => {
    logger.p('My message')
    expect(consoleSpy).toHaveBeenCalledWith('My message')
  })
  test('log info', async () => {
    logger.info('My message')
    expect(consoleSpy).toHaveBeenCalledWith(chalk.blue('My message'))
  })
  test('log warning', async () => {
    logger.warning('My message')
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('My message'))
  })
  test('log error', async () => {
    logger.error('My message')
    expect(consoleSpy).toHaveBeenCalledWith(chalk.red('My message'))
  })
  test('do not log when muted', async () => {
    logger.mute = true
    logger.p('My message')
    expect(consoleSpy).toHaveBeenCalledTimes(0)
    logger.mute = false
    logger.p('My second message')
    expect(consoleSpy).toHaveBeenCalledWith('My second message')
  })
})
