import React, { useState, useEffect } from 'react'
import  {useSession } from 'next-auth/react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import axios from 'axios'

const AdminForm = ({ todo, setTodo, todoList, id, isCorrect, setIsCorrect}) => {
  const [text, setText] = useState(todo.todo)
  const [checked, setChecked] = useState(true)
  const { data: session } = useSession()
  const [error, setError] = useState('')
  const [validForm, setValidForm] = useState(false)

  const correctedTodo = {
    id: todo.id,
    name: todo.name,
    email: todo.email,
    todo: text,
    status: checked,
    admin: true,
  }

  const handler = (e) => {
    setText(e.target.value)
    if (e.target.value.length < 3 || !e.target.value) {
      setError( 'Todo must contain over 3 symbol')
    } else {
      setError('')
    }
  }

  useEffect(() => {
    if (error) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [error])

  return (
    <>
    {session &&
    <div className="adminForm">
      {error && <div className="errorAlert">{error}</div> }
      <input
        type="text"
        value={text}
        name="todo"
        onChange={e => handler(e)}
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
        disabled={!validForm}
        onClick={() => {
          const todoIndex = todoList.findIndex((it) => it.id === id)
          setTodo([...todoList], todoList[todoIndex].todo = text, todoList[todoIndex].status = checked, todoList[todoIndex].admin = true)
          setIsCorrect(!isCorrect)
          setValidForm(false)
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