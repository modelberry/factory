/**
 * Something about this model, used as model description
 * @modelberry
 * - {@plugin "@modelberry/plugin-contentful/plain"}
 * - {@type topic}
 * @see https://www.modelberry.com
 */
export interface Topic {
  /**
   * Some text here that we do nothing with
   * @modelberry
   *   {@helpText The topic heading}
   *   {@localized}
   *   {@name Heading}
   *   {@required}
   *   {@type Array}
   *   {@linkType Symbol}
   *   {@itemsType Link}
   *   {@itemsLinkType Entry}
   *   {@validations unique}
   *   {@widget singleLine}
   * @defaultValue Default heading
   *
   */
  heading: string
  /**
   * This is the abstract
   */
  abstract: string
  /**
   * This is the variant
   */
  variant: any
}
