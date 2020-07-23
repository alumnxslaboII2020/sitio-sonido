import React, { useCallback, useContext, useMemo } from "react"
import Image from "gatsby-image"
import styled from "@emotion/styled"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import LinksList from "../components/linksList"
import SEO from "../components/seo"
import TransitionLink from "../components/transitionLink"
import astCompiler from "../utils/astCompiler"
import ExternalLink from "../components/externalLink"
import { AudioPlayerContext } from "../context/audioPlayerContext"

const timeRegex = /(\d{2}):(\d{2})/g

const Article = styled.article`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 1rem;
  width: 90%;
`

const Title = styled.h1`
  border-bottom: 2px solid ${({ theme }) => theme.color};
  font-size: 4rem;
  max-width: 90%;
  padding-bottom: 8px;
  width: 100%;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`

const ImageContainer = styled.div`
  flex: 1;
  height: auto;
  width: auto;
`

const Author = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 1.2rem;
  padding: 0 1rem;
  margin-bottom: 2rem;
  @media (max-width: 554px) {
    width: 100%;
  }
`

const Link = styled(ExternalLink)`
  border-bottom: solid 2px transparent;
  color: ${({ theme }) => theme.links};
  display: flex;
  font-size: inherit;
  line-height: inherit;
  padding-bottom: 4px;
  text-decoration: none;
  transition: border-bottom 0.4s ease, color 0.4s ease;
  &:focus,
  &:hover {
    border-bottom-color: ${({ theme }) => theme.links_hover};
    color: ${({ theme }) => theme.links_hover};
  }
`

const PlayButton = styled.button`
  appearance: none;
  background-color: ${({ theme }) => theme.layout};
  border: none;
  border-radius: 2px;
  box-shadow: 0px 0px 3px #000;
  color: ${({ theme }) => theme.layout_links};
  cursor: pointer;
  font-size: 1.5rem;
  margin-top: 1rem;
  outline: none;
  padding: 1rem 2rem;
  transition: all 0.4s ease;
  :focus,
  :hover {
    background-color: ${({ theme }) => theme.layout}aa;
  }
  :hover {
    box-shadow: 0px 2px 6px #000;
  }
  :last-of-type {
    margin-top: 2rem;
  }
  @media (max-width: 554px) {
    padding: 1rem;
    width: 100%;
  }
`

const Nav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
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
`

const LinksContainer = styled.ul`
  border-top: solid 2px ${({ theme }) => theme.color};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 1rem 0 0 0;
  width: 90%;
`

const Tema = ({ data, pageContext }) => {
  const { audioPlayer, setCurrentTime } = useContext(AudioPlayerContext)
  const tema = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const {
    artista,
    color_transicion,
    direccion_transicion,
    duracion_transicion,
    imagen,
    instagram,
    tiempo,
    titulo,
    transicion,
  } = tema.frontmatter

  const links = useMemo(
    () =>
      [
        instagram && {
          description: instagram,
          icon: "instagram",
          url: `https://instagram.com/${instagram.slice(1)}`,
        },
      ].filter(Boolean),
    [instagram]
  )

  const time = useMemo(() => {
    const [, minutes, seconds] = timeRegex.exec(tiempo)
    timeRegex.lastIndex = 0
    return Number(Number(minutes) * 60 + Number(seconds))
  }, [tiempo])

  const handleClick = useCallback(() => {
    setCurrentTime(time)
    if (audioPlayer.current) audioPlayer.current.container.current.focus()
  }, [audioPlayer, setCurrentTime, time])

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
          <Title>{titulo}</Title>
        </header>
        <Content>
          <ImageContainer>
            {imagen && (
              <Image
                alt={titulo}
                fluid={imagen.childImageSharp.fluid}
                style={{
                  height: "100%",
                }}
                title={titulo}
              />
            )}
          </ImageContainer>
          <Author>
            <p>Artista: {artista}</p>
            <LinksList Link={Link} links={links} />
            <PlayButton aria-label={`Escuchar ${titulo}`} onClick={handleClick}>
              escuchar
            </PlayButton>
            <PlayButton aria-label={`Escuchar ${titulo}`} onClick={handleClick}>
              escuchar (disco)
            </PlayButton>
          </Author>
        </Content>
        <section>{astCompiler(tema.htmlAst)}</section>
      </Article>

      <Nav>
        <LinksContainer>
          <li>
            {previous && (
              <StyledTransitionLink
                color_transicion={color_transicion}
                direccion_transicion={direccion_transicion}
                duracion_transicion={duracion_transicion}
                title={`Ir a ${previous.frontmatter.titulo}`}
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
                title={`Ir a ${next.frontmatter.titulo}`}
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
        artista
        color_fondo
        color_letra
        color_links
        color_links_hover
        color_navegacion
        color_navegacion_hover
        color_sitio
        color_transicion
        direccion_transicion
        duracion_transicion
        imagen {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid_tracedSVG
              presentationHeight
              presentationWidth
            }
          }
        }
        instagram
        tiempo
        titulo
        transicion
      }
    }
  }
`
