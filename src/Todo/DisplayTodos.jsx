import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addTodos, completeTodos, removeTodos, updateTodos } from './Redux/reducer'
import TodoItem from './TodoItem.jsx'
import { AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

const DisplayTodosStyle = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const DisplayButtonsStyle = styled.div`
  margin-bottom: 2rem;
`
const ButtonStyle = styled.button`
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  border: none;

  $:focus {
    outline: none;
  }
  $:not(:last-child) {
    margin-right: 1rem;
  }
`

const TodoInfo = styled.ul`
  list-style: none;
  display: flex;
  align-self: flex-start;
  flex-wrap: wrap;
  margin-left: 5%;
`

const mapStateToProps = (state) => {
  return {
    todos: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id))
  }
}

const DisplayTodos = (props) => {
  const [sort, setSort] = useState('active')
  return (
    <DisplayTodosStyle>
      <DisplayButtonsStyle>
        <ButtonStyle whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSort('active')}>
          Active
        </ButtonStyle>
        <ButtonStyle whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSort('completed')}>
          Completed
        </ButtonStyle>
        <ButtonStyle whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSort('all')}>
          All
        </ButtonStyle>
      </DisplayButtonsStyle>
      <TodoInfo>
        <AnimatePresence>
          {props.todos.length > 0 && sort === 'active'
            ? props.todos.map((item) => {
                return (
                  item.completed === false && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                )
              })
            : null}
          {/* for completed items */}
          {props.todos.length > 0 && sort === 'completed'
            ? props.todos.map((item) => {
                return (
                  item.completed === true && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                )
              })
            : null}
          {/* for all items */}
          {props.todos.length > 0 && sort === 'all'
            ? props.todos.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    completeTodo={props.completeTodo}
                  />
                )
              })
            : null}
        </AnimatePresence>
      </TodoInfo>
    </DisplayTodosStyle>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos)
