import {makeAutoObservable} from "mobx"

class Store {
  todoList = []

  constructor() {
    makeAutoObservable(this)
  }

  createTodoList(obj) {
    this.todoList = [...this.todoList, {
      id: new Date(),
      name: obj.name,
      email: obj.email,
      todo: obj.todo,
      isCompleted: false
    }]
  }

}

export const todoStore = new Store()