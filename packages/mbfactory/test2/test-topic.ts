/** @modelberry
 * - {@plugin "@modelberry/plugin-contentful/plain"}
 * - {@type testTopic}
 * - {@displayField heading}
 * - {@description Topic model, a heading, an abstract and a call to action}
 */
export interface ContentfulTestTopic {
  /** @modelberry
   * - {@name Abstract}
   * - {@type Symbol}
   * - {@widgetId singleLine}
   * - {@validations validationA}
   */
  abstract?: string
  /** @modelberry
   * - {@name Actions}
   * - {@type Array}
   * - {@itemsType Link}
   * - {@itemsLinkType Entry}
   * - {@itemsValidations validationB}
   * - {@widgetId entryLinksEditor}
   */
  actions?: string
  /** @modelberry
   * - {@name Heading}
   * - {@type Symbol}
   * - {@widgetId singleLine}
   */
  heading?: string
  /** @modelberry
   * - {@name Icon}
   * - {@type Symbol}
   * - {@widgetId singleLine}
   */
  icon?: string
  /** @modelberry
   * - {@name Media}
   * - {@type Array}
   * - {@itemsType Link}
   * - {@itemsLinkType Asset}
   * - {@widgetId assetLinksEditor}
   */
  media?: string
  /** @modelberry
   * - {@name Poster}
   * - {@type Link}
   * - {@linkType Asset}
   * - {@widgetId assetLinkEditor}
   */
  poster?: string
}
