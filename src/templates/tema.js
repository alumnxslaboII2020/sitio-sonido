import React from "react"
import styled from "@emotion/styled"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import astCompiler from "../utils/astCompiler"
import markdown from "../components/markdown"

const Article = styled.article`
  padding: 0 1rem;
`

const Tema = ({ data, pageContext, location }) => {
  const tema = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const {
    titulo,
    descripcion,
    color_sitio,
    color_navegacion,
    color_navegacion_hover,
    color_fondo,
    color_letra,
    color_links,
    color_links_hover,
    color_transicion,
    direccion_transicion,
    duracion_transicion,
    tapar_transicion,
    transicion,
  } = tema.frontmatter

  return (
    <Layout
      location={location}
      overrideTheme={{
        color_sitio,
        color_navegacion,
        color_navegacion_hover,
        color_fondo,
        color_letra,
        color_links,
        color_links_hover,
      }}
      title={siteTitle}
      transition={{
        color_transicion,
        direccion_transicion,
        duracion_transicion,
        tapar_transicion,
        transicion,
      }}
    >
      <SEO title={titulo} description={descripcion || tema.excerpt} />
      <Article>
        <header>
          <h1
            style={{
              marginTop: "1.5rem",
              marginBottom: 0,
            }}
          >
            {titulo}
          </h1>
        </header>
        <section>{astCompiler(tema.htmlAst)}</section>
        <markdown.hr />
      </Article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.titulo}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.titulo} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default Tema

export const pageQuery = graphql`
  query TemasBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      frontmatter {
        titulo
        descripcion
        color_sitio
        color_navegacion
        color_navegacion_hover
        color_fondo
        color_letra
        color_links
        color_links_hover
        color_transicion
        direccion_transicion
        duracion_transicion
        tapar_transicion
        transicion
      }
    }
  }
`
