import React from "react"
import styled from "@emotion/styled"

import ExternalLink from "./externalLink"
import Icon from "./icon"

const List = styled.ul`
  display: flex;
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
  padding: 8px 0;
  white-space: nowrap;
`

const Description = styled.span`
  margin-left: 8px;
`

function LinksList({ links, Link = ExternalLink }) {
  return (
    <List>
      {links.map(({ description, icon, url }) => (
        <Item key={url}>
          <Link href={url}>
            <Icon name={icon} />
            <Description>{description}</Description>
          </Link>
        </Item>
      ))}
    </List>
  )
}

export default LinksList
