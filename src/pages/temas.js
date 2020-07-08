import React from "react"
import Image from "gatsby-image"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TransitionLink from "../components/transitionLink"

const Temas = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Lista de temas" />
      {posts.map(({ node }) => {
        const titulo = node.frontmatter.titulo || node.fields.slug
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
              <header>
                <h3
                  style={{
                    marginBottom: "0.25rem",
                  }}
                >
                  {titulo}
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
                    __html: node.frontmatter.descripcion || node.excerpt,
                  }}
                />
              </section>
            </TransitionLink>
          </article>
        )
      })}
    </Layout>
  )
}

export default Temas

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
            titulo
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
