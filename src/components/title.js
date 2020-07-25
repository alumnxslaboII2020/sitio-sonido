import styled from "@emotion/styled"

const Title = styled.h1`
  border-bottom: 2px solid ${({ theme }) => theme.color};
  font-weight: bold;
  font-size: 3.5rem;
  padding: 0.5rem;
  text-align: center;
  text-decoration: none;
  text-shadow: 2px 2px 4px #000000;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

export default Title
