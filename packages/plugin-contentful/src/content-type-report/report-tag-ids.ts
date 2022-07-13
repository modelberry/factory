import chalk from 'chalk'
import { LocalSourceContentTypeYield } from '../generators/local-source-content-type-generator/local-source-content-type-generator'
import { RemoteSourceContentTypeYield } from '../generators/remote-source-content-type-generator/remote-source-content-type-generator'
import { compareArrays } from '../lib/compare-arrays'
import { getAddRemoveColor } from '../lib/get-add-remove-color'
import { ReportEntry } from './report-entries'
import { reportTagValue } from './report-tag-value'

export interface ReportTagIds {
  /** Parent field */
  fieldId: string
  /** Parent report entry to add report to */
  fieldReportEntry: ReportEntry
  /** Local values to compare */
  localContentType?: LocalSourceContentTypeYield
  /** Remote values to compare */
  remoteContentType?: RemoteSourceContentTypeYield
  /** By default local changes are compared to remote changes, this option
   * reverses that */
  reverse?: boolean
}

export const reportTagIds = ({
  fieldId,
  fieldReportEntry,
  localContentType,
  remoteContentType,
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
    const tagColor = getAddRemoveColor({
      compared: comparedTagIds,
      item: tagId,
    })
    const tagKeyReportEntry: ReportEntry = {
      logLevel: 'tagKey',
      loggerType: 'p',
      subEntries: [],
      message: chalk[tagColor](tagId),
    }
    fieldReportEntry.subEntries.push(tagKeyReportEntry)

    // When the tagColor is black, compare the tag value
    if (tagColor === 'black') {
      reportTagValue({
        localField,
        remoteField,
        tagId,
        tagKeyReportEntry,
        reverse,
      })
    }
  })
}
