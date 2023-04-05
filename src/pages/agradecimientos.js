import React from "react"
import styled from "@emotion/styled"

import ButtonLink from "../components/buttonLink"
import Layout from "../components/layout"
import LinksList from "../components/linksList"
import Paragraph from "../components/paragraph"
import SEO from "../components/seo"
import Title from "../components/title"
import TransitionLink from "../components/transitionLink"

const Link = styled(TransitionLink)`
  color: ${({ theme }) => theme.layout_links};
  transition: background-color 0.4s ease, color 0.4s ease;
  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.layout_links_hover};
  }
`

function Agradecimientos() {
  return (
    <Layout>
      <SEO title="Agradecimientos y créditos" />
      <Title>Agradecimientos y creditos</Title>
      <Paragraph>
        Agradecimientos especiales a todx individux que brindó su carácter
        acusmático a esta obra, al módulo de máster que hizo llegar las ondas
        sonoras a nuestros sistemas, a los equipos de visuales y redes que
        lograron entregarnos ondas electromagnéticas en forma de imágenes fijas
        y en movimiento, a todxs lxs profes de Laboratorio II que guiaron e
        impulsaron el camino del proyecto y a nuestrxs especiales amigxs
        Polacxs.
      </Paragraph>
      <Paragraph>Produccion: Ernesto Romeo, Santiago Villa</Paragraph>
      <Paragraph>
        Mastering: Esteban Penovi, Renzo Garcia, Mariano Ferreras, Victoria
        Balay, Luca Bermejo, Agustin Argibay, Juan Francisco Garabato, Gregorio
        Castro, Santiago Villa.
      </Paragraph>
      <Paragraph>
        Diseño Visual: Aarón Echevarría, Flo Pasquali, Nacho Cúneo, Ramiro
        Arsanto, Leila Simonian, Santiago Vilanova, Emil Kleiman, Marlene Fang,
        Gregorio Castro, Mer, Merlina Seijas, Lucas Sosa, Roy Eden.
      </Paragraph>
      <Paragraph>
        Redes: Ramiro Arsanto, Emil Kleiman, Luca Bermejo, Roy Eden, Esteban
        Penovi.
      </Paragraph>
      <Paragraph>
        Sitio Web: Scripting por Mariano Ferreras (flariut), WEBGL por Samira (santa__samira), sitio por Roy Eden (royeden).
      </Paragraph>
      <LinksList
        Link={ButtonLink}
        links={[
          {
            description: "flariut",
            icon: "github",
            url: "https://github.com/flariut",
          },
          {
            description: "samira",
            icon: "instagram",
            url: "https://instagram.com/santa__samira",
          },
          {
            description: "royeden",
            icon: "github",
            url: "https://github.com/royeden",
          },
        ]}
      />
      <Paragraph>
        Parte de las visuales fueron hechas con Vsynth, programa creado por
        Kevin Kripper
      </Paragraph>
      <LinksList
        Link={ButtonLink}
        links={[
          {
            description: "VSYNTH",
            icon: "instagram",
            url: "https://www.instagram.com/vsynth74/",
          },
          {
            description: "VSYNTH",
            icon: "patreon",
            url: "https://www.patreon.com/vsynth",
          },
        ]}
      />
      <Paragraph>
        Este sitio web fue hecho con{" "}
        <Link to="/tecnologias-del-sitio">tecnologías open-source</Link>.
      </Paragraph>
      <LinksList
        Link={ButtonLink}
        links={[
          {
            description: "Código del sitio",
            icon: "github",
            url: "https://github.com/alumnxslaboII2020/sitio-sonido",
          },
        ]}
      />
    </Layout>
  )
}

export default Agradecimientos
