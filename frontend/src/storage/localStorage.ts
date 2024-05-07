import { User } from "../interfaces/interfaces";


export const storageSetUser = (user:User) => {
  localStorage.setItem("user", JSON.stringify(user));
}

export const storageGetUser = () => {
    const userString = localStorage.getItem("user");
    const user:User = userString ? JSON.parse(userString) : null

    return user;
  }

export const storageGetToken = () => {
    const token = localStorage.getItem("token");
    return token;
  }

export const storageSetToken = (token:string) => {
  localStorage.setItem("token", token);
}


export function isLogged() {
    const token = storageGetToken();
    if (!token) {
      return false;
    }
    return true;
  }