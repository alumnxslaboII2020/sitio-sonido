import React, { useCallback, useContext, useEffect } from "react"
import H5AudioPlayer from "react-h5-audio-player"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

import usePrevious from "../hooks/usePrevious"
import { AudioPlayerContext } from "../context/audioPlayerContext"

import Loading from "./loading"
import TransitionLink from "./transitionLink"

// TODO add player colors?
const rhap_theme_color = ({ theme }) => theme.layout_links // theme.player_theme_color
const rhap_bar_color = ({ theme }) => theme.layout_links // theme.player_bar_color
const rhap_time_color = ({ theme }) => theme.layout_links // theme.player_time_color

const loadingMixin = css`
  margin-top: -1.5rem;
  padding-top: 1.5rem;
`

const AudioPlayerContainer = styled.div`
  background-color: ${({ theme }) => theme.layout};
  padding-bottom: 0.5rem;
  transition: background 0.4s ease;
  ${({ loading }) => (loading ? loadingMixin : "")}

  .rhap_container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    line-height: 1;
    font-family: inherit;
    width: 100%;
    padding: 10px 15px;
    background-color: transparent;
    transition: background-color 0.4s ease;

    outline: none;

    svg {
      vertical-align: initial;
    }

    :focus {
      background-color: ${({ theme }) => theme.layout_links_hover}88;
    }
  }

  .rhap_header {
    margin-bottom: 10px;
  }

  .rhap_footer {
    margin-top: 5px;
  }

  .rhap_main {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  .rhap_stacked {
    .rhap_controls-section {
      margin-top: 8px;
    }
  }

  .rhap_horizontal {
    flex-direction: row;

    .rhap_controls-section {
      margin-left: 8px;
    }
  }

  .rhap_horizontal-reverse {
    flex-direction: row-reverse;

    .rhap_controls-section {
      margin-right: 8px;
    }
  }

  .rhap_stacked-reverse {
    flex-direction: column-reverse;

    .rhap_controls-section {
      margin-bottom: 8px;
    }
  }

  .rhap_progress-section {
    display: flex;
    flex: 3 1 auto;
    align-items: center;
  }

  .rhap_progress-container {
    display: flex;
    align-items: center;
    height: 20px;
    flex: 1 0 auto;
    align-self: center;
    margin: 0 calc(10px + 1%);
    cursor: pointer;
    -webkit-user-select: none;

    &:focus:not(:focus-visible) {
      outline: 0;
    }
  }

  .rhap_time {
    color: ${rhap_time_color};
    font-size: 16px;
    user-select: none;
    -webkit-user-select: none;
  }

  .rhap_progress-bar {
    box-sizing: border-box;
    position: relative;
    z-index: 0;
    width: 100%;
    height: 5px;
    background-color: ${rhap_bar_color};
    border-radius: 2px;
  }

  .rhap_progress-filled {
    height: 100%;
    position: absolute;
    z-index: 2;
    background-color: ${rhap_theme_color};
    border-radius: 2px;
  }

  .rhap_progress-bar-show-download {
    background-color: ${rhap_bar_color}88;
  }

  .rhap_download-progress {
    height: 100%;
    position: absolute;
    z-index: 1;
    background-color: ${rhap_bar_color};
    border-radius: 2px;
  }

  .rhap_progress-indicator {
    box-sizing: border-box;
    position: absolute;
    z-index: 3;
    width: 20px;
    height: 20px;
    margin-left: -10px;
    top: -8px;
    background: ${rhap_theme_color};
    border-radius: 50px;
    box-shadow: ${rhap_theme_color}88 0 0 5px;
  }

  .rhap_controls-section {
    display: flex;
    flex: 1 1 auto;
    justify-content: space-between;
    align-items: center;
  }

  .rhap_additional-controls {
    display: flex;
    flex: 1 0 auto;
    align-items: center;
  }

  .rhap_repeat-button {
    font-size: 26px;
    width: 26px;
    height: 26px;
    color: ${rhap_theme_color};
    margin-right: 6px;
  }

  .rhap_main-controls {
    flex: 0 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .rhap_main-controls-button {
    margin: 0 3px;
    color: ${rhap_theme_color};
    font-size: 35px;
    width: 35px;
    height: 35px;
  }

  .rhap_play-pause-button {
    font-size: 40px;
    width: 40px;
    height: 42px;
  }

  .rhap_volume-controls {
    display: flex;
    flex: 1 0 auto;
    justify-content: flex-end;
    align-items: center;
  }

  .rhap_volume-button {
    flex: 0 0 26px;
    font-size: 26px;
    width: 26px;
    height: 26px;
    color: ${rhap_theme_color};
    margin-right: 6px;
  }

  .rhap_volume-container {
    display: flex;
    align-items: center;
    flex: 0 1 100px;
    -webkit-user-select: none;
  }

  .rhap_volume-bar-area {
    display: flex;
    align-items: center;
    width: 100%;
    height: 14px;
    cursor: pointer;

    &:focus:not(:focus-visible) {
      outline: 0;
    }
  }

  .rhap_volume-bar {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 4px;
    background: ${rhap_bar_color};
    border-radius: 2px;
  }

  .rhap_volume-indicator {
    box-sizing: border-box;
    position: absolute;
    width: 12px;
    height: 12px;
    margin-left: -6px;
    left: 0;
    top: -4px;
    background: ${rhap_theme_color};
    opacity: 0.9;
    border-radius: 50px;
    box-shadow: ${rhap_theme_color}88 0 0 3px;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }

  /* Utils */
  .rhap_button-clear {
    background-color: transparent;
    border: none;
    padding: 0;
    overflow: hidden;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
      transition-duration: 0.2s;
    }

    &:active {
      opacity: 0.95;
    }

    &:focus:not(:focus-visible) {
      outline: 0;
    }
  }
`
const SongHeader = styled.p`
  color: ${({ theme }) => theme.layout_links};
  text-align: center;
  width: 100%;
`
const StyledTransitionLink = styled(TransitionLink)`
  color: ${({ theme }) => theme.layout_links};
  transition: background-color 0.4s ease, color 0.4s ease;
  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.layout_links_hover};
  }
`

