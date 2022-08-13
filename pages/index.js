import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import AddTodo from '../components/addTodo'
import TodoItem from '../components/todoItem'
import  { signOut, useSession } from 'next-auth/react'
import SortButton from '../components/sortButton'
import Pagination from '../components/pagination'
import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb+srv://alabama:alabama@todo.vioj8rc.mongodb.net/test', { useUnifiedTopology: true })



export default function Home({todos}) {
  const router = useRouter()
  const { data: session } = useSession()
  const todosList = JSON?.parse(todos) || []
  const [todo, setTodo] = useState(todosList)
  const [sorter, setSorter] = useState(-1)
  const [i, setI] = useState(0)
  const [text, setText] = useState({
    name: '',
    email: '',
    todo: '',
    admin: false,
  })

  useEffect(() => {
    const list = JSON.stringify(todo)
    axios.get(`/api/savetodo?text=${list}`)
  }, [todo])

  return (
    <div className="container">
      <Head>
        <title>TODO list</title>
        <meta name="description" content="TODO list" />
      </Head>

      <main className="main">
        <h1 className="title">TODO List</h1>
        {!session ? (
        <button
          className="loginButton"
          onClick={() => {
            router.push('/api/auth/signin')
          }}
        >
          Log in
        </button>
        ) : (
        <button
          className="loginButton"
          onClick={() => {
            signOut()
          }}
        >
          Log out
        </button>
        )}
        <AddTodo todo={todo} setTodo={setTodo} text={text} setText={setText}/>
        <div className="todoList">
          <div className="optionsPanel">
            Sort by:
            <SortButton sort="name" setTodo={setTodo} todo={todo} setSorter={setSorter} sorter={sorter}/>
            <SortButton sort="email" setTodo={setTodo} todo={todo} setSorter={setSorter} sorter={sorter}/>
            <SortButton sort="status" setTodo={setTodo} todo={todo} setSorter={setSorter} sorter={sorter}/>
          </div>
          <div className='allTodo'>
            {todo.slice(i * 3,  (i + 1)  * 3).map((it) => {
            return (
              <TodoItem
                key={Math.random()}
                todo={it}
                setTodo={setTodo}
                todoList={todo}
              />
            )
            })}
          </div>
          <Pagination length={todo.length} setI={setI}/>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  await client.connect()
  const db = client.db('todo')
  const collection = db.collection('todoList')
  const todoList = await collection.find().toArray()
  return {
    props: {todos: JSON.stringify(todoList) || null}
  }
}
