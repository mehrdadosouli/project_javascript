const showswall = (title, icon, buttons, callback) => {
    swal({
      title,
      icon,
      buttons,
    }).then((result) => callback(result));
  };
  

const settoLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
    return localStorage.getItem(key)
}

const getToken = () => {
    const gettokens = JSON.parse(localStorage.getItem('user'));
    return gettokens ? gettokens.token : null
}

const isLogin = () => {
    const isuserLogin = getToken();
    return isuserLogin ? true : false
}
// -------------get data from url and redirect to category----------------
const getUrlParams = (key) => {
    const getparams = new URLSearchParams(window.location.search);
    return getparams.get(key)
}

// -------------search box for category.html------------------------------
const searchInputValue = (array, searchval) => {
    const resultValue = array.filter(item => item.name.includes(searchval));
    return resultValue;
}


// -------------pagination for category.html------------------------------
const paginationCategory = (row, array, currentpage) => {
    let allindex = array.length;
    let btncount = Math.ceil(allindex / row);
    let endindex = currentpage * row
    let startindex = endindex - row
    const paginationItem = array.slice(startindex, endindex)
    const coursepaginationlist = document.querySelector('.course-pagination__list')

    for (let i = 1; i < btncount + 1; i++) {
        coursepaginationlist.insertAdjacentHTML('beforeend', `
        <li class="course-pagination__item">
        ${i == Number(currentpage) ? `
           <a href="#" class="course-pagination__link link-actived" onclick="handlepagination(${i},'page')"> ${i}</a>
           ` : `
           <a href="#" class="course-pagination__link" onclick="handlepagination(${i},'page')"> ${i}</a>
           `
            }
          
        </li>
    `)
    }

    return paginationItem
}
const handlepagination = (i, page) => {
    console.log(i);
    let url = new URL(location.href);
    console.log(url);
    let setparam = url.searchParams;
    console.log(setparam);
    setparam.set(page, i);
    url.search = setparam.toString()
    location.href = url.toString()
}
export { showswall, settoLocalStorage, getFromLocalStorage, getToken, isLogin, getUrlParams, searchInputValue, paginationCategory, handlepagination  }
