import React, { ReactNode } from "react"
import styled from "@emotion/styled"

// TODO add styles
const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

type Props = {
  children: ReactNode
  href: string
}

const ExternalLink: ReactNode = ({ children, href }: Props) => (
  <Anchor href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </Anchor>
)

export default ExternalLink
