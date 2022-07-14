import { ValidationsMap } from '../handler/get-modelberry-plugin-data'
import { LocalField, RemoteField, ReportEntry } from './report-entries'
import { getValidationReportEntries } from './get-validation-diff'

export interface ReportTagValue {
  /** Local parent field */
  localField: LocalField
  /** Remote parent field */
  remoteField: RemoteField
  /** Tag id for the value */
  tagId: string
  /** Parent report entry to add report to */
  parentReportEntry: ReportEntry
  /** Local validations */
  localValidationsMap: ValidationsMap
  /** Remote validations */
  remoteValidationsMap: ValidationsMap
  /** By default local changes are compared to remote changes, this option
   * reverses that */
  reverse?: boolean
}

export const reportTagValue = ({
  localField,
  remoteField,
  tagId,
  parentReportEntry,
  localValidationsMap,
  remoteValidationsMap,
  reverse,
}: ReportTagValue) => {
  // Get local tag value
  const localTagValue = localField?.tags?.[tagId] || 'none'
  // Get remote tag value
  const remoteTagValue = remoteField?.node?.inlineTags?.[tagId] || 'none'
  const isValidationTag =
    tagId === '@validations' || tagId === '@itemsValidations'

  if (parentReportEntry.state === 'equal' && isValidationTag) {
    // Validation tags need to be compared by using the validation maps
    const tagValueReportEntries = getValidationReportEntries({
      localValidationsMap,
      remoteValidationsMap,
      localTagValue,
      remoteTagValue,
      reverse,
    })
    parentReportEntry.subEntries.push(...tagValueReportEntries)
  } else {
    // Process tags other than validation tags
    let message
    let modification
    let state = parentReportEntry.state
    if (parentReportEntry.state === 'add')
      message = reverse ? remoteTagValue : localTagValue
    if (parentReportEntry.state === 'remove')
      message = reverse ? localTagValue : remoteTagValue
    if (parentReportEntry.state === 'equal') {
      if (localTagValue !== remoteTagValue) {
        state = 'modified'
        modification = {
          before: reverse ? localTagValue : remoteTagValue,
          after: reverse ? remoteTagValue : localTagValue,
        }
      } else {
        message = localTagValue
      }
    }
    const tagValueReportEntry: ReportEntry = {
      state,
      logLevel: 'tagValue',
      loggerType: 'p',
      subEntries: [],
    }
    if (message) tagValueReportEntry.message = message
    if (modification) tagValueReportEntry.modification = modification
    parentReportEntry.subEntries.push(tagValueReportEntry)
  }
}
