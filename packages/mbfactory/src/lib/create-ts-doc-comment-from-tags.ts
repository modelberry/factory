export type InlineTags = {
  [tagName: string]: string
}

export interface CreateTsDocCommentFromTags {
  inlineTags: InlineTags
  blockTag: string
}

export const createTsDocCommentFromTags = ({
  blockTag,
  inlineTags,
}: CreateTsDocCommentFromTags) => {
  let comment = ``
  comment += `${blockTag}\n`
  for (const inlineTag in inlineTags) {
    comment += `* - {${inlineTag} ${inlineTags[inlineTag]}}\n`
  }
  return comment
}
