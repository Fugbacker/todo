import React, { useState } from 'react'
import AdminForm from './adminForm'
import axios from 'axios'
import  {useSession } from 'next-auth/react'
import { BiTimeFive } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import { AiTwotoneEdit } from 'react-icons/ai'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { MdPublishedWithChanges } from 'react-icons/md'

const TodoItem = ({todo, setTodo, todoList}) => {
  const [isCorrect, setIsCorrect] = useState(false)
  const { data: session } = useSession()

  return (
    <div className="todoContainer">
      <div className="todoItem">
        <>
          <div className="name">{todo.name}</div>
          <div className="mail">{todo.email}</div>
          <div className="todoText">{todo.todo}</div>
        </>
        <div className="buttonContainer">
          {!todo.status ? (
            <div className="status"><BiTimeFive className="statusInProgress" size={25}/></div>
          ) : (
            <div className="status"><AiOutlineCheckCircle className="statusIsComplete" size={25}/></div>
          )}
            {session &&
              (
                <>
                  <div
                    className="correct"
                    onClick={() => {
                      setIsCorrect(!isCorrect)
                    }}
                  >
                    <AiTwotoneEdit className="editIcon" size={20}/>
                  </div>
                  <div className="trash"
                    onClick={() => {
                      const todoToDelete = [...todoList].filter(it => it._id === todo._id)[0]
                      setTodo([...todoList].filter(it => it._id !== todo._id))
                      const id = todoToDelete._id
                      axios.get(`/api/removetodo?text=${id}`)
                    }}
                  >
                    <BsTrash className="trashIcon" size={20}/>
                  </div>
                </>
              )
            }
            {todo.admin  && <div className="isChanged"><MdPublishedWithChanges className="statusIsComplete" size={25}/></div>}
        </div>
      </div>
      {isCorrect && <AdminForm textTodo={todo.todo} setTodo={setTodo} id={todo.id} todoList={todoList} isCorrect={isCorrect} setIsCorrect={setIsCorrect}/>}
    </div>
  )
}

export default TodoItem