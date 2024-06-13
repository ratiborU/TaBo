import axios from "axios";
import { IDesk } from "../types/types";
import { IDeskWithColumns } from "../types/types";


export const getDeskById = async (id: string | undefined): Promise<IDesk> => {
  const response = await axios.get(`http://localhost:5000/desks/${id}`, {
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


export const getDesks = async (): Promise<IDesk[]> => {
  const response = await axios.get(`http://localhost:5000/desks}`, {
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


export const getUserDesks = async (id: string | undefined): Promise<IDesk[]> => {
  const response = await axios.get(`http://localhost:5000/desks/user-desks/${id}`, {
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


export const getFullDesk = async (id: string | undefined): Promise<IDeskWithColumns> => {
  const response = await axios.get(`http://localhost:5000/desks/get-full/${id}`, {
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
    // console.log(response);
  return response;
}

export const createDesk = async (name: string, users: string[]): Promise<IDesk> => {
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
      throw new Error(error.message);
    }); 
  return response;
}

export const updateDesk = async (desk: IDesk): Promise<IDesk> => {
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
      throw new Error(error.message);
    }); 
  return response;
}

export const deleteDesk = async (id: string): Promise<IDesk> => {
  const response = await axios.delete(`http://localhost:5000/desks/${id}`, {
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

export const addUserToDesk = async (userId: string, deskId: string): Promise<IDesk> => {
  const response = await axios.patch(`http://localhost:5000/desks/add-user`, {
    "userId": userId,
    "deskId": deskId,
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


// export default class DeskService {
//   static async getDeskById(id: string | undefined): Promise<IDesk> {
//     const response = await axios.get(`http://localhost:5000/desks/${id}`, {
//       headers: {
//         "Authorization": `Bearer ${window.localStorage.getItem("token")}`
//       }
//     })
//       .then((response) => {
//         return response["data"];
//       }).catch((error) => {
//         console.log(error);
//         return null;
//       }); 
//     return response;
//   }


//   static async getDesks(): Promise<IDesk[]> {
//     const response = await axios.get(`http://localhost:5000/desks}`, {
//       headers: {
//         "Authorization": `Bearer ${window.localStorage.getItem("token")}`
//       }
//     })
//       .then((response) => {
//         return response["data"];
//       }).catch((error) => {
//         console.log(error);
//         return null;
//       }); 
//     return response;
//   }


//   static async getUserDesks(id: string | undefined): Promise<IDesk[]> {
//     const response = await axios.get(`http://localhost:5000/desks/user-desks/${id}`, {
//       headers: {
//         "Authorization": `Bearer ${window.localStorage.getItem("token")}`
//       }
//     })
//       .then((response) => {
//         return response["data"];
//       }).catch((error) => {
//         console.log(error);
//         throw new Error("Ошибка");
//         return null;
//       }); 
//     return response;
//   }


//   static async getFullDesk(id: string | undefined): Promise<IDeskWithColumns> {
//     const response = await axios.get(`http://localhost:5000/desks/get-full/${id}`, {
//       headers: {
//         "Authorization": `Bearer ${window.localStorage.getItem("token")}`
//       }
//     })
//       .then((response) => {
//         return response["data"];
//       }).catch((error) => {
//         console.log(error);
//         return null;
//       }); 
      
//     return response;
//   }

//   static async createDesk(name: string, users: string[]): Promise<IDesk> {
//     const response = await axios.post(`http://localhost:5000/desks`, {
//       "name": name,
//       "users": users
//     }, {
//       headers: {
//         "Authorization": `Bearer ${window.localStorage.getItem("token")}`
//       }
//     })
//       .then((response) => {
//         return response["data"];
//       }).catch((error) => {
//         console.log(error);
//         return null;
//       }); 
//       console.log(response);
//     return response;
//   }

//   static async updateDesk(desk: IDesk): Promise<IDesk> {
//     const response = await axios.put(`http://localhost:5000/desks`, {
//       "_id": desk._id,
//       "name": desk.name,
//       "users": desk.users,
//       "position": desk.position,
//     }, {
//       headers: {
//         "Authorization": `Bearer ${window.localStorage.getItem("token")}`
//       }
//     })
//       .then((response) => {
//         return response["data"];
//       }).catch((error) => {
//         console.log(error);
//         return null;
//       }); 
//     return response;
//   }

//   static async deleteDesk(id: string): Promise<IDesk> {
//     const response = await axios.delete(`http://localhost:5000/desks/${id}`, {
//       headers: {
//         "Authorization": `Bearer ${window.localStorage.getItem("token")}`
//       }
//     })
//       .then((response) => {
//         return response["data"];
//       }).catch((error) => {
//         console.log(error);
//         return null;
//       }); 
//     return response;
//   }
// }