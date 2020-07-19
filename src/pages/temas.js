import React from "react"
import Image from "gatsby-image"
import styled from "@emotion/styled"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TransitionLink from "../components/transitionLink"
import astCompiler from "../utils/astCompiler"

const Container = styled.div`
  min-width: 360px;
  width: 80%
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
  height: 150px;
  justify-content: space-around;
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
  flex: 1;
`

const ArticleTitle = styled.header`
  flex: 3;
  padding: 0 8px;
`

const ArticleDescription = styled.p`
  flex: 3;
  padding: 0 8px;
`

const ArticleImage = styled.div`
  flex: 1;
  margin-left: 16px;
  min-height: 60px;
  min-width: 60px;
`;

const Temas = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout title={siteTitle}>
      <SEO title="Lista de temas" />
      <Container>
        {posts.map(({ node }, index) => {
          const titulo = node.frontmatter.titulo || node.fields.slug
          const {
            descripcion,
            imagen,
            color_transicion,
            direccion_transicion,
            duracion_transicion,
            transicion,
          } = node.frontmatter
          return (
            <Link
              key={node.fields.slug}
              color_transicion={
                transicion !== "cubrir" ? color_transicion : "#000"
              }
              direccion_transicion={direccion_transicion}
              duracion_transicion={duracion_transicion}
              transicion={transicion}
              to={node.fields.slug}
            >
              <Article>
                <ArticleNumber>{index + 1}</ArticleNumber>
                <ArticleTitle>{titulo}</ArticleTitle>
                <ArticleDescription>
                  {descripcion ? descripcion : astCompiler(node.excerptAst)}
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
            descripcion
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
