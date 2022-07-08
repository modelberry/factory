export interface LocalContentTypeGenerator {}

export type LocalContentTypeIterator = AsyncGenerator<
  {
    contentTypeId: string
    varType: string
    varName: string
    contentArray: any[]
  },
  void,
  unknown
>

// Loop through content types from local source files and yield an object for
// each entry
export async function* localContentTypeGenerator({}: LocalContentTypeGenerator) {}
