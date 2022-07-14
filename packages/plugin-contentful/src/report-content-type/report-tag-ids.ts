import { LocalSourceContentTypeYield } from '../generators/local-source-content-type-generator/local-source-content-type-generator'
import { RemoteSourceContentTypeYield } from '../generators/remote-source-content-type-generator/remote-source-content-type-generator'
import { ValidationsMap } from '../handler/get-modelberry-plugin-data'
import { compareArrays } from '../lib/compare-arrays'
import { getReportEntryState } from './get-report-entry-state'
import { ReportEntry } from './report-entries'
import { reportTagValue } from './report-tag-value'

export interface ReportTagIds {
  /** Parent field */
  fieldId: string
  /** Parent report entry to add report to */
  parentReportEntry: ReportEntry
  /** Local values to compare */
  localContentType?: LocalSourceContentTypeYield
  /** Remote values to compare */
  remoteContentType?: RemoteSourceContentTypeYield
  /** Local validations */
  localValidationsMap: ValidationsMap
  /** Remote validations */
  remoteValidationsMap: ValidationsMap
  /** By default local changes are compared to remote changes, this option
   * reverses that */
  reverse?: boolean
}

export const reportTagIds = ({
  fieldId,
  parentReportEntry,
  localContentType,
  remoteContentType,
  localValidationsMap,
  remoteValidationsMap,
  reverse,
}: ReportTagIds) => {
  // Get local field and tags
  const localField = localContentType?.fields?.[fieldId] || {}
  const localTagIds = Object.keys(localField?.tags || {})
  // Get remote field and tags
  const remoteField = remoteContentType?.propertyTree[fieldId] || {}
  const remoteTagIds = Object.keys(remoteField?.node?.inlineTags || {})
  const comparedTagIds = compareArrays({
    a: localTagIds,
    b: remoteTagIds,
    reverse,
  })

  comparedTagIds.union.forEach((tagId) => {
    const state = getReportEntryState({
      compared: comparedTagIds,
      item: tagId,
    })
    const tagKeyReportEntry: ReportEntry = {
      state,
      logLevel: 'tagKey',
      loggerType: 'p',
      subEntries: [],
      message: tagId,
    }
    parentReportEntry.subEntries.push(tagKeyReportEntry)
    reportTagValue({
      localField,
      remoteField,
      localValidationsMap,
      remoteValidationsMap,
      tagId,
      parentReportEntry: tagKeyReportEntry,
      reverse,
    })
  })
}
