const table = document.querySelector(".table tbody");
const getAllCategory = async () => {
    const res = await fetch('http://localhost:4000/v1/category');
    const data = await res.json();
    console.log(data);
    table.innerHTML = "";
    data.forEach((item, index) => {
        table.insertAdjacentHTML('beforeend', `
        <tr>
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td>${item.name}</td>
            <td>
                <button type='button' onclick="editeBtncourse('${item._id}')" class='btn btn-danger delete-btn'>ویرایش</button>
            </td>
            <td>
                <button type='button' onclick="deleteBtncourse('${item._id}')" class='btn btn-danger delete-btn'>حذف</button>
            </td>
        </tr>
    `)
    })
}

const deleteBtncourse=(id)=>{

}

export { getAllCategory }