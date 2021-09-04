export type InlineTags = {
  [tagName: string]: string
}

export interface TagsToTsDocComment {
  inlineTags: InlineTags
  blockTag: string
}

export const tagsToTsDocComment = ({
  blockTag,
  inlineTags,
}: TagsToTsDocComment) => {
  let comment = ``
  comment += `${blockTag}\n`
  for (const inlineTag in inlineTags) {
    // Remove __xx postfix so that we can add multiple tags with the same key
    const splitted = inlineTag.split('__')
    const tagName = splitted[0]
    comment += `* - {${tagName} ${inlineTags[inlineTag]}}\n`
  }
  return comment
}
