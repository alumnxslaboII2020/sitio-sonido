import styled from "@emotion/styled"

const Paragraph = styled.p`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  text-shadow: 2px 2px 4px #000000;
  @media (max-width: 768px) {
    font-size: inherit;
    padding: 0.5rem;
    max-width: 90%;
  }
`

export default Paragraph
