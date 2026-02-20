import axios from "axios"
import { BaseApiUrl } from "../util/constants"

export const FetchDashboardData=async ()=>{
    return await axios.get(`${BaseApiUrl}/api/v1.0/dashboard`,{headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}})
}