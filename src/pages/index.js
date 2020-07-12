import React from "react"
import Image from "gatsby-image"
import Masonry from "react-masonry-css"
import styled from "@emotion/styled"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TransitionLink from "../components/transitionLink"

const MasonryContainer = styled.div`
  width: 100%;
  .custom-masonry-grid {
    display: flex;
    margin-left: 0px; /* gutter size offset */
    width: auto;
  }
  .custom-masonry-grid_column {
    background-clip: padding-box;
    height: 100%;
    padding-left: 0px; /* gutter size */
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

const ImageContainer = styled.div`
  height: auto;
  min-width: 300px;
  max-width: calc(100vw / 5);
  width: auto;
  @media (max-width: 1600px) {
    max-width: calc(100vw / 4);
  }
  @media (max-width: 1200px) {
    max-width: calc(100vw / 3);
  }
  @media (max-width: 900px) {
    max-width: calc(100vw / 2);
  }
  @media (max-width: 600px) {
    max-width: 100vw;
  }
`

const Inicio = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const temas = data.allMarkdownRemark.edges

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
            1600: 4,
            1200: 3,
            900: 2,
            600: 1,
          }}
          className="custom-masonry-grid"
          columnClassName="custom-masonry-grid_column"
        >
          {temas.map(({ node }) => {
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
                  color_transicion={
                    transicion === "cubrir" ? "#000" : color_transicion
                  }
                  direccion_transicion={direccion_transicion}
                  duracion_transicion={duracion_transicion}
                  tapar_transicion={tapar_transicion}
                  transicion={transicion}
                  to={node.fields.slug}
                >
                  {imagen && (
                    <ImageContainer>
                      <Image fluid={imagen.childImageSharp.fluid} />
                    </ImageContainer>
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
    file(name: { eq: "tarjeta" }, sourceInstanceName: { eq: "assets" }) {
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
                fluid(maxWidth: 400) {
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
