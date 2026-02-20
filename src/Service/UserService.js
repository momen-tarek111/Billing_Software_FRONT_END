import axios from "axios";
import { BaseApiUrl } from "../util/constants";


export const addUser = async (user) =>{
    return await axios.post(`${BaseApiUrl}/api/v1.0/admin/register`,user,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}
export const deleteUser = async (userId) =>{
    console.log(`${localStorage.getItem("token")}`)
    return await axios.delete(`${BaseApiUrl}/api/v1.0/admin/users/${userId}`,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}
export const fetchUsers = async () =>{
    return await axios.get(`${BaseApiUrl}/api/v1.0/admin/users`,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}

