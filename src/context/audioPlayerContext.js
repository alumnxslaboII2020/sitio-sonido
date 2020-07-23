import React, { createContext, useMemo, useRef, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import pathOr from "../utils/pathOr"

export const AudioPlayerContext = createContext({
  audioPlayer: { current: undefined },
  currentPlaying: {
    artista: null,
    orden: null,
    titulo: null,
    url: null,
  },
  currentTime: null,
  loading: false,
  mainTrack: {
    titulo: "Resonancia Colectiva",
    url: null,
  },
  setCurrentPlaying: function () {},
  setCurrentTime: function () {},
  trackList: [],
})

function AudioPlayerProvider({ children }) {
  const audioPlayer = useRef()
  const { allMarkdownRemark, sanityFileAsset } = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: { fields: frontmatter___orden, order: ASC }) {
        edges {
          node {
            frontmatter {
              orden
              titulo
              artista
              tema {
                extension
                publicURL
              }
            }
          }
        }
      }
      sanityFileAsset(
        originalFilename: { eq: "Resonancia Colectiva Master.wav" }
      ) {
        url
      }
    }
  `)

  const mainTrack = useMemo(
    () => ({ titulo: "Resonancia Colectiva", url: sanityFileAsset.url }),
    [sanityFileAsset.url]
  )
  const trackList = useMemo(
    () =>
      allMarkdownRemark.edges.map(edge => {
        const { artista, orden, tema, titulo } = pathOr(
          {
            artista: null,
            orden: null,
            tema: { publicURL: null },
            titulo: null,
          },
          ["node", "frontmatter"],
          edge
        )
        return {
          artista,
          orden,
          titulo,
          url: tema.publicURL,
        }
      }),
    [allMarkdownRemark.edges]
  )

  const [currentPlaying, setCurrentPlaying] = useState(mainTrack)
  const [currentTime, setCurrentTime] = useState(null)

  return (
    <AudioPlayerContext.Provider
      value={{
        audioPlayer,
        currentPlaying,
        currentTime,
        loading: !currentPlaying,
        mainTrack,
        setCurrentPlaying,
        setCurrentTime,
        trackList,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}

export default AudioPlayerProvider
