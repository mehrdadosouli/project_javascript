import { getToken } from "../../../js/funcs/utils.js";

const getAndRenderTickets=async()=>{
    const res=await fetch('http://localhost:4000/v1/tickets',{
        method:"GET",
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    })
    const data =await res.json();
    data.forEach(ticket=>{
        console.log(ticket);
    })
}

export { getAndRenderTickets }