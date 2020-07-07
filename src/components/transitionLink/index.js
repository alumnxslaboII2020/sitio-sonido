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
}) {
  const transition = useMemo(
    () => ({
      [TRANSITIONS_MAPPER.transicion[transicion]]: true,
      bg: color_transicion,
      hex: color_transicion,
      direction: TRANSITIONS_MAPPER.direccion_transicion[direccion_transicion],
      duration: duracion_transicion,
      top: TRANSITIONS_MAPPER.tapar_transicion[tapar_transicion],
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
    <AniLink {...transition} to={to}>
      {children}
    </AniLink>
  )
}

export default TransitionLink
