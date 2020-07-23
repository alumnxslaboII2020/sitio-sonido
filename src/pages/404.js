import React from "react"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Title = styled.h1`
  border-bottom: 2px solid ${({ theme }) => theme.color};
  font-weight: bold;
  font-size: 3.5rem;
  padding: 0.5rem;
  text-align: center;
  text-decoration: none;
  text-shadow: 2px 2px 4px #000;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 35%;
  padding: 0.5rem;
  text-shadow: 2px 2px 4px #000;
  @media (max-width: 768px) {
    font-size: inherit;
    max-width: 90%;
  }
`

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="404: Página no encontrada" />
      <Title>Página no encontrada</Title>
      <Description>
        La ruta buscada no existe{" "}
        <span aria-label="sad face emoji" role="img">
          😣️
        </span>
      </Description>
    </Layout>
  )
}

export default NotFoundPage
