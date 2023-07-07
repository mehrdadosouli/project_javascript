import { getAndShowCategoryCourses, getAndRenderMenu, shareTopbarList, userInfos, showTemplatecourses,showFilteringcourses } from "./funcs/shared.js";
import { searchInputValue ,paginationCategory,getUrlParams,handlepagination } from "./funcs/utils.js";

window.handlepagination=handlepagination;
window.addEventListener('load', () => {
    shareTopbarList()
    getAndRenderMenu()
    userInfos()
    getAndShowCategoryCourses().then(data => {
        const categorycourscontents = document.querySelector('.courses-top-bar__selection-contents');
        const categorycourseSelection = document.querySelectorAll('.courses-top-bar__selection-item');
        const coursesBox = document.getElementById('courses-box');
        const geturl=getUrlParams('page');
        var course =data;
        let bydefault = 'column';
        // ------------------------------first load page show category items----------------------
         // selection row and column selectbtn         
        const topbarright = document.querySelectorAll('.courses-tab-bar');
        topbarright.forEach(item => {
            item.addEventListener('click', (event) => {
                topbarright.forEach(elem => {
                    elem.classList.remove('top-bar__right-column-active')
                })
                event.target.classList.add('top-bar__right-column-active');
                if (event.target.className.includes('row')) {
                    bydefault = 'row';
                    coursesBox.innerHTML = "";
                    showTemplatecourses(bydefault, coursesBox, course)
                } else {
                    bydefault = 'column';
                    coursesBox.innerHTML = "";
                    showTemplatecourses(bydefault, coursesBox, course)
                }
            })
            
        })
        // selection input filtering selectbox
        categorycourseSelection.forEach(item => {
            item.addEventListener('click', (event) => {
                categorycourseSelection.forEach(elem => { elem.classList.remove('top-bar__selection-item-active') });
                event.target.classList.add('top-bar__selection-item-active');
                categorycourscontents.innerHTML = "";
                categorycourscontents.insertAdjacentHTML('beforeend', `
                <span class="courses-top-bar__selection-text">
                    ${event.target.innerHTML}
                </span>
                <i class="courses-top-bar__selection-icon-down fas fa-angle-down"></i>
                `);
                const elementSelected=event.target.dataset.key;
                const showfilter= showFilteringcourses(elementSelected,[...course]);
                showTemplatecourses(bydefault,coursesBox,showfilter);
            })
        })
        // ---select input search box for courses
        const inputsearchvalue=document.querySelector('.courses-top-bar__left-input');
        inputsearchvalue.addEventListener('input',(event)=>{
                const result=event.target.value;
               const resultinputfilter= searchInputValue(course,result);
                       if(!resultinputfilter.length){
                        coursesBox.innerHTML="";
                        coursesBox.insertAdjacentHTML('beforeend',`
                            <div style="width:100%;background-Color:#004aff75;height:30px;color:white">هیچ ایتمی وجود ندارد</div>
                        `)
                    }else{
                        showTemplatecourses(bydefault, coursesBox,resultinputfilter);
                       }
        })

        
        const pagination=paginationCategory(3,course,geturl);
        showTemplatecourses(bydefault,coursesBox,pagination)

    })
    
})
