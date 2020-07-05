import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/core"
import { ThemeProvider } from "emotion-theming"
import { useStaticQuery, graphql } from "gatsby"

import theme from "./theme"
import ExternalLink from "../externalLink"

const globlalStyles = css`
  * {
    font-family: "Poppins", sans-serif;
  }
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

const Header = styled.header`
  background-color: black;
  color: white;
  height: 64px;
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
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: background-color 0.4s ease, border-bottom-color 0.4s ease;
  &.active {
    border-bottom-color: white;
  }
  &:focus,
  &:hover {
    background-color: #2f2f2f;
  }
`

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 100vh;
  max-width: 956px;
  padding: 5rem 0 0 0;
`

const Footer = styled.footer`
  align-items: center;
  background-color: black;
  color: white;
  display: flex;
  height: 6rem;
  width: 100%;
`

const Layout = ({ children }) => {
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
  return (
    <ThemeProvider theme={theme}>
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
