import React from "react"
import styled from "@emotion/styled"

// TODO add styles
const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

const ExternalLink = ({ children, href }) => (
  <Anchor href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </Anchor>
)

export default ExternalLink
