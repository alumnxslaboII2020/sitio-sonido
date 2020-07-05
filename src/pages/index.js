import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Image from "gatsby-image"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "@emotion/styled"

const ContenedorDeImagenes = styled.div`
  display: flex;
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Inicio" />
      <ContenedorDeImagenes>
        {posts.map(({ node }) => {
          const { imagen } = node.frontmatter
          return (
            <article key={node.fields.slug}>
              <AniLink
                hex="#000000"
                paintDrip
                style={{ boxShadow: `none` }}
                to={node.fields.slug}
              >
                {imagen && (
                  <div
                    style={{
                      height: imagen.childImageSharp.fluid.presentationHeight,
                      width: imagen.childImageSharp.fluid.presentationWidth,
                    }}
                  >
                    <Image fluid={imagen.childImageSharp.fluid} />
                  </div>
                )}
              </AniLink>
            </article>
          )
        })}
      </ContenedorDeImagenes>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___order], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            imagen {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_tracedSVG
                  presentationHeight
                  presentationWidth
                }
              }
            }
            description
          }
        }
      }
    }
  }
`
