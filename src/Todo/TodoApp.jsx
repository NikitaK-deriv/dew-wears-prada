import DisplayTodos from './DisplayTodos.jsx'
import Todos from './Todos.jsx'

import styled from 'styled-components'

const TodoStyle = styled.div`
  padding-top: 3rem;
  margin-left: 22rem;
  display: flex;
  flex-direction: column;
`

const ConstentStyle = styled.h1`
  display: inline;
  text-align: center;
  margin-bottom: 2rem;
  color: #e1ebfd;

  text-shadow: 0 0 5px #433aa8, 3px -1px 5px #271c6c;
`

function TodoApp() {
  return (
    <TodoStyle>
      <ConstentStyle initial={{ y: -200 }} animate={{ y: 0 }} transition={{ type: 'spring', duration: 0.5 }} whileHover={{ scale: 1.1 }}>
        Binary/Deriv Goals
      </ConstentStyle>
      <ConstentStyle initial={{ y: 1000 }} animate={{ y: 0 }} transition={{ type: 'spring', duration: 1 }}>
        <Todos />
        <DisplayTodos />
      </ConstentStyle>
    </TodoStyle>
  )
}

export default TodoApp
