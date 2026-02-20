import axios from "axios";
import { BaseApiUrl } from "../util/constants";


export const addItem = async (item) =>{
    return await axios.post(`${BaseApiUrl}/api/v1.0/admin/items`,item,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}
export const deleteItem= async (itemsId) =>{
    console.log(`${localStorage.getItem("token")}`)
    return await axios.delete(`${BaseApiUrl}/api/v1.0/admin/items/${itemsId}`,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}
export const fetchItems = async () =>{
    return await axios.get(`${BaseApiUrl}/api/v1.0/items`,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}

