import axios from "axios";
import { User } from "../types/types";
// import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { setUser, selectUser } from "../redux/fiatures/userSlice";


export default class AuthService {
  static async registration(name: string, email: string, password: string): Promise<User> {
    const response =  await axios.post(`http://localhost:5000/auth/registration`, {
      "name": name,
      "email": email,
      "password": password,
      "image": "a.jpg",
    })
      .then((response) => {
        return response["data"];
      }).catch((error) => {
        console.log(error);
        throw new Error(error.response.data);
      }); 
    return {...response, password: password};
  }

  static async login(email: string, password: string): Promise<User> {
    const response =  await axios.post(`http://localhost:5000/auth/login`, {
      "email": email,
      "password": password
    })
      .then((response) => {
        window.localStorage.setItem("token", response.data.token.token);
        return response.data.token.user;
      }).catch((error) => {
        console.log(error);
        throw new Error(error.response.data);
      }); 
    return response;
  }
}