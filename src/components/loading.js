import React from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/core"

const animation = keyframes`
  0%, 10% {
    opacity: 0; 
    transform: perspective(140px) rotateX(-180deg);
  } 25%, 75% {
    opacity: 1; 
    transform: perspective(140px) rotateX(0deg);
  } 90%, 100% {
    opacity: 0; 
    transform: perspective(140px) rotateY(180deg);
  }
`

const cubes = [
  {
    key: "top",
    delay: 0,
    angle: 0,
  },
  {
    key: "right",
    delay: 0.3,
    angle: 90,
  },
  {
    key: "left",
    delay: 0.9,
    angle: 270,
  },
  {
    key: "bottom",
    delay: 0.6,
    angle: 180,
  },
]

const Container = styled.div`
  height: 40px;
  margin: 20px auto;
  position: relative;
  transform: rotateZ(45deg);
  width: 40px;
`

const Cube = styled.div`
  float: left;
  height: 50%;
  position: relative;
  transform: scale(1.1) rotateZ(${({ angle }) => angle}deg);
  width: 50%;
  :before {
    animation: ${animation} 2.4s ${({ delay }) => delay}s infinite linear both;
    background-color: ${({ theme }) => theme.layout_links};
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform-origin: 100% 100%;
    width: 100%;
  }
`

function Loading() {
  return (
    <Container>
      {cubes.map(({ angle, delay, key }) => (
        <Cube key={key} angle={angle} delay={delay} />
      ))}
    </Container>
  )
}

export default Loading
