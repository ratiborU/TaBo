import axios from "axios";
import { User } from "../types/types";


export default class UserService {
  static async getUserById(id: string | undefined): Promise<User> {
    const response =  await axios.get(`http://localhost:5000/users/${id}`, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDJmNmY4ZmFhMWYyYTBiM2NiZTEzOSIsImlhdCI6MTcxMTU1ODE2OSwiZXhwIjoxNzExODE3MzY5fQ.t4DM0wxiG2rbrMqoWKhg2AIGU-VL2U-zY0QnxHnWsfw"
      }
    })
      .then((response) => {
        return response["data"];
      }).catch((error) => {
        console.log(error);
        return null;
      }); 
      console.log(response);
    return response;
  }

  static async getUsers(): Promise<User[]> {
    const response =  await axios.get(`http://localhost:5000/users}`, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDJmNmY4ZmFhMWYyYTBiM2NiZTEzOSIsImlhdCI6MTcxMTU1ODE2OSwiZXhwIjoxNzExODE3MzY5fQ.t4DM0wxiG2rbrMqoWKhg2AIGU-VL2U-zY0QnxHnWsfw"
      }
    })
      .then((response) => {
        return response["data"];
      }).catch((error) => {
        console.log(error);
        return null;
      }); 
      console.log(response);
    return response;
  }
}