import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import styled from "@emotion/styled"
import { Global, css } from '@emotion/core'
import { ThemeProvider } from "emotion-theming"

import theme from "./theme"

const globlalStyles = css`
  * {
    font-family: "Poppins", sans-serif;
  }
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const Header = styled.header`
  background-color: black;
  color: white;
  height: 64px;
  position: fixed;
  width: 100%;
  z-index: 2;
`

const Main = styled.main`
  min-height: 100vh;
  padding: 5rem 0 0 0;
`

const Footer = styled.footer`
  background-color: black;
  color: white;
  width: 100%;
`

const Layout = ({ title, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globlalStyles} />
      <Header>
        <nav></nav>
        <AniLink hex="#000000" paintDrip direction to="/">
          {title}
        </AniLink>
      </Header>
      <Main>{children}</Main>
      <Footer>Holis</Footer>
    </ThemeProvider>
  )
}

export default Layout
