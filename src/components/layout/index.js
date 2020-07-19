import React from "react"
import Image from "gatsby-image"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/core"
import {
  TransitionPortal,
  TransitionState,
} from "gatsby-plugin-transition-link"
import { useStaticQuery, graphql } from "gatsby"

import TransitionLink from "../transitionLink"
import LinksList from "../linksList"

const globlalStyles = css`
  * {
    font-family: "Poppins", sans-serif;
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
`

const Menu = styled.ul`
  align-items: center;
  display: flex;
  padding: 0;
`

const MenuItem = styled.li`
  list-style-type: none;
  &:not(:last-of-type) {
    margin-right: 2rem;
  }
`

const MenuLink = styled(TransitionLink)`
  border-bottom: solid 1px transparent;
  border-radius: 4px 4px 0 0;
  color: ${({ theme }) => theme.layout_links};
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: background-color 0.4s ease, border-bottom-color 0.4s ease;
  &.active {
    border-bottom-color: ${({ theme }) => theme.layout_links};
  }
  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.layout_links_hover};
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
  min-height: calc(100vh - 8rem);
  padding: 4rem 0 0 0;
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
                  <MenuLink {...transition} activeClassName="active" to="/">
                    Inicio
                  </MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuLink
                    {...transition}
                    activeClassName="active"
                    to="/temas"
                  >
                    Temas
                  </MenuLink>
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
