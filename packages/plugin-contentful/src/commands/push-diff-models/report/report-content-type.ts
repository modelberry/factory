import chalk from 'chalk'
import { LocalSourceContentTypeYield } from '../../../generators/local-source-content-type-generator/local-source-content-type-generator'
import { RemoteSourceContentTypeYield } from '../../../generators/remote-source-content-type-generator/remote-source-content-type-generator'
import { compareArrays } from '../../../lib/compare-arrays'
import { getAddRemoveColor } from '../../../lib/get-add-remove-color'
import { ReportEntry } from './report-entries'
import { reportField } from './report-field'

export interface ReportContentType {
  localContentTypes: LocalSourceContentTypeYield[]
  remoteContentTypes: RemoteSourceContentTypeYield[]
}

export const reportContentType = ({
  localContentTypes,
  remoteContentTypes,
}: ReportContentType) => {
  const reportEntries: ReportEntry[] = []
  const localContentTypeIds = localContentTypes.map((i) => i.interfaceTypeTag)
  const remoteContentTypeIds = remoteContentTypes.map((i) => i.contentTypeId)
  const comparedContentTypeIds = compareArrays(
    localContentTypeIds,
    remoteContentTypeIds
  )

  comparedContentTypeIds.union.forEach((contentTypeId) => {
    const contentTypeColor = getAddRemoveColor({
      compared: comparedContentTypeIds,
      item: contentTypeId,
    })
    const contentTypeReportEntry: ReportEntry = {
      logLevel: 'contentType',
      loggerType: 'h2',
      subEntries: [],
      message: chalk[contentTypeColor](contentTypeId),
    }
    reportEntries.push(contentTypeReportEntry)
    // When the contentTypeColor is black, compare the fields
    if (contentTypeColor === 'black') {
      reportField({
        contentTypeId,
        contentTypeReportEntry,
        localContentTypes,
        remoteContentTypes,
      })
    }
  })
  return reportEntries
}
