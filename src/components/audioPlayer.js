import React, { useContext } from "react"
import H5AudioPlayer from "react-h5-audio-player"
import styled from "@emotion/styled"
import { AudioPlayerContext } from "../context/audioPlayerContext"

// TODO add player colors?
const rhap_theme_color = ({ theme }) => theme.layout_links // theme.player_theme_color
const rhap_background_color = ({ theme }) => theme.layout
const rhap_bar_color = ({ theme }) => theme.layout_links // theme.player_bar_color
const rhap_time_color = ({ theme }) => theme.layout_links // theme.player_time_color

const AudioPlayerContainer = styled.div`
  .rhap_container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    line-height: 1;
    font-family: inherit;
    width: 100%;
    padding: 10px 15px;
    background-color: ${rhap_background_color};
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);

    &:focus:not(:focus-visible) {
      outline: 0;
    }

    svg {
      vertical-align: initial; // overwrite Bootstrap default
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
    height: 40px;
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

function AudioPlayer() {
  const { currentPlaying } = useContext(AudioPlayerContext)
  console.log(currentPlaying)
  return (
    <AudioPlayerContainer>
      <H5AudioPlayer src={currentPlaying} defaultCurrentTime="00:00" volume={0.5} />
    </AudioPlayerContainer>
  )
}

export default AudioPlayer
