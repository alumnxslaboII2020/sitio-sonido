import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="404: Página no encontrada" />
      <h1>Página no encontrada</h1>
      <p>
        La ruta buscada no existe <span aria-label="sad face emoji" role="img">😣️</span>
      </p>
    </Layout>
  )
}

export default NotFoundPage
