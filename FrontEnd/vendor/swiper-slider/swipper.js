const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    speed: 400,
    slidesPerView: 'auto',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // when window width is >= 480px
        780: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        // when window width is >= 640px
        1000: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      },
  
    // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });