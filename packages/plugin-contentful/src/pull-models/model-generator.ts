import { firstUpperCase, Options } from '@modelberry/mbfactory/plain'
import { Environment } from 'contentful-management/types'
import { contentTypeFieldsToPropertyTree } from '../lib/content-type-fields-to-property-tree'
import { contentTypeToInlineTags } from '../lib/content-type-to-inline-tags'
import { fetchContentTypes } from '../lib/fetch-content-types'
import { fetchEditorInterfaces } from '../lib/fetch-editor-interfaces'

export interface EntryGenerator {
  contentfulEnvironment: Environment
  options: Options
  /** Empty object to save Contentful validations to */
  validations: Record<string, any>
}

export async function* modelGenerator({
  contentfulEnvironment,
  options,
  validations,
}: EntryGenerator) {
  const contentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })

  for (const contentType of contentTypes) {
    const inlineTags = contentTypeToInlineTags({ contentType })
    const contentTypeId = contentType.sys.id
    // Fetch editor interfaces from Contentful remote API
    const editorInterfaces = await fetchEditorInterfaces({ contentType })
    // Empty array that gets filled with named imports
    const namedImports: string[] = []
    // Get propterty tree that defines all fields for the interface
    const propertyTree = contentTypeFieldsToPropertyTree({
      contentTypeFields: contentType.fields,
      editorInterfaces,
      namedImports,
      validations,
    })
    const interfaceName = 'Contentful' + firstUpperCase(contentTypeId)
    yield {
      contentTypeId,
      inlineTags,
      interfaceName,
      namedImports,
      propertyTree,
    }
  }
}
