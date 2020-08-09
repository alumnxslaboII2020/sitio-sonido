import React, { Fragment } from "react"

import ExternalLink from "../components/externalLink"
import Layout from "../components/layout"
import LinksList from "../components/linksList"
import Paragraph from "../components/paragraph"
import SEO from "../components/seo"
import Title from "../components/title"
import styled from "@emotion/styled"

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`

const Link = styled(ExternalLink)`
  border-bottom: solid 1px transparent;
  padding-bottom: 4px;
  transition: border-bottom 0.4s ease, color 0.4s ease;
  &:focus,
  &:hover {
    border-bottom-color: ${({ theme }) => theme.layout_links};
  }
`

const gatsbyPluginList = [
  "gatsby-image",
  "gatsby-plugin-emotion",
  "gatsby-plugin-preload-fonts",
  "gatsby-plugin-react-helmet",
  "gatsby-plugin-sharp",
  "gatsby-plugin-transition-link",
  "gatsby-remark-copy-linked-files",
  "gatsby-remark-images",
  "gatsby-remark-responsive-iframe",
  "gatsby-remark-smartypants",
  "gatsby-source-filesystem",
  "gatsby-source-sanity",
  "gatsby-transformer-remark",
  "gatsby-transformer-sharp",
].map(description => ({ description, icon: false }))

function Tecnologias() {
  return (
    <Layout>
      <SEO title="Tecnologías con las que funciona el sitio" />
      <Container>
        <Title>Tecnologías utilizadas en el sitio:</Title>
        <Paragraph>
          Todas las tecnologías utilizadas para armar este sitio son open-source
          y pueden utilizarse gratuitamente.
        </Paragraph>
        <Paragraph>Lista de las tecnologías utilizadas y su función:</Paragraph>
        <LinksList
          column
          links={[
            {
              description: "GatsbyJS (proyecto)",
              icon: "gatsby",
              url: "https://www.gatsbyjs.org/",
            },
            {
              description: "React (UI)",
              icon: "react",
              url: "https://reactjs.org/",
            },
            {
              description: "Emotion (estilos)",
              icon: "react",
              url: "https://emotion.sh/",
            },
            {
              description: "GraphQL (API)",
              icon: "graphql",
              url: "https://graphql.org/",
            },
            {
              description: "P5 (animación con WEBGL)",
              icon: "link",
              url: "https://p5js.org/",
            },
            {
              description: "Github (repositorio)",
              icon: "github",
              url: "https://github.com/alumnxslaboII2020/sitio-sonido",
            },
            {
              description: "Sanity (hosting de recursos)",
              icon: "link",
              url: "https://sanity.io/",
            },
            {
              description: "Vercel (hosting del sitio)",
              icon: "link",
              url: "https://vercel.com/",
            },
          ]}
          Link={Link}
        />
        <Paragraph>Lista de componentes comunitarios utilizados:</Paragraph>
        <LinksList
          column
          links={[
            {
              description: "react-icons",
              icon: "link",
              url: "https://react-icons.github.io/react-icons/",
            },
            {
              description: "react-h5-audio-player",
              icon: "github",
              url: "https://github.com/lhz516/react-h5-audio-player",
            },
            {
              description: "react-masonry-css",
              icon: "github",
              url: "https://github.com/paulcollett/react-masonry-css",
            },
            {
              description: "react-p5",
              icon: "github",
              url: "https://github.com/Gherciu/react-p5",
            },
          ]}
          Link={Link}
        />
        <Paragraph>Lista de plugins de Gatsby utilizados:</Paragraph>
        <LinksList column links={gatsbyPluginList} Link={Fragment} />
      </Container>
    </Layout>
  )
}

export default Tecnologias
