import React from "react"
import styled from "@emotion/styled"

const Anchor = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  font-size: inherit;
  justify-content: center;
  text-decoration: none;
`

const ExternalLink = ({ children, href }) => (
  <Anchor href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </Anchor>
)

export default ExternalLink
