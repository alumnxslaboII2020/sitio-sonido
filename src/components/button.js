import styled from "@emotion/styled"

const Button = styled.button`
  appearance: none;
  background-color: ${({ theme }) => theme.layout};
  border: none;
  border-radius: 2px;
  box-shadow: 0px 0px 3px #000000;
  color: ${({ theme }) => theme.layout_links};
  cursor: pointer;
  font-size: 1.5rem;
  margin-top: 1rem;
  outline: none;
  padding: 1rem 2rem;
  transition: all 0.4s ease;
  :focus,
  :hover {
    background-color: ${({ background, theme }) =>
      background ? theme.layout_links_hover : `${theme.layout}aa`};
  }
  :hover {
    box-shadow: 0px 2px 6px #000000;
  }
  :last-of-type {
    margin-top: 2rem;
  }
  @media (max-width: 554px) {
    padding: 1rem;
    width: 100%;
  }
`

export default Button
