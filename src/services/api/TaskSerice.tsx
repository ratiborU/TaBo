import axios from "axios";
import { ITask, IUser } from "../types/types";

export const getTaskById = async (id: string | undefined): Promise<ITask> => {
  const response = await axios.get(`http://localhost:5000/tasks/${id}`, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
    }
  })
    .then((response) => {
      return response["data"];
    }).catch((error) => {
      console.log(error);
      throw new Error(error.message);
    }); 
  return response;
}

export const getTasks = async (): Promise<ITask> => {
  const response = await axios.get(`http://localhost:5000/tasks`, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
    }
  })
    .then((response) => {
      return response["data"];
    }).catch((error) => {
      console.log(error);
      throw new Error(error.message);
    }); 
  return response;
}

export const createTask = async (name: string, columnId: string): Promise<ITask> => {
  console.log(columnId);
  const response = await axios.post(`http://localhost:5000/tasks`, {
    "name": name,
    "columnId": columnId
  }, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
    }
  })
    .then((response) => {
      return response["data"];
    }).catch((error) => {
      console.log(error);
      throw new Error(error.message);
    }); 
    console.log(response);
  return response;
}

export const updateTask = async (id: string, name: string, columnId: string, description: string, users: IUser[], result: string, deadline: string, position: number): Promise<ITask> => {
  console.log(columnId);
  const response = await axios.put(`http://localhost:5000/tasks`, {
    "_id": id,
    "name": name,
    "columnId": columnId,
    "description": description,
    "users": users,
    "result": result,
    "deadline": deadline,
    "position": position
  }, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
    }
  })
    .then((response) => {
      return response["data"];
    }).catch((error) => {
      console.log(error);
      throw new Error(error.message);
    }); 
    console.log(response);
  return response;
}


export const deleteTask = async (id: string): Promise<ITask> => {
  const response = await axios.delete(`http://localhost:5000/tasks/${id}`, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
    }
  })
    .then((response) => {
      return response["data"];
    }).catch((error) => {
      console.log(error);
      throw new Error(error.message);
    }); 
  return response;
}