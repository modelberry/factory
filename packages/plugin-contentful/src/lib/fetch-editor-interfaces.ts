import { ContentType } from 'contentful-management/types'
import { copyKeysIfExists } from './copy-keys-if-exists'

export type EditorInterfaceTag = 'widgetId' | 'widgetNamespace' | 'helpText'
export type EditorInterfaceTags = Partial<Record<EditorInterfaceTag, any>>

export interface FetchEditorInterfaces {
  contentType: ContentType
}

/**
 * Fetch editor interfaces from Contentful remote API and return them as
 * EditorInterfaceTags
 */
export const fetchEditorInterfaces = async ({
  contentType,
}: FetchEditorInterfaces) => {
  const editorInterfaceResponse = await contentType.getEditorInterface()
  let editorInterfaces: EditorInterfaceTags = {}
  if (editorInterfaceResponse.controls) {
    editorInterfaces = editorInterfaceResponse.controls.reduce(
      (result: Record<string, any>, control) => {
        result[control.fieldId] = {}
        copyKeysIfExists({
          keys: ['widgetId', 'widgetNamespace'],
          source: control,
          target: result[control.fieldId],
        })
        // Remove default widgetNamespace 'builtin'
        if (result[control.fieldId]['widgetNamespace'] === 'builtin')
          delete result[control.fieldId]['widgetNamespace']
        copyKeysIfExists({
          keys: ['helpText'],
          source: control.settings,
          target: result[control.fieldId],
        })

        return result
      },
      {}
    )
  }
  return editorInterfaces
}
