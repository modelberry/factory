import { Global } from '@emotion/core'
import { graphql } from 'gatsby'
import React, { useState, Fragment } from 'react'
import { GlobalsProps } from './components/globals'
import { PageProps } from './components/page'
import { pageDebug } from './lib/debug'
import { Seo } from './lib/seo'
import { Sections } from './sections/sections'
import {
  PreviewUpdateButton,
  useFetchPreviewPage,
} from '@wheelroom/admin-page-preview'
import { globalReset } from './global/styles/global-reset'

// This is the main template used for all pages. Adding a section property here
// will add the property to all sections. Also, changing SEO options here, will
// do so for all pages.

const PageTemplate = (props: any) => {
  pageDebug('PageTemplate', props)

  // Page preview admin module
  const [previewPage, setPreviewPage] = useState()
  useFetchPreviewPage(setPreviewPage)
  const page: PageProps = previewPage || props.data.page

  if (!page.sections) {
    return 'No sections'
  }

  const globals: GlobalsProps = props.data.globals
  const keywords = globals.siteKeywords
  const locale = props.pageContext.locale
  const namedPaths = props.pageContext.namedPaths
  const siteMetadata: SiteMetadata = props.data.site.siteMetadata
  const siteVersion = siteMetadata.siteVersion
  const sections = page.sections

  const sectionProps = {
    locale,
    namedPaths,

    globals,
    page,
    siteMetadata,

    sections,
  }
  const seoProps = {
    description: page.seoDescription,
    imageSrc: page.seoImage && page.seoImage.fluid.src,
    keywords,
    locale,
    meta: [],
    siteAuthor: globals.siteAuthor,
    siteDescription: globals.siteDescription,
    siteHeading: globals.siteHeading,
    siteKeywords: globals.siteKeywords,
    siteVersion,
    title: page.seoTitle,
  }

  return (
    <Fragment>
      <Global styles={globalReset} />
      <Seo {...seoProps} />
      <Sections {...sectionProps} />
      <PreviewUpdateButton />
    </Fragment>
  )
}

export default PageTemplate

export const query = graphql`
  query($pageId: String, $globalsId: String) {
    site {
      siteMetadata {
        siteInfo
        siteVersion
        secrets {
          spaceId
          previewToken
          environment
        }
      }
    }
    page: contentfulPage(id: { eq: $pageId }) {
      ...Page
    }
    globals: contentfulGlobals(id: { eq: $globalsId }) {
      ...Globals
    }
  }
`

export interface SiteMetadata {
  siteInfo: string
  siteVersion: string
  secrets: {
    spaceId: string
    previewToken: string
    environment: string
  }
}
