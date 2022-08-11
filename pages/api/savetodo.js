import * as fs from 'fs/promises'
const path = require('path');

export default async function saveTodo(req, res) {
  const todoList = req.query.text
  const pagesDirectory = path.resolve(process.cwd(), 'pages')
  await fs.writeFile(`${pagesDirectory}/todo/todoList.json`, todoList)

  res.status(200).json({ name: 'John Doe' })
}
