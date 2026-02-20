import axios from "axios";
import { BaseApiUrl } from "../util/constants";


export const addCategory = async (category) =>{
    return await axios.post(`${BaseApiUrl}/api/v1.0/admin/categories`,category,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}
export const deleteCategory = async (categoryCode) =>{
    return await axios.delete(`${BaseApiUrl}/api/v1.0/admin/categories/${categoryCode}`,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}
export const fetchCategories = async () =>{
    return await axios.get(`${BaseApiUrl}/api/v1.0/categories`,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}

