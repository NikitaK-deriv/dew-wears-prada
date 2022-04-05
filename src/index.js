import './styles.css'

import React, { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App'
import OpenedCard from './OpenedCard'
import ReactDOM from 'react-dom'

import styled from 'styled-components'

const Footer = styled.a`
  pointer-events: all;
  color: #a0a0a0;
  text-decoration: none;
`

const HackhathonInfo = styled.div`
  position: absolute;
  color: red;
  top: 0px;
  right: 80px;
  font-size: 13px;
`

const OverlayStyle = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  overflow: hidden;
  pointer-events: none;
  width: 100%;
`

const Overlay = () => {
  return (
    <OverlayStyle>
      <Footer href="https://deriv.com/">Dev Wear Prada</Footer>
      <HackhathonInfo>Deriv Hackhathon - March 2022</HackhathonInfo>
    </OverlayStyle>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/info" element={<OpenedCard />} />
    </Routes>
    <Overlay />
  </BrowserRouter>,
  document.getElementById('root')
)
