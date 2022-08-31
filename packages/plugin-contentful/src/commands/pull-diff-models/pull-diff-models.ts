import { Environment } from 'contentful-management/types'
import { logger, Options, TypeData } from '@modelberry/mbfactory/plain'
import { ValidationsMap } from '../../handler/get-modelberry-plugin-data'
import { remoteSourceContentTypeGenerator } from '../../generators/remote-source-content-type-generator/remote-source-content-type-generator'
import { localSourceContentTypeGenerator } from '../../generators/local-source-content-type-generator/local-source-content-type-generator'
import { asyncIteratorToArray } from '../../lib/async-iterator-to-array'
import { reportContentType } from '../../report-content-type/report-content-type'
import { printContentTypeReport } from '../../report-content-type/print-content-type-report'

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
  validationsMap,
}: PullDiffModels) => {
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
    reverse: true,
  })

  // Print report
  printContentTypeReport({
    heading: 'Report for local source file models',
    report,
  })
}
