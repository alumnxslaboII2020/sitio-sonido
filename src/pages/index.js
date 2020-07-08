import React from "react"
import Image from "gatsby-image"
import Masonry from "react-masonry-css"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TransitionLink from "../components/transitionLink"

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

const Banner = styled.div`
  height: auto;
  width: 40%;
  @media (max-width: 768px) {
    width: 60%;
  }
  @media (max-width: 554px) {
    width: 80%;
  }
`

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Inicio = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Inicio" />
      {data.file && (
        <BannerContainer>
          <Banner>
            <Image
              alt={data.file.name}
              fluid={data.file.childImageSharp.fluid}
            />
          </Banner>
        </BannerContainer>
      )}
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
            const {
              imagen,
              color_transicion,
              direccion_transicion,
              duracion_transicion,
              tapar_transicion,
              transicion,
            } = node.frontmatter
            return (
              <article key={node.fields.slug}>
                <TransitionLink
                  color_transicion={color_transicion}
                  direccion_transicion={direccion_transicion}
                  duracion_transicion={duracion_transicion}
                  tapar_transicion={tapar_transicion}
                  transicion={transicion}
                  to={node.fields.slug}
                >
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
                </TransitionLink>
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
    file(name: { eq: "tarjetasd" }, sourceInstanceName: { eq: "assets" }) {
      name
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
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
            color_transicion
            direccion_transicion
            duracion_transicion
            tapar_transicion
            transicion
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
