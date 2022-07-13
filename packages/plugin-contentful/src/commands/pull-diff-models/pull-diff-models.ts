import { Environment } from 'contentful-management/types'
import { logger, Options, TypeData } from '@modelberry/mbfactory/plain'
import { ValidationsMap } from '../../handler/get-modelberry-plugin-data'
import { remoteSourceContentTypeGenerator } from '../../generators/remote-source-content-type-generator/remote-source-content-type-generator'
import { localSourceContentTypeGenerator } from '../../generators/local-source-content-type-generator/local-source-content-type-generator'
import { asyncIteratorToArray } from '../../lib/async-iterator-to-array'
import { reportContentType } from '../../content-type-report/report-content-type'
import { printContentTypeReport } from '../../content-type-report/print-content-type-report'

export interface PullDiffModels {
  contentfulEnvironment: Environment
  options: Options
  typeData: TypeData
  validationsMap: ValidationsMap
}

export const pullDiffModels = async ({
  contentfulEnvironment,
  options,
  typeData,
}: PullDiffModels) => {
  // Empty object that gets filled with validations
  const validations: Record<string, any> = {}

  // Initialize local and remote iterators
  const remoteSourceContentTypeIterator = remoteSourceContentTypeGenerator({
    contentfulEnvironment,
    options,
    validations,
  })
  const localContentTypeIterator = localSourceContentTypeGenerator({
    options,
    typeData,
  })

  // Mute logging when fetching remote and local content types
  logger.mute = true
  const remoteContentTypes = await asyncIteratorToArray(
    remoteSourceContentTypeIterator
  )
  const localContentTypes = Array.from(localContentTypeIterator)
  logger.mute = false

  // Generate report
  const report = reportContentType({
    localContentTypes,
    remoteContentTypes,
    reverse: true,
  })

  // Print report
  printContentTypeReport({
    heading: 'How models will change in local source files',
    report,
  })

  logger.h2(
    '\nNOTE: This feature is experimental and still under development\n'
  )
}
