import { getToken } from "../../funcs/utils.js";
const homeProfileName=document.querySelector('#admin-name');
const adminwelcomename=document.querySelector('#admin-welcome-name');

  const res = await fetch(`http://localhost:4000/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  
  const admin = await res.json()
  homeProfileName.innerHTML=admin.name
  if(adminwelcomename){
    adminwelcomename.innerHTML=admin.name
  }

