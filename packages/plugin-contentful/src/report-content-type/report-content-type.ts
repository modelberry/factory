import { LocalSourceContentTypeYield } from '../generators/local-source-content-type-generator/local-source-content-type-generator'
import { RemoteSourceContentTypeYield } from '../generators/remote-source-content-type-generator/remote-source-content-type-generator'
import { compareArrays } from '../lib/compare-arrays'
import { getReportEntryState } from './get-report-entry-state'
import { ReportEntry } from './report-entries'
import { reportField } from './report-field'

export interface ReportContentType {
  /** Local values to compare */
  localContentTypes: LocalSourceContentTypeYield[]
  /** Remote values to compare */
  remoteContentTypes: RemoteSourceContentTypeYield[]
  /** By default local changes are compared to remote changes, this option
   * reverses that */
  reverse?: boolean
}

export const reportContentType = ({
  localContentTypes,
  remoteContentTypes,
  reverse,
}: ReportContentType) => {
  const reportEntries: ReportEntry[] = []
  const localContentTypeIds = localContentTypes.map((i) => i.interfaceTypeTag)
  const remoteContentTypeIds = remoteContentTypes.map((i) => i.contentTypeId)
  const comparedContentTypeIds = compareArrays({
    a: localContentTypeIds,
    b: remoteContentTypeIds,
    reverse,
  })

  comparedContentTypeIds.union.forEach((contentTypeId) => {
    const state = getReportEntryState({
      compared: comparedContentTypeIds,
      item: contentTypeId,
    })
    const contentTypeReportEntry: ReportEntry = {
      state,
      logLevel: 'contentType',
      loggerType: 'h2',
      subEntries: [],
      message: contentTypeId,
    }
    reportEntries.push(contentTypeReportEntry)
    reportField({
      contentTypeId,
      parentReportEntry: contentTypeReportEntry,
      localContentTypes,
      remoteContentTypes,
      reverse,
    })
  })
  return reportEntries
}
