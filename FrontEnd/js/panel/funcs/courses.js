const getAllCourses=async()=>{
    const table=document.querySelector('.table')
    const res=await fetch('http://localhost:4000/v1/courses')
    const data=await res.json();
    data.forEach((item,index)=>{
        table.insertAdjacentHTML('beforeend',`
        <tbody>
        <tr>
            <td id="id">${index+1}</td>
            <td id="name">${item.name} </td>
            <td id="price">
              <a>${item.price? item.price : "رایگان"} </a>
            </td>
            <td id="register">${item.registers}</td>
            <td id="support">${item.support} </td>
            <td id="category">${item.categoryID} </td>
            <td id="avrage">${item.courseAverageScore} </td>
            <td id="iscomplat">${item.isComplete ? item.isComplete : "دوره در حال برگذاری است"}</td>
            <td>
                <button type="button" class="btn btn-primary" id="edit-btn">ویرایش </button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" id="delete-btn">حذف </button>
            </td>
        </tr>
    </tbody>
        `)
    })
    return data
}

const getCategory=async()=>{
    const categoryList=document.querySelector('.category-list')
    var category_id=-1;
    const res=await fetch(`http://localhost:4000/v1/category`)
    const data=await res.json()
    data.forEach(elem=>{
        categoryList.insertAdjacentHTML('beforeend',`
            <option value="${elem._id}">${elem.title}</option>
        `)
    })
    categoryList.addEventListener('change',(event)=>{
        category_id=event.target.value;
        console.log(category_id);
    })
    return data
}

export{ getAllCourses,getCategory }