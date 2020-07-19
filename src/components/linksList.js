import React from "react"
import styled from "@emotion/styled"

import Icon from "./icon"
import ExternalLink from "./externalLink"

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
  justify-content: center;
  flex: 1;
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
