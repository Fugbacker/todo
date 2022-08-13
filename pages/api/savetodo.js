import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb+srv://alabama:alabama@todo.vioj8rc.mongodb.net/test', { useUnifiedTopology: true })

export default async function saveTodo(req, res) {
  const todo = JSON.parse(req.query.text)
  await client.connect()
  const db = client.db('todo')
  const collection = db.collection('todo')
  await collection.insertOne(todo)
  return res.status(200).json('Ok')
}
