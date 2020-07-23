import React, { useCallback, useContext } from "react"
import Image from "gatsby-image"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/core"
import {
  TransitionPortal,
  TransitionState,
} from "gatsby-plugin-transition-link"
import { useStaticQuery, graphql } from "gatsby"

import LinksList from "../linksList"
import TransitionLink from "../transitionLink"
import { AudioPlayerContext } from "../../context/audioPlayerContext"

const globlalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap");

  * {
    font-family: "Major Mono Display", sans-serif;
    text-transform: lowercase;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

const Header = styled.nav`
  background-color: ${({ theme }) => theme.layout};
  height: 4rem;
  padding: 0 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  @media (max-width: 554px) {
    /* TODO add video */
    /* height: 6rem; */
    justify-content: center;
    display: flex;
    padding: 0;
  }
`

const Menu = styled.ul`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`

const MenuItem = styled.li`
  list-style-type: none;
  &:not(:last-of-type) {
    margin-right: 2rem;
  }
  /* TODO add video */
  /* @media (max-width: 554px) {
    height: 3rem;
    &:not(:last-of-type) {
      margin-right: 0;
    }
    width: 50%;
  } */
`

const menuLinkMixin = ({ theme }) => css`
  border-bottom: solid 1px transparent;
  border-radius: 4px 4px 0 0;
  color: ${theme.layout_links};
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: background-color 0.4s ease, border-bottom-color 0.4s ease;
  &.active {
    border-bottom-color: ${theme.layout_links};
  }
  &:focus,
  &:hover {
    background-color: ${theme.layout_links_hover};
  }
  @media (max-width: 554px) {
    font-size: 0.85rem;
  }
`

const MenuLink = styled(TransitionLink)`
  ${menuLinkMixin}
`

const MenuAction = styled.a`
  cursor: pointer;
  ${menuLinkMixin}
`

const Main = styled.main`
  align-items: center;
  background-color: ${({ background, theme }) =>
    background ? "transparent" : theme.background};
  color: ${({ theme }) => theme.color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 10rem);
  padding: 5rem 0 1rem 0;
  width: 100%;
`

const BackgroundImageContainer = styled.div`
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: -1;
`

const Footer = styled.footer`
  align-items: center;
  background-color: ${({ theme }) => theme.layout};
  color: ${({ theme }) => theme.layout_links};
  display: flex;
  justify-content: center;
  min-height: 4rem;
  padding: 0 1rem;
  z-index: 2;
`

const Layout = ({ background = true, children, transition = {} }) => {
  const { file, site } = useStaticQuery(
    graphql`
      query {
        file(
          extension: { eq: "png" }
          name: { eq: "fondo_crop" }
          sourceInstanceName: { eq: "assets" }
        ) {
          name
          childImageSharp {
            fluid(grayscale: true) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        site {
          siteMetadata {
            title
            description
            links {
              description
              icon
              url
            }
          }
        }
      }
    `
  )

  const { audioPlayer } = useContext(AudioPlayerContext)

  const scrollToBottom = useCallback(() => {
    if (audioPlayer.current) {
      audioPlayer.current.container.current.focus()
      if (!audioPlayer.current.isPlaying()) {
        audioPlayer.current.audio.current.play()
      }
    }
  }, [audioPlayer])

  return (
    <>
      <Global styles={globlalStyles} />
      <TransitionState>
        {({ mount, transitionStatus }) => (
          <TransitionPortal
            level={mount && transitionStatus === "entered" ? "top" : "bottom"}
          >
            <Header>
              <Menu>
                <MenuItem>
                  <MenuLink
                    {...transition}
                    title="Ir a inicio"
                    activeClassName="active"
                    aria-label="Ir a inicio"
                    to="/"
                  >
                    Inicio
                  </MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuLink
                    {...transition}
                    title="Ir a lista de temas"
                    activeClassName="active"
                    aria-label="Ir a lista de temas"
                    to="/temas"
                  >
                    Temas
                  </MenuLink>
                </MenuItem>
                {/* TODO add video */}
                {/* <MenuItem>
                  <MenuLink
                    {...transition}
                    title="Ir al video"
                    activeClassName="active"
                    aria-label="Ir al video"
                    to="/video"
                  >
                    Video
                  </MenuLink>
                </MenuItem> */}
                <MenuItem>
                  <MenuAction onClick={scrollToBottom}>Escuchar</MenuAction>
                </MenuItem>
              </Menu>
            </Header>
          </TransitionPortal>
        )}
      </TransitionState>
      <Main background={background}>
        {background && (
          <BackgroundImageContainer>
            <Image
              style={{ height: "100%" }}
              loading="eager"
              fluid={file.childImageSharp.fluid}
            />
          </BackgroundImageContainer>
        )}
        {children}
      </Main>
      <Footer>
        <LinksList links={site.siteMetadata.links} />
      </Footer>
    </>
  )
}

export default Layout
