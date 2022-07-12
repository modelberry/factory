import chalk from 'chalk'
import { LocalField, RemoteField, ReportEntry } from './report-entries'

export interface ReportTagIds {
  localField: LocalField
  remoteField: RemoteField
  tagId: string
  tagKeyReportEntry: ReportEntry
}

export const reportTagValue = ({
  localField,
  remoteField,
  tagId,
  tagKeyReportEntry,
}: ReportTagIds) => {
  // Get local tag value
  let localTagValue: string | boolean | undefined =
    localField?.tags?.[tagId] || 'none'
  // Get remote tag value
  const remoteTagValue = remoteField?.node?.inlineTags?.[tagId]
  // When a local tag that represents a boolean value is present,
  // the value is always handled as a true value.
  if (typeof remoteTagValue === 'boolean') localTagValue = true
  if (localTagValue !== remoteTagValue) {
    const tagValueReportEntry: ReportEntry = {
      logLevel: 'tagValue',
      loggerType: 'p',
      subEntries: [],
      message: chalk.red(remoteTagValue) + ' => ' + chalk.green(localTagValue),
    }
    tagKeyReportEntry.subEntries.push(tagValueReportEntry)
  }
}
