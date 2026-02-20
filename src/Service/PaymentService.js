import axios from "axios";
import { BaseApiUrl } from "../util/constants";


export const createStripePayment = async (data) =>{
    return await axios.post(`${BaseApiUrl}/api/v1.0/payments/create-payment-intent`,data,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}
export const verifyPayment = async (paymentData) =>{
    return await axios.post(`${BaseApiUrl}/api/v1.0/payments/verify`,paymentData,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}});
}
