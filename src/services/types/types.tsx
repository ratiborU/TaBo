export type User = {
  _id: string,
  name: string,
  email: string,
  password: string,
  image: string,
  desks: string[]
}

export type Desk = {
  _id: string,
  name: string,
  users: string[],
  position: number
}

export type Column = {
  _id: string,
  name: string,
  deskId: string,
  position: number
}

export type Task = {
  _id: string,
  name: string,
  columnId: string,
  description: string,
  users: string[],
  result: string,
  files: string[],
  deadline: string,
  position: number
}

export type Comment = {
  _id: string,
  name: string,
  taskId: string,
  content: string,
  date: string 
}


export type DeskWithColumns = {
  _id: string,
  name: string,
  users: string[],
  position: number,
  columns: ColumnWithTasks[]
}

export type ColumnWithTasks = {
  _id: string,
  name: string,
  deskId: string,
  position: number,
  tasks: TaskWithComments[]
}

export type TaskWithComments = {
  _id: string,
  name: string,
  columnId: string,
  description: string,
  users: string[],
  result: string,
  files: string[],
  deadline: string,
  position: number,
  comments: Comment[]
}