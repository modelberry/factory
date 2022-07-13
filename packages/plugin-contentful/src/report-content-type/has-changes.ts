import { ReportEntry } from './report-entries'

export interface HasChanges {
  reportEntry: ReportEntry
}

// Check the report for differences
export const hasChanges = ({ reportEntry }: HasChanges): boolean => {
  if (reportEntry.state !== 'equal') return true
  for (const subEntry of reportEntry.subEntries) {
    const subResult = hasChanges({ reportEntry: subEntry })
    // If a differnce is found, break the loop and return, otherwise continue
    // with the rest of the tree
    if (subResult) return true
  }
  return false
}
