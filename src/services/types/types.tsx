export type IUser = {
  _id: string,
  name: string,
  email: string,
  password: string,
  image: string,
  desks: string[]
}

export type IDesk = {
  _id: string,
  name: string,
  users: string[],
  position: number
}

export type IColumn = {
  _id: string,
  name: string,
  deskId: string,
  position: number
}

export type ITask = {
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

export type IComment = {
  _id: string,
  user: string,
  username: string,
  taskId: string,
  content: string,
  date: string 
}


export type IDeskWithColumns = {
  _id: string,
  name: string,
  users: IUser[],
  position: number,
  columns: IColumnWithTasks[]
}

export type IColumnWithTasks = {
  _id: string,
  name: string,
  deskId: string,
  position: number,
  tasks: ITaskWithComments[]
}

export type ITaskWithComments = {
  _id: string,
  name: string,
  columnId: string,
  description: string,
  users: string[],
  result: string,
  files: string[],
  deadline: string,
  position: number,
  comments: IComment[]
}