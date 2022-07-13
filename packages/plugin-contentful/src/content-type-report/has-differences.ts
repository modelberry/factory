import { ReportEntry } from './report-entries'

export interface HasDifferences {
  reportEntry: ReportEntry
}

// Check the report for differences
export const hasDifferences = ({ reportEntry }: HasDifferences): boolean => {
  // When a tagValue is reported, the tree has differences
  if (reportEntry.subEntries.length === 0) {
    if (reportEntry.logLevel === 'contentType') {
      // Root level, entry was added or removed
      return true
    }
    if (reportEntry.logLevel === 'field') {
      // Field level, entry was added or removed
      return true
    }
    // On tagKey level, the tagValue tells a difference. A tagValue cannot have
    // subEntries
    if (reportEntry.logLevel === 'tagValue') {
      // TagValue level, the tag value changed
      return true
    }
  }

  for (const subEntry of reportEntry.subEntries) {
    const subResult = hasDifferences({ reportEntry: subEntry })
    // If a differnce is found, break the loop and return, otherwise continue
    // with the rest of the tree
    if (subResult) return true
  }
  return false
}
