const getToken=()=>{
    const data=JSON.parse(localStorage.getItem('user')).token
    return data ? data : null
}

export { getToken }