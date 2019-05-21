import axios from "axios"
export default ()=>{
    return axios.create({
        baseURL:'http://shenyu16.com:8000' // 
    })
}