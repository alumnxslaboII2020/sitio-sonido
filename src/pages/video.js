import React from "react"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ResponsiveIframe = styled.iframe`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Video = () => {
  return (
    <Layout>
      <SEO title="Video" />
      <ResponsiveIframe
        title="video"
        src="https://www.youtube.com/embed/FaiAVArB6ZA"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></ResponsiveIframe>
    </Layout>
  )
}

export default Video
