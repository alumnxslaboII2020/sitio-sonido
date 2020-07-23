import React, { createContext, useEffect, useRef, useState } from "react"

import api from "../utils/api"
import useFetch from "../hooks/useFetch"
import pathOr from "../utils/pathOr"

export const AudioPlayerContext = createContext()

function AudioPlayerProvider({ children }) {
  const audioPlayer = useRef();
  const data = useFetch(api.getSongByOrder)

  const [currentPlaying, setCurrentPlaying] = useState(null)
  const [currentTime, setCurrentTime] = useState(null)

  useEffect(() => {
    const song =
      data && pathOr("", ["response", "body", "archivo", "asset", "url"], data)
    if (data) setCurrentPlaying(song)
  }, [data])

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
