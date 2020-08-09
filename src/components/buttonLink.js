import React from "react"

import Button from "./button"
import ExternalLink from "./externalLink"

function ButtonLink({ children, href }) {
  return (
    <Button background tabIndex={-1}>
      <ExternalLink href={href}>{children}</ExternalLink>
    </Button>
  )
}

export default ButtonLink
