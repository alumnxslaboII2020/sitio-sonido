import React from "react"
import styled from "@emotion/styled"
import Description from "./description"
import Button from "./button"

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function Disclaimer({ acceptDisclaimerText, disclaimerMessage, onAccept }) {
  return (
    <Container>
      <Description>{disclaimerMessage}</Description>
      <Button background onClick={onAccept}>
        {acceptDisclaimerText}
      </Button>
    </Container>
  )
}

export default Disclaimer
