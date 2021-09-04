import {
  ContentFields,
  ContentType,
  Environment,
} from 'contentful-management/types'
import { confirmOmitted } from './confirm-omitted'
import { getMergedFields } from './get-merged-fields'
import { getOmittedFields } from './get-omitted-fields'

export interface PushFieldsToContentful {
  contentfulEnvironment: Environment
  contentTypeData: ContentType
  forceOption?: boolean
  interfaceTypeTag: string
}

export const pushFieldsToContentful = async ({
  contentfulEnvironment,
  contentTypeData,
  forceOption,
  interfaceTypeTag,
}: PushFieldsToContentful) => {
  let contentType: ContentType
  try {
    // Fetch existing content type
    contentType = await contentfulEnvironment.getContentType(interfaceTypeTag)
    const omittedFields = getOmittedFields({
      existingfields: contentType.fields,
      newFields: contentTypeData.fields,
    })
    if (omittedFields.length && !forceOption) {
      const confirmed = await confirmOmitted({ fields: omittedFields })
      if (!confirmed) return
    }
    // Merge new fields with existing fields and mark missing fields as omitted
    contentType.fields = getMergedFields({
      existingfields: contentType.fields,
      newFields: contentTypeData.fields,
    }) as ContentFields[]
    contentType.name = contentTypeData.name
    contentType.description = contentTypeData.description
    contentType.displayField = contentTypeData.displayField

    // Update and set omitted fields on remote
    contentType = await contentType.update()
    contentType = await contentType.publish()
    // Remove omitted fields locally
    contentType.fields = contentType.fields.filter((field) => !field.omitted)
    // Remove omitted fields on remote
    contentType = await contentType.update()
  } catch (contentfulError: any) {
    let errorData
    // We expect a 404, throw other errors if they occur
    try {
      errorData = JSON.parse(contentfulError.message)
      if (errorData.status !== 404) throw contentfulError
    } catch (jsonError: any) {
      throw contentfulError
    }
    // Create a new content type
    contentType = await contentfulEnvironment.createContentTypeWithId(
      interfaceTypeTag,
      contentTypeData
    )
  }
  contentType = await contentType.publish()
  return contentType
}
