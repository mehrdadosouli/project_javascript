// import { getToken } from "../../funcs/utils.js";

const getAllArticle=async()=>{
    const res=await fetch(`http://localhost:4000/v1/articles`);
    const data=await res.json();
    console.log(data);
}

export { getAllArticle }