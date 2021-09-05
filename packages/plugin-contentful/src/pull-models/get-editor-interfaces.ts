import { ContentType } from 'contentful-management/types'
import { copyKeysIfExists } from './copy-keys-if-exists'

export interface GetEditorInterfaces {
  contentType: ContentType
}

export const getEditorInterfaces = async ({
  contentType,
}: GetEditorInterfaces) => {
  const editorInterfaceResponse = await contentType.getEditorInterface()
  let editorInterfaces: Record<string, any> = {}
  if (editorInterfaceResponse.controls) {
    editorInterfaces = editorInterfaceResponse.controls.reduce(
      (result: Record<string, any>, control) => {
        result[control.fieldId] = {}
        copyKeysIfExists({
          keys: ['widgetId', 'widgetNamespace'],
          source: control,
          target: result[control.fieldId],
        })
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
