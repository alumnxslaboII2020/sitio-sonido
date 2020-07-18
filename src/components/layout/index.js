import React, { useMemo } from "react"
import Image from "gatsby-image"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/core"
import { ThemeProvider } from "emotion-theming"
import {
  TransitionPortal,
  TransitionState,
} from "gatsby-plugin-transition-link"
import { useStaticQuery, graphql } from "gatsby"

import ExternalLink from "../externalLink"
import TransitionLink from "../transitionLink"

import theme, { THEME_MAPPER } from "./theme"

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
  min-height: calc(100vh - 10rem);
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
  height: 6rem;
  width: 100%;
  z-index: 2;
`

const Layout = ({
  background = true,
  children,
  overrideTheme = {},
  transition = {},
}) => {
  const { file, site } = useStaticQuery(
    graphql`
      query {
        file(name: { eq: "fondo" }, sourceInstanceName: { eq: "assets" }) {
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
            social {
              twitter
            }
            links {
              site
              name
              url
            }
          }
        }
      }
    `
  )
  const pageTheme = useMemo(
    () => ({
      [THEME_MAPPER.color_sitio]:
        overrideTheme.color_sitio || theme[THEME_MAPPER.color_sitio],
      [THEME_MAPPER.color_navegacion]:
        overrideTheme.color_navegacion || theme[THEME_MAPPER.color_navegacion],
      [THEME_MAPPER.color_navegacion_hover]:
        overrideTheme.color_navegacion_hover ||
        theme[THEME_MAPPER.color_navegacion_hover],
      [THEME_MAPPER.color_fondo]:
        overrideTheme.color_fondo || theme[THEME_MAPPER.color_fondo],
      [THEME_MAPPER.color_letra]:
        overrideTheme.color_letra || theme[THEME_MAPPER.color_letra],
      [THEME_MAPPER.color_links]:
        overrideTheme.color_links || theme[THEME_MAPPER.color_links],
      [THEME_MAPPER.color_links_hover]:
        overrideTheme.color_links_hover ||
        theme[THEME_MAPPER.color_links_hover],
    }),
    [
      overrideTheme.color_fondo,
      overrideTheme.color_letra,
      overrideTheme.color_links,
      overrideTheme.color_links_hover,
      overrideTheme.color_navegacion,
      overrideTheme.color_navegacion_hover,
      overrideTheme.color_sitio,
    ]
  )

  return (
    <ThemeProvider theme={pageTheme}>
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
            <Image fluid={file.childImageSharp.fluid} />
          </BackgroundImageContainer>
        )}
        {children}
      </Main>
      <Footer>
        {site.siteMetadata.links.map(({ site, name, url }) => (
          <ExternalLink key={url} href={url}>
            {site}: {name}
          </ExternalLink>
        ))}
      </Footer>
    </ThemeProvider>
  )
}

export default Layout
