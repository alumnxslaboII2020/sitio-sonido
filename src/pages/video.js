import React, { useCallback, useState } from "react"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import Loading from "../components/loading"
import SEO from "../components/seo"

const ResponsiveIframe = styled.iframe`
  display: ${({ isLoading }) => (isLoading ? "none" : "initial")};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

const Video = () => {
  const [loading, setLoading] = useState(true)
  const handleLoaded = useCallback(() => setLoading(false), [])
  return (
    <Layout>
      <SEO title="Video" />
      {loading && <Loading />}
      <ResponsiveIframe
        isLoading={loading}
        title="video"
        src="https://www.youtube.com/embed/FaiAVArB6ZA"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleLoaded}
      ></ResponsiveIframe>
    </Layout>
  )
}

export default Video
