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
  const localTagValue = localField?.tags?.[tagId] || 'none'
  // Get remote tag value
  const remoteTagValue = remoteField?.node?.inlineTags?.[tagId]
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
