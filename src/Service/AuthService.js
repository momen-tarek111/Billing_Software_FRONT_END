import axios from "axios"
import { BaseApiUrl } from "../util/constants"

export const login=async (data)=>{
    return await axios.post(`${BaseApiUrl}/api/v1.0/login`,data)
}