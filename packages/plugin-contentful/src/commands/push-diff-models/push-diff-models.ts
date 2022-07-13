import { Environment } from 'contentful-management/types'
import { logger, Options, TypeData } from '@modelberry/mbfactory/plain'
import { remoteSourceContentTypeGenerator } from '../../generators/remote-source-content-type-generator/remote-source-content-type-generator'
import { asyncIteratorToArray } from '../../lib/async-iterator-to-array'
import { ValidationsMap } from '../../handler/get-modelberry-plugin-data'
import { localSourceContentTypeGenerator } from '../../generators/local-source-content-type-generator/local-source-content-type-generator'
import { reportContentType } from '../../report-content-type/report-content-type'
import { printContentTypeReport } from '../../report-content-type/print-content-type-report'

export interface PushDiffModels {
  contentfulEnvironment: Environment
  options: Options
  typeData: TypeData
  validationsMap: ValidationsMap
}
export const pushDiffModels = async ({
  contentfulEnvironment,
  options,
  typeData,
}: PushDiffModels) => {
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
  })

  // Print report
  printContentTypeReport({
    heading: 'Contentful models will change',
    report,
  })

  logger.h2(
    '\nNOTE: This feature is experimental and still under development\n'
  )
}
