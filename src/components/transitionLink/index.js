import React, { useMemo } from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { TRANSITIONS_MAPPER } from "./constants"

function TransitionLink({
  children,
  color_transicion,
  direccion_transicion,
  duracion_transicion,
  tapar_transicion,
  to,
  transicion,
  ...props
}) {
  const transition = useMemo(
    () => ({
      [TRANSITIONS_MAPPER.transicion[transicion || "crecer"]]: true,
      bg: color_transicion ||  "#000",
      hex: color_transicion ||  "#000",
      direction: TRANSITIONS_MAPPER.direccion_transicion[direccion_transicion || "derecha"],
      duration: duracion_transicion || 1,
      top: TRANSITIONS_MAPPER.tapar_transicion[tapar_transicion || "entrada"],
    }),
    [
      color_transicion,
      direccion_transicion,
      duracion_transicion,
      tapar_transicion,
      transicion,
    ]
  )
  return (
    <AniLink {...props} {...transition} to={to}>
      {children}
    </AniLink>
  )
}

export default TransitionLink
