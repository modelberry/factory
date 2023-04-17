export type TagOption = 'field' | 'interface' | 'system'

export type AllTags = {
  [tagName: string]: Partial<Record<TagOption, boolean>>
}

export const allTags: AllTags = {
  '@description': {
    field: true,
    interface: true,
  },
  '@disabled': {
    field: true,
  },
  '@displayField': {
    interface: true,
  },
  '@ignore': {
    field: true,
  },
  '@helpText': {
    field: true,
  },
  '@itemsType': {
    field: true,
  },
  '@itemsLinkType': {
    field: true,
  },
  '@itemsValidations': {
    field: true,
  },
  '@linkType': {
    field: true,
  },
  '@locale': {
    field: true,
    interface: true,
  },
  '@localized': {
    field: true,
    interface: true,
  },
  '@name': {
    field: true,
    interface: true,
  },
  '@omitted': {
    field: true,
  },
  '@plugin': {
    interface: true,
    system: true,
  },
  '@required': {
    field: true,
  },
  '@type': {
    field: true,
    interface: true,
    system: true,
  },
  '@validations': {
    field: true,
  },
  '@widgetId': {
    field: true,
  },
  '@widgetNamespace': {
    field: true,
  },
}
