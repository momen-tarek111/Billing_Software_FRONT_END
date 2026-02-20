import axios from "axios";
import { BaseApiUrl } from "../util/constants";


export const latestOrders = async () =>{
    return await axios.get(`${BaseApiUrl}/api/v1.0/orders/latest`,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}
export const createOrder = async (order) =>{
    return await axios.post(`${BaseApiUrl}/api/v1.0/orders`,order,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}
export const deleteOrder = async (id) =>{
    return await axios.delete(`${BaseApiUrl}/api/v1.0/orders/${id}`,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}

