import React from "react"
import Image from "gatsby-image"
import Masonry from "react-masonry-css"
import styled from "@emotion/styled"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TransitionLink from "../components/transitionLink"

const MasonryContainer = styled.div`
  width: 100%;
  .custom-masonry-grid {
    display: flex;
    margin-left: 0px; /* gutter size offset */
    width: auto;
  }
  .custom-masonry-grid_column {
    background-clip: padding-box;
    height: 100%;
    padding-left: 0px; /* gutter size */
  }
`

const Banner = styled.div`
  height: auto;
  margin-top: 2rem;
  width: 40%;
  @media (max-width: 1000px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 60%;
  }
  @media (max-width: 554px) {
    width: 90%;
  }
`

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const About = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem 3rem 1rem;
`

const Title = styled.h1`
  border-bottom: 2px solid ${({ theme }) => theme.color};
  font-weight: bold;
  font-size: 3.5rem;
  padding: 0.5rem;
  text-align: center;
  text-decoration: none;
  text-shadow: 2px 2px 4px #000;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const DescriptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 35%;
  padding: 0.5rem;
  text-shadow: 2px 2px 4px #000;
  @media (max-width: 768px) {
    font-size: inherit;
    max-width: 90%;
  }
`

const ImageContainer = styled.div`
  height: auto;
  min-width: 300px;
  max-width: calc(100vw / 5);
  width: auto;
  @media (max-width: 1600px) {
    max-width: calc(100vw / 4);
  }
  @media (max-width: 1200px) {
    max-width: calc(100vw / 3);
  }
  @media (max-width: 900px) {
    max-width: calc(100vw / 2);
  }
  @media (max-width: 600px) {
    max-width: 100vw;
  }
`

const Inicio = ({ data }) => {
  const temas = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Inicio" />
      {data.file && (
        <BannerContainer>
          <Banner>
            <Image
              alt={data.file.name}
              fluid={data.file.childImageSharp.fluid}
            />
          </Banner>
        </BannerContainer>
      )}

      <About>
        <Title>Resonancia Colectiva - AAEE 2020</Title>
        <DescriptionContainer>
          <Description>
            Paisaje audiovisual/collage multidimensional colaborativo compuesto
            a partir de sonidos específicos, creados desde registros de fuentes
            electromagnéticas, mecánicas y físicas, acusmatizadas natural y
            analógicamente, editadas y ensambladas digitalmente. 
          </Description>
          <Description>
            47 artistas, 47 obras de 1 minuto cada una, ensambladas para así
            formar un paisaje sonoro constantemente cambiante y evolutivo.
          </Description>
          <Description>
            los sonidos registrados, acusmatizados y editados fueron puestos a
            disposición de todxs lxs artistas, creando así un banco de sonido de
            aproximadamente 1500 audios para ser usados libremente en las
            composiciones.
          </Description>
          <Description>
            Como resultado: un proyecto audiovisual colaborativo, con un
            banco de sonidos comunitario compuesto por todxs lxs artistas de
            este LP.
          </Description>
        </DescriptionContainer>
      </About>

      <MasonryContainer>
        <Masonry
          breakpointCols={{
            default: 5,
            1600: 4,
            1200: 3,
            900: 2,
            600: 1,
          }}
          className="custom-masonry-grid"
          columnClassName="custom-masonry-grid_column"
        >
          {temas.map(({ node }) => {
            const {
              color_transicion,
              direccion_transicion,
              duracion_transicion,
              imagen,
              titulo,
              transicion,
            } = node.frontmatter
            return (
              <article key={node.fields.slug}>
                <TransitionLink
                  aria-label={`Ir al tema: ${titulo}`}
                  color_transicion={
                    transicion === "cubrir" ? "#000" : color_transicion
                  }
                  direccion_transicion={direccion_transicion}
                  duracion_transicion={duracion_transicion}
                  transicion={transicion}
                  to={node.fields.slug}
                >
                  {imagen && (
                    <ImageContainer>
                      <Image
                        alt={titulo}
                        fluid={imagen.childImageSharp.fluid}
                        title={titulo}
                      />
                    </ImageContainer>
                  )}
                </TransitionLink>
              </article>
            )
          })}
        </Masonry>
      </MasonryContainer>
    </Layout>
  )
}

export default Inicio

export const pageQuery = graphql`
  query {
    file(name: { eq: "PORTADA" }, sourceInstanceName: { eq: "assets" }) {
      name
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___orden], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            color_transicion
            direccion_transicion
            duracion_transicion
            titulo
            transicion
            imagen {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_tracedSVG
                  presentationHeight
                  presentationWidth
                }
              }
            }
          }
        }
      }
    }
  }
`
