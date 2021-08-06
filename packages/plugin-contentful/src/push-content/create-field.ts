export interface CreateField {
  itemsLinkType?: string
  itemsType?: string
  itemsValue?: string[]
  linkType?: string
  type: string
  value?: string
}

export interface CreateLocalizedField extends CreateField {
  localeCode: string
}

export type SysLink = {
  sys: {
    id: string
    linkType: string
    type: string
  }
}

export type FieldResponse = string | SysLink | SysLink[]
export type LocalizedFieldResponse = { [locale: string]: FieldResponse }

export const createLocalizedField = (
  args: CreateLocalizedField
): LocalizedFieldResponse => {
  const { localeCode, ...rest } = args
  return { [localeCode]: createField(rest) }
}

export const createField = ({
  itemsLinkType,
  itemsType,
  itemsValue,
  linkType,
  type,
  value,
}: CreateField): FieldResponse => {
  switch (type) {
    case 'Boolean':
    case 'Date':
    case 'Integer':
    case 'Symbol':
    case 'Text':
      return value!

    case 'Array':
      return itemsValue!.map(
        (id: string) =>
          createField({
            linkType: itemsLinkType,
            type: itemsType!,
            value: id,
          }) as SysLink
      )

    // case 'RichText':
    // TODO: return a document from mark down parser

    case 'Link':
      return {
        sys: {
          id: value!,
          linkType: linkType!,
          type,
        },
      }

    default:
      return `${type} is not implemented`
  }
}
