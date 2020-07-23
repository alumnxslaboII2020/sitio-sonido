import React, { createContext, useMemo, useRef, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import pathOr from "../utils/pathOr"
import timeParser from "../utils/timeParser"

export const AudioPlayerContext = createContext({
  audioPlayer: { current: undefined },
  loading: true,
  play: null,
  setPlay: function () {},
  setTime: function () {},
  song: "",
  time: undefined,
})

function AudioPlayerProvider({ children }) {
  const audioPlayer = useRef()
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___orden], order: ASC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              orden
              color_transicion
              direccion_transicion
              duracion_transicion
              artista
              tiempo
              titulo
              transicion
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

  const song = useMemo(() => pathOr("", ["sanityFileAsset", "url"], data), [
    data,
  ])

  const songList = useMemo(
    () =>
      pathOr([], ["allMarkdownRemark", "edges"], data).map(edge => {
        const { artista, titulo, tiempo, orden, ...transicion } = pathOr(
          { artista: undefined, titulo: undefined, tiempo: "00:00", orden: 0 },
          ["node", "frontmatter"],
          edge
        )
        const slug = pathOr("/", ["node", "fields", "slug"], edge)

        return {
          artista,
          orden,
          slug,
          titulo,
          tiempo,
          transicion,
        }
      }),
    [data]
  )
  const songTimes = useMemo(
    () => [...songList.map(({ tiempo }) => timeParser(tiempo)), Infinity],
    [songList]
  )

  const [play, setPlay] = useState(null)
  const [time, setTime] = useState(undefined)
  const songIndex = useMemo(
    () =>
      time !== undefined &&
      songTimes.findIndex(
        (songTime, index) =>
          songTime - 1 <= time && songTimes[index + 1] - 1 >= time
      ),
    [songTimes, time]
  )
  const songPlaying = useMemo(() => songList[songIndex], [songIndex, songList])

  return (
    <AudioPlayerContext.Provider
      value={{
        audioPlayer,
        loading: !song,
        play,
        setPlay,
        setTime,
        song,
        songPlaying,
        time,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}

export default AudioPlayerProvider
