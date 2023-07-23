const getToken=()=>{
    const data=JSON.parse(localStorage.getItem('user')).token
    return data ? data : null
}

const showswall=(title,icon,buttons,callback)=>{
    swal({    
      title,
      icon ,
      buttons,
    }).then(result=>callback(result))
}


export { getToken , showswall}

