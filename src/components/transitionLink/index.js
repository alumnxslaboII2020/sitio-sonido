import React, { useMemo } from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { TRANSITIONS_MAPPER } from "./constants"

function TransitionLink({
  children,
  color_transicion,
  direccion_transicion,
  duracion_transicion,
  to,
  transicion,
  ...props
}) {
  const transition = useMemo(
    () => ({
      [TRANSITIONS_MAPPER.transicion[transicion] ||
      TRANSITIONS_MAPPER.transicion.default]: true,
      bg: color_transicion || "#000000",
      hex: color_transicion || "#000000",
      direction:
        TRANSITIONS_MAPPER.direccion_transicion[
          direccion_transicion ||
            TRANSITIONS_MAPPER.direccion_transicion.default
        ],
      duration: duracion_transicion || 1,
    }),
    [color_transicion, direccion_transicion, duracion_transicion, transicion]
  )
  return (
    <AniLink {...props} {...transition} to={to}>
      {children}
    </AniLink>
  )
}

export default TransitionLink
