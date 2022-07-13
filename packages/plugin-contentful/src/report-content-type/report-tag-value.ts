import { LocalField, RemoteField, ReportEntry } from './report-entries'
import { sortValidationsString } from './sort-validations-string'

export interface ReportTagValue {
  /** Local parent field */
  localField: LocalField
  /** Remote parent field */
  remoteField: RemoteField
  /** Tag id for the value */
  tagId: string
  /** Parent report entry to add report to */
  parentReportEntry: ReportEntry
  /** By default local changes are compared to remote changes, this option
   * reverses that */
  reverse?: boolean
}

export const reportTagValue = ({
  localField,
  remoteField,
  tagId,
  parentReportEntry,
  reverse,
}: ReportTagValue) => {
  // Get local tag value
  let localTagValue = localField?.tags?.[tagId] || 'none'
  // Get remote tag value
  let remoteTagValue = remoteField?.node?.inlineTags?.[tagId] || 'nond'
  if (tagId === '@validations' || tagId === '@itemsValidations') {
    localTagValue = sortValidationsString(localTagValue)
    remoteTagValue = sortValidationsString(remoteTagValue)
  }
  let message
  if (parentReportEntry.state === 'add')
    message = reverse ? remoteTagValue : localTagValue
  if (parentReportEntry.state === 'remove')
    message = reverse ? localTagValue : remoteTagValue
  if (parentReportEntry.state === 'equal') message = localTagValue
  const tagValueReportEntry: ReportEntry = {
    state: parentReportEntry.state,
    logLevel: 'tagValue',
    loggerType: 'p',
    subEntries: [],
    message,
  }
  if (parentReportEntry.state === 'equal' && localTagValue !== remoteTagValue) {
    delete tagValueReportEntry.message
    tagValueReportEntry.state = 'modified'
    tagValueReportEntry.modification = {
      before: reverse ? localTagValue : remoteTagValue,
      after: reverse ? remoteTagValue : localTagValue,
    }
  }
  parentReportEntry.subEntries.push(tagValueReportEntry)
}
