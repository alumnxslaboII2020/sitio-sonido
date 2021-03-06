import React, { forwardRef } from "react"
import styled from "@emotion/styled"

const Anchor = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  font-size: inherit;
  justify-content: center;
  text-decoration: none;
`

const Link = ({ children, href, ...props }, ref) => (
  <Anchor
    ref={ref}
    {...props}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </Anchor>
)

const ExternalLink = forwardRef(Link)

export default ExternalLink
