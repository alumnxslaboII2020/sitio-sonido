import React from "react"

import AudioPlayer from "./src/components/audioPlayer"
import AudioPlayerProvider from "./src/context/audioPlayerContext"
import Theme, { defaultTheme } from "./src/context/themeContext"
import pathOr from "./src/utils/pathOr"

export const wrapPageElement = ({ element, props }, options) => {
  const {
    color_sitio,
    color_navegacion,
    color_navegacion_hover,
    color_fondo,
    color_letra,
    color_links,
    color_links_hover,
  } = pathOr(defaultTheme, ["data", "markdownRemark", "frontmatter"], props)

  return (
    <Theme
      overrideTheme={{
        color_sitio,
        color_navegacion,
        color_navegacion_hover,
        color_fondo,
        color_letra,
        color_links,
        color_links_hover,
      }}
    >
      <AudioPlayerProvider>
        {element}
        <AudioPlayer />
      </AudioPlayerProvider>
    </Theme>
  )
}
