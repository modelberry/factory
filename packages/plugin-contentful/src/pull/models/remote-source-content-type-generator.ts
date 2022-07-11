import {
  firstUpperCase,
  Options,
  PropertyTree,
} from '@modelberry/mbfactory/plain'
import { Environment } from 'contentful-management/types'
import { fetchContentTypes } from './fetch-content-types'
import { fetchEditorInterfaces } from './fetch-editor-interfaces'
import { contentTypeToInlineTags } from './content-type-to-inline-tags'
import { contentTypeFieldsToPropertyTree } from './content-type-fields-to-property-tree'

export interface RemoteSourceContentTypeGenerator {
  contentfulEnvironment: Environment
  options: Options
  /** Empty object to save Contentful validations to */
  validations: Record<string, any>
}

export type RemoteSourceContentTypeYields = {
  contentTypeId: string
  inlineTags: Record<string, any>
  interfaceName: string
  namedImports: string[]
  propertyTree: PropertyTree
}

export type RemoteSourceContentTypeIterator = AsyncGenerator<
  RemoteSourceContentTypeYields,
  void,
  unknown
>

export async function* remoteSourceContentTypeGenerator({
  contentfulEnvironment,
  options,
  validations,
}: RemoteSourceContentTypeGenerator) {
  const remoteContentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })

  // Fetch all required data, then loop and yield an object for each contentType
  for (const remoteContentType of remoteContentTypes) {
    const remoteInlineTags = contentTypeToInlineTags({
      contentType: remoteContentType,
    })
    const remoteContentTypeId = remoteContentType.sys.id
    // Fetch editor interfaces from Contentful remote API
    const editorInterfaces = await fetchEditorInterfaces({
      contentType: remoteContentType,
    })
    // Empty array that gets filled with named imports
    const remoteNamedImports: string[] = []
    // Get propterty tree that defines all fields for the interface
    const remotePropertyTree = contentTypeFieldsToPropertyTree({
      contentTypeFields: remoteContentType.fields,
      editorInterfaces,
      namedImports: remoteNamedImports,
      validations,
    })
    const remoteInterfaceName =
      'Contentful' + firstUpperCase(remoteContentTypeId)
    yield {
      contentTypeId: remoteContentTypeId,
      inlineTags: remoteInlineTags,
      interfaceName: remoteInterfaceName,
      namedImports: remoteNamedImports,
      propertyTree: remotePropertyTree,
    }
  }
}