function AudioPlayer() {
  const {
    audioPlayer,
    loading,
    play,
    setPlay,
    setTime,
    song,
    songPlaying,
  } = useContext(AudioPlayerContext)

  const prevPlay = usePrevious(play)

  useEffect(() => {
    if (
      prevPlay !== undefined &&
      play !== null &&
      prevPlay !== play &&
      audioPlayer.current
    ) {
      const audio = audioPlayer.current.audio.current
      audio.currentTime = play
      setTime(play)
      setPlay(null)
      if (!audioPlayer.current.isPlaying()) {
        audio.play()
      }
    }
  }, [audioPlayer, play, prevPlay, setPlay, setTime])

  const handleListen = useCallback(event => setTime(event.target.currentTime), [
    setTime,
  ])

  return (
    <AudioPlayerContainer loading={loading ? "true" : ""}>
      {loading ? (
        <Loading />
      ) : (
        <H5AudioPlayer
          ref={audioPlayer}
          defaultPlay="00:00"
          header={
            <StyledTransitionLink
              to={songPlaying ? songPlaying.slug : "/"}
              {...(songPlaying ? songPlaying.transicion : {})}
            >
              <SongHeader>Resonancia Colectiva</SongHeader>

              {songPlaying && (
                <SongHeader>
                  {`${songPlaying.orden} - ${songPlaying.titulo} ~ by ${songPlaying.artista}`}
                </SongHeader>
              )}
            </StyledTransitionLink>
          }
          onListen={handleListen}
          src={song}
          volume={0.5}
        />
      )}
    </AudioPlayerContainer>
  )
}

export default AudioPlayer
