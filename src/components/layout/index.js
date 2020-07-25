import React, { useCallback, useContext, useMemo, useState } from "react"
import Image from "gatsby-image"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/core"
import {
  TransitionPortal,
  TransitionState,
} from "gatsby-plugin-transition-link"
import { useStaticQuery, graphql } from "gatsby"

import Icon from "../icon"
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
  min-height: 4rem;
  padding: 0 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  @media (max-width: 992px) {
    padding: 0;
  }
`

const Menu = styled.ul`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  @media (max-width: 992px) {
    background-color: ${({ theme }) => theme.layout};
    flex-direction: column;
    position: absolute;
    padding-top: 1rem;
    margin: 0;
    padding-bottom: ${({ open }) => (open ? 1 : 4)}rem;
    transform: translateY(${({ open }) => (open ? 0 : "calc(-100% + 4rem)")});
    transform-origin: center center;
    transition: padding 0.8s 0.2s ease, transform 0.8s 0.1s ease;
    width: 100%;
  }
`

const MenuItem = styled.li`
  list-style-type: none;
  &:not(:last-of-type) {
    margin-right: 2rem;
  }
  @media (max-width: 992px) {
    height: 2rem;
    &:not(:last-of-type) {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
`

const menuLinkMixin = ({ theme }) => css`
  border-bottom: solid 1px transparent;
  border-radius: 4px 4px 0 0;
  background-color: transparent;
  color: ${theme.layout_links};
  font-size: 1rem;
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
`

const MenuLink = styled(TransitionLink)`
  ${menuLinkMixin}
`

const MenuAction = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  ${menuLinkMixin}
`

const floatingButtonMixin = ({ theme }) => css`
  align-items: center;
  appearance: none;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  color: ${theme.layout_links};
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  position: absolute;
  transition: background-color 0.4s ease;
  z-index: 3;

  .icon {
    height: 1.3rem;
    width: 1.3rem;
  }

  :focus,
  :hover {
    background-color: ${theme.layout_links_hover};
  }
`

const ToggleMenuButton = styled.button`
  ${floatingButtonMixin}
  display: none;
  right: 0.5rem;
  top: 0.7rem;
  @media (max-width: 992px) {
    display: initial;
  }
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

function HeaderComponent({ mount, transition, transitionStatus }) {
  const { audioPlayer } = useContext(AudioPlayerContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const transitionEnded = useMemo(
    () => mount && transitionStatus === "entered",
    [mount, transitionStatus]
  )

  const toggleMenuOpen = useCallback(
    () => setMenuOpen(prevState => !prevState),
    []
  )

  const scrollToBottom = useCallback(() => {
    if (menuOpen) toggleMenuOpen()
    if (audioPlayer.current) {
      audioPlayer.current.container.current.focus()
      if (!audioPlayer.current.isPlaying()) {
        audioPlayer.current.audio.current.play()
      }
    }
  }, [audioPlayer, menuOpen, toggleMenuOpen])
  return (
    <TransitionPortal level={transitionEnded ? "top" : "bottom"}>
      <Header>
        <ToggleMenuButton
          aria-label={`${menuOpen ? "Abrir" : "Cerrar"} links para celular`}
          onClick={toggleMenuOpen}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </ToggleMenuButton>
        <Menu open={transitionEnded && menuOpen}>
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
          <MenuItem>
            <MenuLink
              {...transition}
              title="Ir al video"
              activeClassName="active"
              aria-label="Ir al video"
              to="/video"
            >
              Video
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink
              {...transition}
              title="Ir a los experimentos"
              activeClassName="active"
              aria-label="Ir a los experimentos"
              to="/experimentos"
            >
              Experimentos
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuAction onClick={scrollToBottom}>Escuchar</MenuAction>
          </MenuItem>
        </Menu>
      </Header>
    </TransitionPortal>
  )
}

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

  return (
    <>
      <Global styles={globlalStyles} />
      <TransitionState>
        {({ mount, transitionStatus }) => (
          <HeaderComponent
            mount={mount}
            transition={transition}
            transitionStatus={transitionStatus}
          />
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
