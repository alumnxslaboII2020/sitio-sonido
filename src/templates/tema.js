import React from "react"
import styled from "@emotion/styled"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TransitionLink from "../components/transitionLink"
import astCompiler from "../utils/astCompiler"
import markdown from "../components/markdown"

const Article = styled.article`
  padding: 0 1rem;
`

const StyledTransitionLink = styled(TransitionLink)`
  box-shadow: 0 2px transparent;
  color: ${({ theme }) => theme.links};
  text-decoration: none;
  transition: box-shadow 0.4s ease, color 0.4s ease;
  &:focus,
  &:hover {
    box-shadow: 0 2px ${({ theme }) => theme.links_hover};
    color: ${({ theme }) => theme.links_hover};
  }
`;

const Nav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LinksContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
  padding: 0;
  width: 100%;
`;

const Tema = ({ data, pageContext, location }) => {
  const tema = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const {
    titulo,
    color_transicion,
    direccion_transicion,
    duracion_transicion,
    transicion,
  } = tema.frontmatter

  return (
    <Layout
      background={false}
      title={siteTitle}
      transition={{
        color_transicion,
        direccion_transicion,
        duracion_transicion,
        transicion,
      }}
    >
      <SEO title={titulo} description={tema.excerpt} />
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

      <Nav>
        <LinksContainer>
          <li>
            {previous && (
              <StyledTransitionLink
                color_transicion={color_transicion}
                direccion_transicion={direccion_transicion}
                duracion_transicion={duracion_transicion}
                transicion={transicion}
                to={previous.fields.slug}
                rel="prev"
              >
                ← {previous.frontmatter.titulo}
              </StyledTransitionLink>
            )}
          </li>
          <li>
            {next && (
              <StyledTransitionLink
                color_transicion={color_transicion}
                direccion_transicion={direccion_transicion}
                duracion_transicion={duracion_transicion}
                transicion={transicion}
                to={next.fields.slug}
                rel="next"
              >
                {next.frontmatter.titulo} →
              </StyledTransitionLink>
            )}
          </li>
        </LinksContainer>
      </Nav>
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
        color_sitio
        color_navegacion
        color_navegacion_hover
        color_fondo
        color_letra
        color_links
        color_links_hover
        titulo
        color_transicion
        direccion_transicion
        duracion_transicion
        transicion
      }
    }
  }
`
