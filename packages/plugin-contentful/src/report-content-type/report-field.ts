import { LocalSourceContentTypeYield } from '../generators/local-source-content-type-generator/local-source-content-type-generator'
import { RemoteSourceContentTypeYield } from '../generators/remote-source-content-type-generator/remote-source-content-type-generator'
import { ValidationsMap } from '../handler/get-modelberry-plugin-data'
import { compareArrays } from '../lib/compare-arrays'
import { getReportEntryState } from './get-report-entry-state'
import { ReportEntry } from './report-entries'
import { reportTagIds } from './report-tag-ids'

export interface ReportField {
  /** Parent content type id */
  contentTypeId: string
  /** Parent report entry to add report to */
  parentReportEntry: ReportEntry
  /** Local values to compare */
  localContentTypes: LocalSourceContentTypeYield[]
  /** Remote values to compare */
  remoteContentTypes: RemoteSourceContentTypeYield[]
  /** Local validations */
  localValidationsMap: ValidationsMap
  /** Remote validations */
  remoteValidationsMap: ValidationsMap
  /** By default local changes are compared to remote changes, this option
   * reverses that */
  reverse?: boolean
}

export const reportField = ({
  contentTypeId,
  parentReportEntry,
  localContentTypes,
  remoteContentTypes,
  localValidationsMap,
  remoteValidationsMap,
  reverse,
}: ReportField) => {
  // Get local type and fields
  const localContentType = localContentTypes.find(
    (type) => type.interfaceTypeTag === contentTypeId
  )
  const localFieldIds = Object.keys(localContentType?.fields || {})
  // Get remote type and fields
  const remoteContentType = remoteContentTypes.find(
    (type) => type.contentTypeId === contentTypeId
  )
  const remoteFieldIds = Object.keys(remoteContentType?.propertyTree || {})
  const comparedFieldIds = compareArrays({
    a: localFieldIds,
    b: remoteFieldIds,
    reverse,
  })
  comparedFieldIds.union.forEach((fieldId) => {
    const state = getReportEntryState({
      compared: comparedFieldIds,
      item: fieldId,
    })
    const fieldReportEntry: ReportEntry = {
      state,
      logLevel: 'field',
      loggerType: 'p',
      subEntries: [],
      message: fieldId,
    }
    parentReportEntry.subEntries.push(fieldReportEntry)
    reportTagIds({
      fieldId,
      parentReportEntry: fieldReportEntry,
      localContentType,
      remoteContentType,
      localValidationsMap,
      remoteValidationsMap,
      reverse,
    })
  })
}
