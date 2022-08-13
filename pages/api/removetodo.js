import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true })

export default async function removeTodo(req, res) {
  const id = req.query.text
  await client.connect()
  const db = client.db('todo')
  const collection = db.collection('todoItems')
 await collection.deleteOne({id : id})
  return res.status(200).json('Ok')
}
