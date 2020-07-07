import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Image from "gatsby-image"
// import Masonry from "react-masonry-component"
import Masonry from "react-masonry-css"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"

const MasonryContainer = styled.div`
  .custom-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: 0px; /* gutter size offset */
    width: auto;
  }
  .custom-masonry-grid_column {
    padding-left: 0px; /* gutter size */
    background-clip: padding-box;
  }
`

const Inicio = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Inicio" />
      <MasonryContainer>
        <Masonry
          breakpointCols={{
            default: 5,
            [360 * 5]: 4,
            [360 * 4]: 3,
            [360 * 3]: 2,
            [360 * 2]: 1,
          }}
          className="custom-masonry-grid"
          columnClassName="custom-masonry-grid_column"
        >
          {posts.map(({ node }) => {
            const { imagen } = node.frontmatter
            return (
              <article key={node.fields.slug}>
                <AniLink hex="#000000" paintDrip to={node.fields.slug}>
                  {imagen && (
                    <div
                      style={{
                        height: imagen.childImageSharp.fluid.presentationHeight,
                        width: 360,
                      }}
                    >
                      <Image fluid={imagen.childImageSharp.fluid} />
                    </div>
                  )}
                </AniLink>
              </article>
            )
          })}
        </Masonry>
      </MasonryContainer>
    </Layout>
  )
}

export default Inicio

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___orden], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            imagen {
              childImageSharp {
                fluid(maxWidth: 360) {
                  ...GatsbyImageSharpFluid_tracedSVG
                  presentationHeight
                  presentationWidth
                }
              }
            }
          }
        }
      }
    }
  }
`
