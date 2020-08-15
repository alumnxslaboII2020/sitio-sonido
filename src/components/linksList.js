import React from "react"
import styled from "@emotion/styled"

import ExternalLink from "./externalLink"
import Icon from "./icon"

const List = styled.ul`
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  flex-wrap: wrap;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Item = styled.li`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  margin: 0 0.5rem;
  padding: 8px 0;
  white-space: nowrap;
  @media (max-width: 768px) {
    margin: 0.25rem 0;
  }
`

const Description = styled.span`
  margin-left: 8px;
`

function LinksList({ column = false, links, Link = ExternalLink }) {
  return (
    <List column={column}>
      {links.map(({ description, icon, url }) => (
        <Item key={url}>
          <Link
            aria-label={`Ir a ${icon} / ${url}`}
            href={url}
            title={`Ir a ${icon} / ${url}`}
          >
            <Icon name={icon} />
            <Description>{description}</Description>
          </Link>
        </Item>
      ))}
    </List>
  )
}

export default LinksList
