import { logger, Options } from '@modelberry/mbfactory'

export interface IsValidInterface {
  options: Options
  interfaceTags: Record<string, string>
}

export const isValidInterface = ({
  options,
  interfaceTags,
}: IsValidInterface) => {
  const interfaceTypeTag = interfaceTags['@type']
  // Check if a filter is used, ignore if it does not pass filter
  if (options.filter && options.filter !== interfaceTypeTag) {
    logger.p(`- skipping because does not match filter`)
    return true
  }

  if ('@ignore' in interfaceTags) {
    logger.p(`- skipping because @ignore`)
    return true
  }
  if (!interfaceTypeTag) {
    logger.error(`- skipping because no @type inline tag`)
    return true
  }
  return false
}
