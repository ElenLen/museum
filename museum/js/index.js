$(document).ready(function () {
  const burgerBtn = document.getElementById("burger");
  const mobileMenu = document.getElementById("burger-menu");
  const closeBtn = document.getElementById("close");
  // const welcomeText = document.querySelector(".welcome-text");

  //   const burgerBtn = document.getElementById('burgerBtn');
  // const navMenu = document.getElementById('navMenu');

  // Функция для закрытия меню
  // function closeMenu() {
  //   mobileMenu.classList.remove("open");
  //   burgerBtn.classList.remove("active");
  //   document.removeEventListener("mousedown", handleOutsideClick);
  //   document.removeEventListener("scroll", closeMenu);
  // }

  // // Клик по бургеру
  // burgerBtn.addEventListener("click", function (e) {
  //   mobileMenu.classList.toggle("open");
  //   burgerBtn.classList.toggle("active");
  //   if (mobileMenu.classList.contains("open")) {
  //     document.addEventListener("mousedown", handleOutsideClick);
  //     document.addEventListener("scroll", closeMenu, { passive: true });
  //   } else {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //     document.removeEventListener("scroll", closeMenu);
  //   }
  // });

  // // Клик вне меню
  // function handleOutsideClick(e) {
  //   if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
  //     closeMenu();
  //   }
  // }

  // // Клик по пункту меню (делегирование)
  // mobileMenu.addEventListener("click", function (e) {
  //   if (e.target.tagName === "A") {
  //     // Переход по ссылке — закрываем меню
  //     closeMenu();
  //   }
  // });

  burgerBtn.addEventListener("click", function (e) {
    mobileMenu.classList.toggle("open");
    burgerBtn.classList.toggle("active");
    burgerBtn.style.display = "none";
    // welcomeText.style.display = "none";
    closeBtn.style.display = "block";
    if (mobileMenu.classList.contains("open")) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("scroll", closeMenu);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.addEventListener("scroll", closeMenu);
    }
  });

  function handleOutsideClick(e) {
    // Проверяем, что клик был вне меню и вне самой кнопки
    if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
      closeMenu();
    }
  }

  // Функция для закрытия меню
  function closeMenu() {
    mobileMenu.classList.remove("open");
    burgerBtn.classList.remove("active");
    document.removeEventListener("mousedown", handleOutsideClick);
    document.removeEventListener("scroll", closeMenu);
    burgerBtn.style.display = "block";
    // welcomeText.style.display = "flex";
    closeBtn.style.display = "none";
  }

  // burgerMenu.addEventListener("click", function () {
  //   burgerMenu.classList.toggle("open");
  //   mobileMenu.classList.toggle("open");
  //   burgerMenu.style.display = "none";
  //   welcomeText.style.display = "none";
  //   closeBtn.style.display = "block";
  // });

  // closeBtn.addEventListener("click", function () {
  //   burgerMenu.classList.remove("open");
  //   mobileMenu.classList.remove("open");
  //   burgerMenu.style.display = "block";
  //   welcomeText.style.display = "flex";
  //   closeBtn.style.display = "none";
  // });

  // mobileMenu.addEventListener("click", function () {
  //   burgerMenu.classList.remove("open");
  //   mobileMenu.classList.remove("open");
  //   burgerMenu.style.display = "block";
  //   welcomeText.style.display = "flex";
  //   closeBtn.style.display = "none";
  // });

  // document.addEventListener("click",  (e) => {
  //   burgerMenu.classList.remove("open");
  //   mobileMenu.classList.remove("open");
  //   burgerMenu.style.display = "block";
  //   welcomeText.style.display = "flex";
  //   closeBtn.style.display = "none";
  // });

  let slideCenter = $(".welcome-image");
  slideCenter.slick({
    infinite: true, // бесконечный (зацикленный) слайдер
    dots: false, // показать буллеты
    arrows: true, // показать стрелки
    // swipe: true, // включить свайпы мышкой и сенсорные жесты
    speed: 500, // скорость анимации перелистывания (мс)
    cssEase: "ease", // плавность анимации
    slidesToShow: 1, // показывать 1 слайд за раз
    slidesToScroll: 1, // перелистывать по 1 слайду
    pauseOnHover: false, // не останавливать слайдер при наведении мыши
    adaptiveHeight: true, // высота секции подстраивается под содержимое слайда

    // Обеспечивает, что при частых кликах и свайпах слайды всегда центрированы
    waitForAnimate: true,
  });

  let numSlider = $("#numSlider");

  $(".slick-arrow").click(function () {
    numSlider.text(slideCenter.slick("slickCurrentSlide") + 1);
  });

  // Навигация по клику на кастомные "кубики"
  $(".slider-item").on("click", function () {
    const num = Number($(this).attr("id")) - 1; // Slick использует индексацию с 0
    slideCenter.slick("slickGoTo", num);

    // Стилизация активного кубика
    $(".slider-item").removeClass("active");
    $(this).addClass("active");
    numSlider.text(Number(num + 1));
  });

  // Синхронизация кастомной навигации и номера слайдера при перелистывании
  slideCenter.on("afterChange", function (event, slick, currentSlide) {
    $(".slider-item").removeClass("active");
    $(".slider-item#" + (currentSlide + 1)).addClass("active");
    numSlider.text(currentSlide + 1);
  });

  // для видео
  $(".video-player").slick({
    slidesToShow: 1,
    arrows: false,
    fade: true,
    centerMode: true,
    asNavFor: ".video-posters",
    waitForAnimate: true,
  });
  $(".video-posters").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".video-player",
    dots: false,
    focusOnSelect: true,
    adaptiveHeight: true,
    arrows: false,
    speed: 500,
    cssEase: "ease",
    // Обеспечивает, что при частых кликах и свайпах слайды всегда центрированы
    waitForAnimate: true,
  });

  // При инициализации ставим первое видео в главный плеер
  updateMainVideoFromFirstThumb();

  // // При перелистывании слайдера
  $(".video-posters").on("afterChange", function (event, slick, currentSlide) {
    updateMainVideoFromFirstThumb();
    updateCircles(currentSlide, slick.slideCount);
  });

  // // Клик по миниатюре — перемещаем её на первую позицию и обновляем главный плеер
  $(".video-posters").on("click", ".video-poster", function () {
    let index = $(this).closest(".slick-slide").data("slick-index");
    $(".video-posters").slick("slickGoTo", index);
    // updateMainVideoFromFirstThumb() вызовется после afterChange
  });

  // // Стрелки
  $(".double-arrows-left").click(function () {
    $(".video-posters").slick("slickPrev");
  });
  $(".double-arrows-right").click(function () {
    $(".video-posters").slick("slickNext");
  });

  // // Кружки
  $(".video-slider .circle-slider").click(function () {
    let idx = $(this).index();
    $(".video-posters").slick("slickGoTo", idx);
  });

  // // Обновление кружочков
  function updateCircles(current, total) {
    $(".video-slider .circle-slider").removeClass("circle-active");
    $(".video-slider .circle-slider").eq(current).addClass("circle-active");
  }

  // // Функция обновления главного видео
  function updateMainVideoFromFirstThumb() {
    // Найти первую видимую миниатюру (левую)
    let $first = $(".video-posters .slick-slide.slick-active")
      .first()
      .find("video");
    let src = $first.attr("src");
    let poster = $first.attr("poster");
    // Обновить главный видео-блок
    let $mainVideo = $(".video-player .video-content");
    $mainVideo[0].pause();
    $mainVideo.attr("src", src);
    $mainVideo.attr("poster", poster);
    $mainVideo[0].load();
  }

  // // При загрузке страницы обновить кружки
  // updateCircles(0, $(".video-posters").slick("getSlick").slideCount);
});
