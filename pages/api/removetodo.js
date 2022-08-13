import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb+srv://alabama:alabama@todo.vioj8rc.mongodb.net/test', { useUnifiedTopology: true })

export default async function removeTodo(req, res) {
  const id = req.query.text
  await client.connect()
  const db = client.db('todo')
  const collection = db.collection('todo')
  await collection.deleteOne({_id : id})
  return res.status(200).json('Ok')
}
