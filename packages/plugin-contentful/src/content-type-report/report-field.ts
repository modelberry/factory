import chalk from 'chalk'
import { LocalSourceContentTypeYield } from '../generators/local-source-content-type-generator/local-source-content-type-generator'
import { RemoteSourceContentTypeYield } from '../generators/remote-source-content-type-generator/remote-source-content-type-generator'
import { compareArrays } from '../lib/compare-arrays'
import { getAddRemoveColor } from '../lib/get-add-remove-color'
import { ReportEntry } from './report-entries'
import { reportTagIds } from './report-tag-ids'

export interface ReportField {
  /** Parent content type id */
  contentTypeId: string
  /** Parent report entry to add report to */
  contentTypeReportEntry: ReportEntry
  /** Local values to compare */
  localContentTypes: LocalSourceContentTypeYield[]
  /** Remote values to compare */
  remoteContentTypes: RemoteSourceContentTypeYield[]
  /** By default local changes are compared to remote changes, this option
   * reverses that */
  reverse?: boolean
}

export const reportField = ({
  contentTypeId,
  contentTypeReportEntry,
  localContentTypes,
  remoteContentTypes,
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
    const fieldColor = getAddRemoveColor({
      compared: comparedFieldIds,
      item: fieldId,
    })
    const fieldReportEntry: ReportEntry = {
      logLevel: 'field',
      loggerType: 'p',
      subEntries: [],
      message: chalk[fieldColor](fieldId),
    }
    contentTypeReportEntry.subEntries.push(fieldReportEntry)

    // When the fieldColor is black, compare the tags
    if (fieldColor === 'black') {
      reportTagIds({
        fieldId,
        fieldReportEntry,
        localContentType,
        remoteContentType,
        reverse,
      })
    }
  })
}
