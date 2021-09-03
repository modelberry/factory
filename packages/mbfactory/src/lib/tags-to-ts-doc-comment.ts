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
    comment += `* - {${inlineTag} ${inlineTags[inlineTag]}}\n`
  }
  return comment
}
