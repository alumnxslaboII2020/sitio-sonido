import React from "react"
import Image from "gatsby-image"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Lista de temas" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const { imagen } = node.frontmatter
        return (
          <article key={node.fields.slug}>
            <AniLink
              hex="#000000"
              paintDrip
              style={{ boxShadow: `none` }}
              to={node.fields.slug}
            >
              <header>
                <h3
                  style={{
                    marginBottom: "0.25rem",
                  }}
                >
                  {title}
                </h3>
              </header>
              <section>
                {imagen && (
                  <div
                    style={{
                      height: 300,
                      width: 300,
                    }}
                  >
                    <Image fluid={imagen.childImageSharp.fluid} />
                  </div>
                )}
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </AniLink>
          </article>
        )
      })}
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
