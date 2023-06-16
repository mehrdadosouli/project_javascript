import { getToken } from "../../funcs/utils.js"


const notificationModalListElem = document.querySelector('.home-notification-modal-list')
const notificationalertbox=(notifications)=>{
    
    if (notifications.length) {
        notifications.forEach(notification => {
          notificationModalListElem.insertAdjacentHTML('beforeend', `
              <li class="home-notification-modal-item">
                  <span class="home-notification-modal-text">${notification.msg}</span>
                  <a onclick='seeNotification(${JSON.stringify(notifications)},${JSON.stringify(notification._id)})'>دیدم</a>
              </li>
          `)
        })
      } else {
          notificationModalListElem.insertAdjacentHTML('beforeend', `
          <li style="background-color:green" class="home-notification-modal-item">
              <span class="home-notification-modal-text">پیغامی نیست</span>
          </li>
      `)
      }

    }
    const seeNotification=async(notifications,notificationsid)=>{
      const res = await fetch(`http://localhost:4000/v1/notifications/see/${notificationsid}`,{
      method:'PUT',
      headers:{
          Authorization:`Bearer ${getToken()}`
      }
    });
    filteredNotification(notifications,notificationsid);
    const data=await res.json();
    console.log(data);
    }

    const filteredNotification=(notifications,notificationsid)=>{
        notificationModalListElem.innerHTML="";
       const resultFiltered= notifications.filter(elem=>elem._id !== notificationsid);
       notificationalertbox(resultFiltered)
    }

export { notificationalertbox ,seeNotification}