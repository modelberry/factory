/**
 * Action model, used to render links and buttons
 * @modelberry
 * - {@plugin "@modelberry/plugin-contentful/plain"}
 * - {@displayField heading}
 * - {@type testAction}
 */
export interface ContentfulAction {
  sys?: {
    id: string
  }
  /**
   * @modelberry
   *   {@type Symbol}
   *   {@helpText Voorbeeld: mijn-anchor}
   */
  anchor?: string
  /**
   * @modelberry
   *   {@type Symbol}
   *   {@helpText Omschrijving van de actie, voor zoekmachines}
   */
  description?: string
  /** @modelberry {@type Symbol} */
  eventId?: string
  /** @modelberry {@type Symbol} */
  heading?: string
  /** @modelberry {@type Symbol} */
  query?: string
  /** @modelberry {@type Symbol} */
  url?: string
}

export const myActions: ContentfulAction[] = [
  {
    sys: {
      id: 'myContentActionId',
    },
    heading: 'Hello',
    anchor: 'anchor',
  },
]
