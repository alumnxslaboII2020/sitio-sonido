import React from "react"
import Image from "gatsby-image"
import styled from "@emotion/styled"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TransitionLink from "../components/transitionLink"

const Container = styled.div`
  border-radius: 4px;
  box-shadow: 0px 2px 20px #000000;
  min-width: 340px;
  overflow: hidden;
  width: 80%;
`

const Link = styled(TransitionLink)`
  text-decoration: none;
  width: 100%;
`

const Article = styled.article`
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  display: flex;
  font-size: 1.2rem;
  height: 150px;
  justify-content: space-evenly;
  overflow: hidden;
  padding: 0 0 0 2rem;
  @media (max-width: 768px) {
    padding: 0 2rem;
  }
  @media (max-width: 554px) {
    padding: 0 1rem;
  }
`

const ArticleNumber = styled.p`
  width: 40px;
`

const ArticleDescription = styled.p`
  flex: 3;
  font-size: 1.2rem;
  line-height: 1.7rem;
  padding: 0 8px;
`

const ArticleImage = styled.div`
  flex: 1;
  margin-left: 16px;
  min-height: 60px;
  max-width: 150px;
  min-width: 60px;
`

const Temas = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout title={siteTitle}>
      <SEO title="Lista de temas" />
      <Container>
        {posts.map(({ node }) => {
          const titulo = node.frontmatter.titulo || node.fields.slug
          const { orden } = node.frontmatter
          const {
            imagen,
            artista,
            // TODO agregar instagram,
            color_transicion,
            direccion_transicion,
            duracion_transicion,
            transicion,
          } = node.frontmatter
          return (
            <Link
              key={node.fields.slug}
              aria-label={`Ir al tema: ${titulo}`}
              color_transicion={
                transicion !== "cubrir" ? color_transicion : "#000000"
              }
              direccion_transicion={direccion_transicion}
              duracion_transicion={duracion_transicion}
              title={titulo}
              transicion={transicion}
              to={node.fields.slug}
            >
              <Article>
                <ArticleNumber>{orden}</ArticleNumber>
                <ArticleDescription>
                  {titulo} ~ by {artista}
                </ArticleDescription>
                <ArticleImage>
                  {imagen && <Image fluid={imagen.childImageSharp.fluid} />}
                </ArticleImage>
              </Article>
            </Link>
          )
        })}
      </Container>
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
          excerptAst
          fields {
            slug
          }
          frontmatter {
            titulo
            artista
            instagram
            orden
            color_transicion
            direccion_transicion
            duracion_transicion
            transicion
            imagen {
              childImageSharp {
                fluid(maxHeight: 150, maxWidth: 150) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
