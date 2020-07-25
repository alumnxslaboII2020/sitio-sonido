import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

const centerMixin = ({ center }) =>
  center
    ? css`
        align-items: center;
        display: flex;
        justify-content: center;
      `
    : ""

const StyledExpandableContainer = styled.div`
  ${centerMixin}
  transform-origin: center center;
  transform: scale(${({ isExpanded }) => (isExpanded ? 1 : 0)});
  transition: transform ${({ duration }) => duration}s ease;
  width: 100%;
`

function ExpandableContainer({
  center = true,
  children,
  duration = 3,
  isExpanded,
}) {
  return (
    <StyledExpandableContainer
      center={center}
      duration={duration}
      isExpanded={isExpanded}
    >
      {children}
    </StyledExpandableContainer>
  )
}

export default ExpandableContainer
