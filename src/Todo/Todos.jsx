import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addTodos } from './Redux/reducer'
import { GoPlus } from 'react-icons/go'
import styled from 'styled-components'

const TodosStyle = styled.div`
  display: flex;
  justify-content: center;
`
const TodosInput = styled.input`
  min-width: 15rem;
  width: 40vw;
  max-height: 2.5rem;
  background-color: #e1ebfd;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  align-self: center;

  &:focus {
    outline: none;
    border: 2px solid rgb(67, 58, 168);
  }
`

const TodosButton = styled.button`
  margin-left: 1rem;
  background-color: #271c6c;
  color: #e1ebfd;
  border-radius: 50%;
  border: 2px solid #e1ebfd;
  font-size: 1.5rem;
  width: 3.2rem;
  height: 3.2rem;
  cursor: pointer;
  box-shadow: 2px 4px 10px #271c6c;

  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
  }
`

const mapStateToProps = (state) => {
  return {
    todos: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj))
  }
}

const Todos = (props) => {
  const [todo, setTodo] = useState('')

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const add = () => {
    if (todo === '') {
      alert('Input is Empty')
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        completed: false
      })
      setTodo('')
    }
  }

  return (
    <TodosStyle>
      <TodosInput type="text" onChange={(e) => handleChange(e)} value={todo} />
      <TodosButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => add()}>
        <GoPlus />
      </TodosButton>
      <br />
    </TodosStyle>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
