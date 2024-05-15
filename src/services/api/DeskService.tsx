import axios from "axios";
import { Desk } from "../types/types";
import { DeskWithColumns } from "../types/types";


export default class DeskService {
  static async getDeskById(id: string | undefined): Promise<Desk> {
    const response = await axios.get(`http://localhost:5000/desks/${id}`, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        return response["data"];
      }).catch((error) => {
        console.log(error);
        return null;
      }); 
    return response;
  }


  static async getDesks(): Promise<Desk[]> {
    const response = await axios.get(`http://localhost:5000/desks}`, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        return response["data"];
      }).catch((error) => {
        console.log(error);
        return null;
      }); 
    return response;
  }


  static async getUserDesks(id: string | undefined): Promise<Desk[]> {
    const response = await axios.get(`http://localhost:5000/desks/user-desks/${id}`, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        return response["data"];
      }).catch((error) => {
        console.log(error);
        throw new Error("Ошибка");
        return null;
      }); 
    return response;
  }


  static async getFullDesk(id: string | undefined): Promise<DeskWithColumns> {
    const response = await axios.get(`http://localhost:5000/desks/get-full/${id}`, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        return response["data"];
      }).catch((error) => {
        console.log(error);
        return null;
      }); 
    return response;
  }

  static async createDesk(name: string, users: string[]): Promise<Desk> {
    const response = await axios.post(`http://localhost:5000/desks`, {
      "name": name,
      "users": users
    }, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
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

  static async updateDesk(desk: Desk): Promise<Desk> {
    const response = await axios.put(`http://localhost:5000/desks`, {
      "_id": desk._id,
      "name": desk.name,
      "users": desk.users,
      "position": desk.position,
    }, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        return response["data"];
      }).catch((error) => {
        console.log(error);
        return null;
      }); 
    return response;
  }

  static async deleteDesk(id: string): Promise<Desk> {
    const response = await axios.delete(`http://localhost:5000/desks/${id}`, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        return response["data"];
      }).catch((error) => {
        console.log(error);
        return null;
      }); 
    return response;
  }
}