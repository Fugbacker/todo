import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb+srv://alabama:alabama@todo.vioj8rc.mongodb.net/test', { useUnifiedTopology: true })

export default async function saveTodo(req, res) {
  const todoList = JSON.parse(req.query.text)
  await client.connect()
  const db = client.db('todo')
  const collection = db.collection('todoList')
  const oldTodoList = JSON.stringify(await collection.find().toArray())
  if (req.query.text !== oldTodoList && todoList.length !==0) {
    await collection.deleteMany({})
    todoList.map(async (it) => {
      await collection.insertOne(it)
    })
    // await collection.insertMany(todoList)
   return res.status(200).json({ name: 'John Doe' })
  }

  return res.status(200).json({ name: 'John Doe' })
}
