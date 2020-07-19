import React, { createContext, useRef, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

export const AudioPlayerContext = createContext()

function AudioPlayerProvider({ children }) {
  const data = useStaticQuery(graphql`
    {
      file(name: { eq: "test" }) {
        publicURL
      }
    }
  `)

  
  const [currentPlaying, setCurrentPlaying] = useState(data.file.publicURL)
  const allSongs = useRef().current

  return (
    <AudioPlayerContext.Provider
      value={{
        currentPlaying,
        setCurrentPlaying,
        allSongs,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}

export default AudioPlayerProvider
