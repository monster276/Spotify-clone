import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { reducerCases } from '../untils/Constant'
import { useStateProvider } from '../untils/StateProvider'
import Body from './Body'
import Footer from './Footer'
import Navbar from './Navbar'
import Playlist from './Playlist'
import Sidebar from './Sidebar'
const ContainerStyles = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify-body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgba(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  }
`
const Spotify = () => {
  const [{ token }, dispatch] = useStateProvider()
  const bodyRef = useRef()
  const [navBackground, setNavBackGround] = useState(false)
  const [headerBackground, setHeaderBackGround] = useState(false)
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackGround(true)
      : setNavBackGround(false)
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackGround(true)
      : setHeaderBackGround(false)
  }
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
      }
      dispatch({ type: reducerCases.SET_USER, userInfo })
    }
    getUserInfo()
  }, [dispatch, token])
  return (
    <ContainerStyles>
      <div className="spotify-body">
        <Sidebar></Sidebar>
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground}></Navbar>
          <div className="body-contents">
            <Body headerBackground={headerBackground}></Body>
          </div>
        </div>
      </div>
      <div className="spotify-Footer">
        <Footer></Footer>
      </div>
    </ContainerStyles>
  )
}

export default Spotify
