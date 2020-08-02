import React, { useCallback, useState } from "react"
import styled from "@emotion/styled"
import { graphql } from "gatsby"

import Button from "../components/button"
import Disclaimer from "../components/disclaimer"
import ExpandableContainer from "../components/expandableContainer"
import ExternalLink from "../components/externalLink"
import Layout from "../components/layout"
import LinksList from "../components/linksList"
import Loading from "../components/loading"
import SEO from "../components/seo"
import Title from "../components/title"
import pathOr from "../utils/pathOr"


// https://github.com/gatsbyjs/gatsby/issues/309
let Sketch = function Sketch() {
  return null
}

try {
  Sketch = require("react-p5");
} catch (error) {
  console.log(error)
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
`

const Paragraph = styled.p`
  font-size: 1.2rem;
`

function ButtonLink({ children, href }) {
  return (
    <Button background tabIndex={-1}>
      <ExternalLink href={href}>{children}</ExternalLink>
    </Button>
  )
}

function Experimentos({ data }) {
  const image = pathOr(null, ["file", "publicURL"], data)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [loading, setLoading] = useState(true)
  const handleAccept = useCallback(() => setShowDisclaimer(false), [])
  const handleLoaded = useCallback(() => setLoading(false), [])

  const [immutableState, setImmutableState] = useState({
    angle: 0,
    image: null,
  })

  return (
    <Layout>
      <SEO title="Experimentos" />
      <Title>Web Art hecho con WEBGL</Title>
      <Container>
        <Paragraph>
          (Pronto vamos a agregar más contenido a esta sección{" "}
          <span aria-label="surpised face emoji" role="img">
            😮️
          </span>
          )
        </Paragraph>
        <Paragraph>Este experimento fue realizado por Santi Migueles</Paragraph>
        <LinksList
          Link={ButtonLink}
          links={[
            {
              description: "@santiago.n.m",
              icon: "instagram",
              url: "https://instagram.com/santiago.n.m",
            },
            {
              description: "santimigueles",
              icon: "github",
              url: "https://github.com/santimigueles",
            },
          ]}
        />
        <Paragraph>
          Y adaptado por Roy Eden para la utilización dentro de este sitio web
        </Paragraph>
        <LinksList
          Link={ButtonLink}
          links={[
            {
              description: "@r.o.y.e",
              icon: "instagram",
              url: "https://instagram.com/r.o.y.e",
            },
            {
              description: "Royeden",
              icon: "github",
              url: "https://github.com/royeden",
            },
          ]}
        />
      </Container>
      {image ? (
        showDisclaimer ? (
          <Disclaimer
            acceptDisclaimerText="Entendido"
            disclaimerMessage="Estos experimentos usan la tecnonolgía WEBGL, la cual puede ser taxativa en el procesador gráfico de tu dispositivo y no funcionar con algunos navegadores"
            onAccept={handleAccept}
          />
        ) : (
          <>
            {loading && <Loading />}
            <ExpandableContainer isExpanded={!loading}>
              {typeof window === "object" && (
                <Sketch
                  key={image}
                  preload={p5 => {
                    setImmutableState(prevState => ({
                      ...prevState,
                      image: p5.loadImage(image, handleLoaded),
                    }))
                  }}
                  setup={(p5, parentRef) => {
                    p5.createCanvas(
                      p5.min(p5.windowWidth, p5.windowHeight),
                      p5.min(p5.windowWidth, p5.windowHeight),
                      p5.WEBGL
                    ).parent(parentRef)
                  }}
                  windowResized={p5 =>
                    p5.resizeCanvas(
                      p5.min(p5.windowWidth, p5.windowHeight),
                      p5.min(p5.windowWidth, p5.windowHeight)
                    )
                  }
                  draw={p5 => {
                    let dx = p5.mouseX - p5.width / 2
                    let dy = p5.mouseY - p5.height / 2
                    let mouseColorx = p5.map(p5.mouseX, 0, p5.width, 0, 255)
                    let cursorZ = p5.map(p5.mouseY, 0, p5.width, 0, 325)
                    let v = p5.createVector(dx, dy, 0)
                    v.div(100)
                    p5.ambientLight(255)
                    p5.directionalLight(255, 0, 255, dx, dy, 0)
                    p5.pointLight(0, 0, 255, 500, 0, 0)
                    p5.pointLight(0, 255, 0, 0, 200, 0)
                    p5.pointLight(0, 255, 0, 0, -200, 0)
                    p5.pointLight(255, mouseColorx, 100, 0, 0, 200)

                    p5.background(0)

                    p5.translate(0, 0, cursorZ)

                    p5.push()
                    //fill(0, 50, 200);
                    //translate(mouseX - width / 2, mouseY - height / 2);
                    p5.rotateX(immutableState.angle)
                    p5.rotateY(immutableState.angle * 0.2)
                    p5.rotateZ(immutableState.angle * 0.2)

                    p5.noStroke()
                    //ambientMaterial(255);
                    //translate(0, 0, mouseX);
                    // texture(cam) TODO add
                    //filter(THRESHOLD);
                    p5.box(220)
                    p5.box(50)
                    p5.box(20)
                    p5.box(8)
                    p5.box(3)
                    p5.pop()
                    //filter(THRESHOLD);
                    p5.push()
                    p5.translate(0, 200)
                    p5.rotateX(p5.HALF_PI)
                    p5.texture(immutableState.image)
                    p5.noStroke()
                    //ambientMaterial(255);
                    p5.plane(650, 600)
                    p5.pop()

                    p5.push()
                    p5.translate(0, -150, 100)
                    p5.rotateX(p5.HALF_PI)
                    p5.texture(immutableState.image)
                    p5.noStroke()
                    p5.plane(325)
                    setImmutableState(prevState => ({
                      ...prevState,
                      angle: prevState.angle + 0.005,
                    }))
                  }}
                />
              )}
            </ExpandableContainer>
            {/* TODO add <Button>Cambiar imagen</Button> */}
          </>
        )
      ) : (
        "No se pudo encontrar el recurso :("
      )}
    </Layout>
  )
}

export default Experimentos

export const pageQuery = graphql`
  query {
    file(name: { eq: "PORTADA" }, sourceInstanceName: { eq: "assets" }) {
      name
      publicURL
    }
    allFile(filter: { sourceInstanceName: { eq: "assets" } }) {
      edges {
        node {
          publicURL
        }
      }
    }
  }
`
