import chalk from 'chalk'
import { LocalField, RemoteField, ReportEntry } from './report-entries'

export interface ReportTagValue {
  /** Local parent field */
  localField: LocalField
  /** Remote parent field */
  remoteField: RemoteField
  /** Tag id for the value */
  tagId: string
  /** Parent report entry to add report to */
  tagKeyReportEntry: ReportEntry
  /** By default local changes are compared to remote changes, this option
   * reverses that */
  reverse?: boolean
}

export const reportTagValue = ({
  localField,
  remoteField,
  tagId,
  tagKeyReportEntry,
  reverse,
}: ReportTagValue) => {
  // Get local tag value
  const localTagValue = localField?.tags?.[tagId] || 'none'
  // Get remote tag value
  const remoteTagValue = remoteField?.node?.inlineTags?.[tagId]
  const message = reverse
    ? chalk.red(localTagValue) + ' => ' + chalk.green(remoteTagValue)
    : chalk.red(remoteTagValue) + ' => ' + chalk.green(localTagValue)
  if (localTagValue !== remoteTagValue) {
    const tagValueReportEntry: ReportEntry = {
      logLevel: 'tagValue',
      loggerType: 'p',
      subEntries: [],
      message,
    }
    tagKeyReportEntry.subEntries.push(tagValueReportEntry)
  }
}
