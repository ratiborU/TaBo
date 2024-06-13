import axios from "axios";
import { IComment } from "../types/types";


export const getCommentById = async (id: string | undefined): Promise<IComment> => {
  const response = await axios.get(`http://localhost:5000/comments/${id}`, {
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


export const getComments = async (): Promise<IComment[]> => {
  const response = await axios.get(`http://localhost:5000/comments}`, {
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

export const createComment = async (userId: string, taskId: string, content: string, date: string): Promise<IComment> => {
  const response = await axios.post(`http://localhost:5000/comments`, {
    "user": userId,
    "username": "user",
    "taskId": taskId,
    "content": content,
    "date": date
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
  return response;
}