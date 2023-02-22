import axios from 'axios'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { reducerCases } from '../untils/Constant'
import { useStateProvider } from '../untils/StateProvider'
const CurrentTrackContainer = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &-image {
    }
    &-info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &-track-name {
        color: white;
      }
      &-track-artists {
        color: #b3b3b3;
      }
    }
  }
`
const CurrentTrack = () => {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider()
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        'https://api.spotify.com/v1/me/player/currently-playing',
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        },
      )
      if (response.data !== '') {
        const { item } = response.data
        const currentlyPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artists) => artists.name),
          image: item.album.images[2].url,
        }
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying })
      }
      console.log(currentlyPlaying)
    }
    getCurrentTrack()
  }, [token, dispatch])
  return (
    <CurrentTrackContainer>
      {currentlyPlaying && (
        <div className="track">
          <div className="track-image">
            <img src={currentlyPlaying.image} alt="" />
          </div>
          <div className="track-info">
            <h4 className="track-info-track-name">{currentlyPlaying.name}</h4>
            <h6 className="track-info-track-artists">
              {currentlyPlaying.artists.join(', ')}
            </h6>
          </div>
        </div>
      )}
    </CurrentTrackContainer>
  )
}

export default CurrentTrack
