import React, { useContext, useMemo } from "react"
import { ThemeProvider } from "emotion-theming"
import { Context as TransitionContext } from "gatsby-plugin-transition-link/context/createTransitionContext"

import usePrevious from "../hooks/usePrevious"
import { IconContext } from "react-icons/lib"

const THEME_MAPPER = {
  color_sitio: "layout",
  color_navegacion: "layout_links",
  color_navegacion_hover: "layout_links_hover",
  color_fondo: "background",
  color_letra: "color",
  color_links: "links",
  color_links_hover: "links_hover",
}

// TODO revisar Default theme
export const defaultTheme = {
  background: "#1e1e1e",
  color: "#eeeeee",
  layout: "#000000",
  layout_links: "#ffffff",
  layout_links_hover: "#eeeeee44",
  links: "#065A82",
  links_hover: "#1C7293",
}

function Theme({ children, overrideTheme = {} }) {
  const { inTransition, exitLength } = useContext(TransitionContext)
  const theme = useMemo(
    () => ({
      [THEME_MAPPER.color_sitio]:
        overrideTheme.color_sitio || defaultTheme[THEME_MAPPER.color_sitio],
      [THEME_MAPPER.color_navegacion]:
        overrideTheme.color_navegacion ||
        defaultTheme[THEME_MAPPER.color_navegacion],
      [THEME_MAPPER.color_navegacion_hover]:
        overrideTheme.color_navegacion_hover ||
        defaultTheme[THEME_MAPPER.color_navegacion_hover],
      [THEME_MAPPER.color_fondo]:
        overrideTheme.color_fondo || defaultTheme[THEME_MAPPER.color_fondo],
      [THEME_MAPPER.color_letra]:
        overrideTheme.color_letra || defaultTheme[THEME_MAPPER.color_letra],
      [THEME_MAPPER.color_links]:
        overrideTheme.color_links || defaultTheme[THEME_MAPPER.color_links],
      [THEME_MAPPER.color_links_hover]:
        overrideTheme.color_links_hover ||
        defaultTheme[THEME_MAPPER.color_links_hover],
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
  const previousTheme = usePrevious(theme)

  const currentTheme = useMemo(
    () => (!inTransition && exitLength === 0 ? theme : previousTheme),
    [exitLength, inTransition, previousTheme, theme]
  )

  return (
    <ThemeProvider theme={currentTheme}>
      <IconContext.Provider value={{ color: currentTheme.layout_links, size: "1rem" }}>
        {children}
      </IconContext.Provider>
    </ThemeProvider>
  )
}

export default Theme
