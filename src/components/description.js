import styled from "@emotion/styled"

export const DescriptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 35%;
  padding: 0.5rem;
  text-shadow: 2px 2px 4px #000000;
  @media (max-width: 768px) {
    font-size: inherit;
    max-width: 90%;
  }
`

export default Description
