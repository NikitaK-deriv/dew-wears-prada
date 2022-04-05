import { motion } from 'framer-motion'
import React, { useRef } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { IoCheckmarkDoneSharp, IoClose } from 'react-icons/io5'
import styled from 'styled-components'

const CardStyle = styled.li`
  display: flex;
  flex-direction: column;
  background: rgb(180, 182, 218);
  background: radial-gradient(circle, hsla(237, 34%, 78%, 0.9) 0%, hsla(219, 88%, 94%, 0.9) 100%);

  margin: 0 1rem 1rem 0;
  height: 8rem;
  width: 18rem;
  border-radius: 0.5rem;
  padding: 1rem;

  position: relative;
`

const CardText = styled.textarea`
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  background-color: #e1ebfd;

  color: #271c6c;
  height: 70%;
`

const ItemButtons = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`

const StyledButton = styled.button`
  border-radius: 20%;
  border: none;
  margin: 0 0.6rem;
  font-size: 1.4rem;
  cursor: pointer;
  color: #271c6c;
  background-color: transparent;

  $:focus {
    outline: none;
  }
`
const DoneCard = styled.button`
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;
  background-color: #867bcd;
  border: 2px solid #272727;
  color: #e1ebfd;

  font-size: 0.8rem;
  padding: 0.3rem 1rem;
  border-radius: 20px;
`

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props

  const inputRef = useRef(true)

  const changeFocus = () => {
    inputRef.current.disabled = false
    inputRef.current.focus()
  }

  const update = (id, value, e) => {
    if (e.which === 13) {
      //here 13 is key code for enter key
      updateTodo({ id, item: value })
      inputRef.current.disabled = true
    }
  }
  return (
    <CardStyle
      initial={{ x: '150vw', transition: { type: 'spring', duration: 2 } }}
      animate={{ x: 0, transition: { type: 'spring', duration: 2 } }}
      whileHover={{
        scale: 0.9,
        transition: { type: 'spring', duration: 0.1 }
      }}
      exit={{
        x: '-60vw',
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: 'rgba(255,0,0,1)'
      }}
      key={item.id}>
      <CardText
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
      />
      <ItemButtons>
        <StyledButton whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.9 }} onClick={() => changeFocus()}>
          <AiFillEdit />
        </StyledButton>
        {item.completed === false && (
          <StyledButton
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: 'green' }}
            onClick={() => completeTodo(item.id)}>
            <IoCheckmarkDoneSharp />
          </StyledButton>
        )}
        <StyledButton whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.9 }} style={{ color: 'red' }} onClick={() => removeTodo(item.id)}>
          <IoClose />
        </StyledButton>
      </ItemButtons>
      {item.completed && <DoneCard>done</DoneCard>}
    </CardStyle>
  )
}

export default TodoItem
