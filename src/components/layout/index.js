import React, { useMemo } from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/core"
import { ThemeProvider } from "emotion-theming"
import { useStaticQuery, graphql } from "gatsby"

import ExternalLink from "../externalLink"

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

const Header = styled.header`
  background-color: ${({ theme }) => theme.layout};
  height: 4rem;
  position: fixed;
  width: 100%;
  z-index: 2;
`

const Nav = styled.nav`
  padding: 0 1rem;
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

const MenuLink = styled(AniLink)`
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
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 4rem 0 0 0;
  width: 100%;
`

const Footer = styled.footer`
  align-items: center;
  background-color: ${({ theme }) => theme.layout};
  color: ${({ theme }) => theme.layout_links};
  display: flex;
  height: 6rem;
  width: 100%;
`

const Layout = ({ children, overrideTheme = {} }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
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

  console.log({ pageTheme, overrideTheme, theme })
  return (
    <ThemeProvider theme={pageTheme}>
      <Global styles={globlalStyles} />
      <Header>
        <Nav>
          <Menu>
            <MenuItem>
              <MenuLink
                activeClassName="active"
                hex="#000000"
                paintDrip
                direction
                to="/"
              >
                Inicio
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink
                activeClassName="active"
                hex="#000000"
                paintDrip
                direction
                to="/temas"
              >
                Temas
              </MenuLink>
            </MenuItem>
          </Menu>
        </Nav>
      </Header>
      <Main>{children}</Main>
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
