import { getToken } from "../../funcs/utils.js"


const notificationalertbox=(notifications)=>{
    
    const notificationModalListElem = document.querySelector('.home-notification-modal-list')
    if (notifications.length) {
        notifications.forEach(notification => {
          notificationModalListElem.insertAdjacentHTML('beforeend', `
              <li class="home-notification-modal-item">
                  <span class="home-notification-modal-text">${notification.msg}</span>
                  <a onclick="seeNotification('${notification._id}')">دیدم</a>
              </li>
          `)
        })
      } else {
          notificationModalListElem.insertAdjacentHTML('beforeend', `
          <li class="home-notification-modal-item">
              <span class="home-notification-modal-text">پیغامی نیست</span>
              <a >دیدم</a>
          </li>
      `)
      }

    }
    const seeNotification=async(notificationsid)=>{
      const res = await fetch(`http://localhost:4000/v1/notifications/see/${notificationsid}`,{
      method:'PUT',
      headers:{
          Authorization:`Bearer ${getToken()}`
      }
    })
    const data=await res.json();
    console.log(data);
    }

export { notificationalertbox ,seeNotification}