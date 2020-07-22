import styled from "@emotion/styled"

const a = styled.a`
  border-bottom: solid 2px transparent;
  color: ${({ theme }) => theme.links};
  padding-bottom: 2px;
  text-decoration: none;
  transition: border-bottom 0.4s ease, color 0.4s ease;
  &:focus,
  &:hover {
    border-bottom-color: ${({ theme }) => theme.links_hover};
    color: ${({ theme }) => theme.links_hover};
  }
`

const h1 = styled.h1`
  color: ${({ theme }) => theme.color};
`

const h2 = styled.h2`
  color: ${({ theme }) => theme.color};
`

const h3 = styled.h3`
  color: ${({ theme }) => theme.color};
`

const h4 = styled.h4`
  color: ${({ theme }) => theme.color};
`

const h5 = styled.h5`
  color: ${({ theme }) => theme.color};
`

const h6 = styled.h6`
  color: ${({ theme }) => theme.color};
`

const hr = styled.hr`
  border-color: ${({ theme }) => theme.color};
`

const li = styled.li`
  color: ${({ theme }) => theme.color};
`

const markdown = {
  a,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  li,
}

export default markdown
