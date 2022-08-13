import React, { useState } from 'react'
import  {useSession } from 'next-auth/react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import axios from 'axios'

const AdminForm = ({ todo, setTodo, todoList, id, isCorrect, setIsCorrect}) => {
  const [text, setText] = useState(todo.todo)
  const [checked, setChecked] = useState(true)
  const { data: session } = useSession()
  const correctedTodo = {
    id: todo.id,
    name: todo.name,
    email: todo.email,
    todo: text,
    status: checked,
    admin: true,
  }

  return (
    <>
    { session &&
    <div className="adminForm">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="completeTask">
       <div><AiOutlineCheckCircle className="checkIcon" size={23}/></div>
       <input type="radio" name="complete" value="complete" checked={checked} onClick={() => {setChecked(true)}}/>
      </div>

      <div className="noCompleteTask">
        <div><BiTimeFive className="statusInProgress" size={23}/></div>
        <input type="radio"name="not complete" value="not complete" checked={!checked} onClick={() => {setChecked(false)}}/>
      </div>

      <button
        className="submit"
        onClick={() => {
          const todoIndex = todoList.findIndex((it) => it.id === id)
          setTodo([...todoList], todoList[todoIndex].todo = text, todoList[todoIndex].status = checked, todoList[todoIndex].admin = true)
          setIsCorrect(!isCorrect)
          axios.get(`/api/correcttodo?text=${JSON.stringify(correctedTodo)}`)
        }}
      >
        submit
      </button>
    </div>
    }
    </>
  )
}

export default AdminForm