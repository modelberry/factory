import { Environment } from 'contentful-management/types'
import {
  ExitCodes,
  logger,
  Options,
  TypeData,
} from '@modelberry/mbfactory'
import { remoteSourceContentTypeGenerator } from '../../generators/remote-source-content-type-generator/remote-source-content-type-generator'
import { asyncIteratorToArray } from '../../lib/async-iterator-to-array'
import { ValidationsMap } from '../../handler/get-modelberry-plugin-data'
import { localSourceContentTypeGenerator } from '../../generators/local-source-content-type-generator/local-source-content-type-generator'
import { reportContentType } from '../../report-content-type/report-content-type'
import { printContentTypeReport } from '../../report-content-type/print-content-type-report'
import { reportHasChanges } from '../../report-content-type/report-has-changes'

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
  validationsMap,
}: PushDiffModels) => {
  // Empty object that gets filled with validations
  const remoteValidationsMap: Record<string, any> = {}

  // Initialize local and remote iterators
  const remoteSourceContentTypeIterator = remoteSourceContentTypeGenerator({
    contentfulEnvironment,
    options,
    validationsMap: remoteValidationsMap,
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
    localValidationsMap: validationsMap,
    remoteValidationsMap,
  })

  // Print report
  printContentTypeReport({
    heading: 'Report for remote Contentful models',
    report,
  })

  // Set exit code when diff is non equal for end to end testing
  if (reportHasChanges({ report })) {
    process.exitCode = ExitCodes.DiffNonEqual
  }

  logger.p('\n')
}
