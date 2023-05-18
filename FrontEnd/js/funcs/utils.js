const showswall=(title,icon,button,callback)=>{
    swal({title,icon,button})
    .then(result=>callback(result))
}

const settoLocalStorage=(key,value)=>{
   return localStorage.setItem(key,JSON.stringify(value))
}

const getFromLocalStorage=(key)=>{
    return localStorage.getItem(key)
}

const getToken=()=>{
    JSON.parse(localStorage.getItem('user')).token
}

export { showswall , settoLocalStorage , getFromLocalStorage , getToken}
