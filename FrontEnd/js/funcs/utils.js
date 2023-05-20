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
   const gettokens= JSON.parse(localStorage.getItem('user'));
    return gettokens ? gettokens.token : null
}

const isLogin=()=>{
    const isuserLogin= getToken();
    return isuserLogin ? true : false
}



export { showswall , settoLocalStorage , getFromLocalStorage , getToken , isLogin}