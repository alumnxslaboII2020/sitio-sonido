import React, { createContext, useEffect, useRef, useState } from "react"

import api from "../utils/api"
import useFetch from "../hooks/useFetch"
import pathOr from "../utils/pathOr"

export const AudioPlayerContext = createContext()

function AudioPlayerProvider({ children }) {
  const data = useFetch(api.getSongByOrder)

  const [currentPlaying, setCurrentPlaying] = useState(null)

  useEffect(() => {
    const song = data && pathOr("", ["response", "body", "archivo", "asset", "url"], data)
    if (data) setCurrentPlaying(song)
  }, [data])

  const allSongs = useRef().current

  return (
    <AudioPlayerContext.Provider
      value={{
        loading: !currentPlaying,
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
