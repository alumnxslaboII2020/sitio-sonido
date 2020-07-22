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
  max-width: 1024px;
  width: 100%;
`

const Item = styled.li`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  white-space: nowrap;
`

const Description = styled.span`
  margin-left: 8px;
`

function LinksList({ links }) {
  return (
    <List>
      {links.map(({ description, icon, url }) => (
        <Item key={url}>
          <ExternalLink href={url}>
            <Icon name={icon} />
            <Description>{description}</Description>
          </ExternalLink>
        </Item>
      ))}
    </List>
  )
}

export default LinksList
