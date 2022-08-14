import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true })

export default async function saveTodo(req, res) {
  const todo = JSON.parse(req.query.text)
  const id = req.query.id
  await client.connect()
  const db = client.db('todo')
  const collection = db.collection('todoItems')
  await collection.insertOne({...todo, id: id})
  return res.status(200).json('Ok')
}
