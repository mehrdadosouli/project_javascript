import { getToken } from "../utils/auth.js"
let table = document.querySelector('.order__table-body')
const getAndRenderOrder = async () => {
    const res = await fetch('http://localhost:4000/v1/orders', {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    const data = await res.json();
    data.forEach((tables, index) => {
        Array(tables).forEach(item => {
            table.insertAdjacentHTML('beforeend', `
    <br>
    <tr class="order__table-header-list">
        <th class="order__table-header-item">${index + 1}</th>
        <th class="order__table-header-item">${item.course.createdAt.slice(0, 10)}</th>
        <th class="order__table-header-item">${item.price}</th>
        <th class="order__table-header-item">${item.course.name}</th>
    </tr>
    <br>
    <hr style="width:885%">
    `)
        })
    })
}


export { getAndRenderOrder } 