import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import styled from 'styled-components'
import Cards from './Cards'
import { state } from './util'

const CardHeader = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 30px;
  color: red;
`

const Scroller = styled.div`
  width: 100%;
  height: 50%;
  padding-top: 40rem;
`

const App = () => (
  <CardHeader>
    Some topics to discuss
    <Suspense fallback={null}>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]} onPointerMissed={() => (state.clicked = null)}>
        <Cards />
      </Canvas>
    </Suspense>
  </CardHeader>
)

export default App
