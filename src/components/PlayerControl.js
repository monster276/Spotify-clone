import React from 'react'
import styled from 'styled-components'
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
  BsPauseCircleFill,
} from 'react-icons/bs'
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { FiRepeat } from 'react-icons/fi'
import { useStateProvider } from '../untils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../untils/Constant'
const PlayerControlStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .repeat {
    font-size: 2rem;
  }
`
const PlayerControl = () => {
  const [{ token, playerState }, dispatch] = useStateProvider()
  const changeState = async () => {
    const state = playerState ? 'pause' : 'play'
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    })
  }
  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true })
    const response1 = await axios.get(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
    if (response1.data !== '') {
      const currentPlaying = {
        id: response1.data.item.id,
        name: response1.data.item.name,
        artists: response1.data.item.artists.map((artist) => artist.name),
        image: response1.data.item.album.images[2].url,
      }
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying })
    } else {
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null })
    }
  }
  return (
    <PlayerControlStyle>
      <div className="shuffle">
        <BsShuffle></BsShuffle>
      </div>
      <div className="previous">
        <CgPlayTrackPrev
          onClick={() => changeTrack('previous')}
        ></CgPlayTrackPrev>
      </div>
      <div className="state">
        {playerState ? (
          <BsPauseCircleFill onClick={changeState}></BsPauseCircleFill>
        ) : (
          <BsFillPlayCircleFill onClick={changeState}></BsFillPlayCircleFill>
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrack('next')}></CgPlayTrackNext>
      </div>
      <div className="repeat">
        <FiRepeat></FiRepeat>
      </div>
    </PlayerControlStyle>
  )
}

export default PlayerControl
