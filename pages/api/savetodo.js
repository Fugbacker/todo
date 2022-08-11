import * as fs from 'fs/promises'

export default async function saveTodo(req, res) {
  const todoList = req.query.text
  await fs.writeFile('/todo/todoList.json', todoList)

  res.status(200).json({ name: 'John Doe' })
}
