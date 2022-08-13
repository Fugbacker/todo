import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true })

export default async function correctTodo(req, res) {
  const todo = JSON.parse(req.query.text)
  await client.connect()
  const db = client.db('todo')
  const collection = db.collection('todoItems')
  await collection.updateOne({id: todo.id}, { $set: {todo: todo.todo, status: todo.status, admin: todo.admin}})
  return res.status(200).json('Ok')
}