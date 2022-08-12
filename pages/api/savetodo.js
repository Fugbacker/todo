import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb+srv://alabama:alabama@todo.vioj8rc.mongodb.net/test', { useUnifiedTopology: true })

export default async function saveTodo(req, res) {
  const todoList = JSON.parse(req.query.text)
  console.log('TODOLIST', todoList)
  await client.connect()
  const db = client.db('todo')
  const collection = db.collection('todo')
  await collection.deleteMany({})

  if (todoList.length !==0) {
    todoList.map(async (it) => {
      await collection.insertOne(it)
    })
   return res.status(200).json({ name: 'John Doe' })
  }

  await collection.deleteMany({})

  return res.status(200).json({ name: 'John Doe' })
}
