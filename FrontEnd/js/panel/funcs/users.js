import { getToken } from "../../funcs/utils.js";
const getAndRenderUser=async()=>{
    const res=await fetch(`http://localhost:4000/v1/users`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    });
    const data=await res.json();
    return data
}

export { getAndRenderUser }