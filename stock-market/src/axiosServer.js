import axios from "axios"
export default ()=>{
    return axios.create({//54.193.249.19
        baseURL:'http://localhost:8000' // 
    })
}