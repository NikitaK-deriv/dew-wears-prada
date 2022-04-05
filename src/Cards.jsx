import * as THREE from 'three'

import { Image, Scroll, ScrollControls, useScroll } from '@react-three/drei'
import { damp, state } from './util'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'

import { MiniMap } from './Minimap'
import { useSnapshot } from 'valtio'

const Card = ({ index, position, scale, c = new THREE.Color(), ...props }) => {
  const ref = useRef()
  const scroll = useScroll()
  const { clicked, urls: topics } = useSnapshot(state)
  const [hovered, hover] = useState(false)

  const openCard = () => {
    document.location.href = '/info'
  }
  const click = () => (state.clicked = index === clicked ? openCard() : index)
  const over = () => hover(true)
  const out = () => hover(false)

  useFrame((state, delta) => {
    const current_position = scroll.curve(index / topics.length - 1.5 / topics.length, 4 / topics.length)
    ref.current.material.scale[1] = ref.current.scale.y = damp(ref.current.scale.y, clicked === index ? 5 : 4 + current_position, 8, delta)
    ref.current.material.scale[0] = ref.current.scale.x = damp(ref.current.scale.x, clicked === index ? 4.7 : scale[0], 6, delta)
    if (clicked !== null && index < clicked) ref.current.position.x = damp(ref.current.position.x, position[0] - 2, 6, delta)
    if (clicked !== null && index > clicked) ref.current.position.x = damp(ref.current.position.x, position[0] + 2, 6, delta)
    if (clicked === null || clicked === index) ref.current.position.x = damp(ref.current.position.x, position[0], 6, delta)

    ref.current.material.grayscale = damp(
      ref.current.material.grayscale,
      hovered || clicked === index ? 0 : Math.max(0, 1 - current_position),
      6,
      delta
    )
    ref.current.material.color.lerp(c.set(hovered || clicked === index ? 'white' : '#aaa'), hovered ? 0.3 : 0.1)
  })

  return <Image ref={ref} {...props} position={position} scale={scale} onClick={click} onPointerOver={over} onPointerOut={out} />
}

const Cards = ({ size = 0.7, gap = 0.15 }) => {
  const { urls: topics } = useSnapshot(state)
  const { width } = useThree((state) => state.viewport)
  const xW = size + gap

  return (
    <ScrollControls horizontal damping={10} pages={(width - xW + topics.length * xW) / width}>
      <MiniMap />
      <Scroll>
        {
          topics.map((topic, index) => <Card key={index} index={index} position={[index * xW, 0, 0]} scale={[size, 4, 1]} url={topic} />) /* prettier-ignore */
        }
      </Scroll>
    </ScrollControls>
  )
}

export default Cards
