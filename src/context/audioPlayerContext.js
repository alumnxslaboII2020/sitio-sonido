import React, { createContext, useRef, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

export const AudioPlayerContext = createContext()

function AudioPlayerProvider({ children }) {
  const audioPlayer = useRef()
  const data = useStaticQuery(graphql`
    {
      sanityFileAsset(
        originalFilename: { eq: "RESONANCIA COLECTIVA - LP.mp3" }
      ) {
        url
      }
    }
  `)

  const [currentPlaying] = useState(data.sanityFileAsset.url)
  const [currentTime, setCurrentTime] = useState(null)

  return (
    <AudioPlayerContext.Provider
      value={{
        audioPlayer,
        currentPlaying,
        currentTime,
        loading: !currentPlaying,
        setCurrentTime,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}

export default AudioPlayerProvider
