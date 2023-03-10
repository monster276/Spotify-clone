import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../untils/StateProvider'
const VolumeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`
const Volume = () => {
  const [{ token }] = useStateProvider()
  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  return (
    <VolumeContainer>
      <input type="range" min={0} max={100} onMouseUp={(e) => setVolume(e)} />
    </VolumeContainer>
  )
}

export default Volume
