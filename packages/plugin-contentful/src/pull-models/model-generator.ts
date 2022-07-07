import { firstUpperCase } from '@modelberry/mbfactory/plain'
import { ContentType } from 'contentful-management/types'
import { contentTypeFieldsToPropertyTree } from '../lib/content-type-fields-to-property-tree'
import { contentTypeToInlineTags } from '../lib/content-type-to-inline-tags'
import { fetchEditorInterfaces } from '../lib/fetch-editor-interfaces'

export interface EntryGenerator {
  /** Content types to generate source file for */
  contentTypes: ContentType[]
  /** Empty object to save Contentful validations to */
  validations: Record<string, any>
}

export async function* modelGenerator({
  contentTypes,
  validations,
}: EntryGenerator) {
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
