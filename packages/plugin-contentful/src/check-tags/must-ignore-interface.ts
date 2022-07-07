import { Options } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'

export interface MustIgnoreInterface {
  options: Options
  interfaceTags: Record<string, string>
}

export const mustIgnoreInterface = ({
  options,
  interfaceTags,
}: MustIgnoreInterface) => {
  const interfaceTypeTag = interfaceTags['@type']
  const log = console.log
  // Check if a filter is used, ignore if it does not pass filter
  if (options.type && options.type !== interfaceTypeTag) {
    log(chalk(`- skipping because does not match filter`))
    return true
  }

  if ('@ignore' in interfaceTags) {
    log(chalk(`- skipping because @ignore`))
    return true
  }
  if (!interfaceTypeTag) {
    log(chalk.red(`- skipping because no @type inline tag`))
    return true
  }
  return false
}
