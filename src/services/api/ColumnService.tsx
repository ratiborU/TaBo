import axios from "axios";
import { Column } from "../types/types";


export default class ColumnService {
  static async getColumnById(id: string | undefined): Promise<Column> {
    const response = await axios.get(`http://localhost:5000/Columns/${id}`, {
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


  static async getColumns(): Promise<Column[]> {
    const response = await axios.get(`http://localhost:5000/Columns}`, {
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


  static async createColumn(name: string, deskId: string): Promise<Column> {
    const response = await axios.post(`http://localhost:5000/Columns`, {
      "name": name,
      "deskId": deskId
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

  static async updateColumn(column: Column): Promise<Column> {
    const response = await axios.put(`http://localhost:5000/Columns`, {
      "_id": column._id,
      "name": column.name,
      "deskId": column.deskId,
      "position": column.position,
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

  static async deleteColumn(id: string): Promise<Column> {
    const response = await axios.delete(`http://localhost:5000/Columns/${id}`, {
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