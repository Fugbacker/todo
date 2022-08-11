import React, { useState, useEffect } from 'react'
import Input from './input'
import { BsPlusCircle } from 'react-icons/bs'

const AddTodo = ({ todo, setTodo, text, setText }) => {
  const [validation, setValidation] = useState({
    name: false,
    email: false,
    todo: false,
  })

  const [error, setError] = useState({
    name: 'Name cant be empty',
    email: 'Email cant be empty',
    todo: 'Todo cant be empty',
  })

  const [validForm, setValidForm] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDone(false)
    }, 2000)
  }, [done])

  return (
    <div className="inputContainer">
      <Input setText={setText} text={text} placeholder={'name'} validation={validation} setValidation={setValidation} error={error} setError={setError} setValidForm={setValidForm}/>
      <Input setText={setText} text={text} placeholder={'email'} validation={validation} setValidation={setValidation} error={error} setError={setError} setValidForm={setValidForm}/>
      <Input setText={setText} text={text} placeholder={'todo'} validation={validation} setValidation={setValidation} error={error} setError={setError} setValidForm={setValidForm}/>
      <button
        className="addButton"
        disabled={!validForm}
        onClick={() => {
          setTodo([
            {
            id: new Date(),
            name: text.name,
            email: text.email,
            todo: text.todo,
            status: false
          },
          ...todo])
          setText({
            name: '',
            email: '',
            todo: '',
          })
          setDone(true)
          setValidForm(false)
        }}
      >
        add
        <BsPlusCircle size={24}/>
      </button>
      {done && (
        <div className="done">Done</div>
      )}
    </div>
  )
}

export default AddTodo