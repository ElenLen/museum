$(document).ready(function () {
  const burgerMenu = document.getElementById("burger");
  const mobileMenu = document.getElementById("burger-menu");
  const closeMenu = document.getElementById("close");

  burgerMenu.addEventListener("click", function () {
    burgerMenu.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    burgerMenu.style.display = "none";
    closeMenu.style.display = "block";
  });

  closeMenu.addEventListener("click", function () {
    burgerMenu.classList.remove("open");
    mobileMenu.classList.remove("open");
    burgerMenu.style.display = "block";
    closeMenu.style.display = "none";
  });

  mobileMenu.addEventListener("click", function () {
    burgerMenu.classList.remove("open");
    mobileMenu.classList.remove("open");
    burgerMenu.style.display = "block";
    closeMenu.style.display = "none";
  });

  let slideCenter = $(".welcome-image");
  slideCenter.slick({
    infinite: true,
    slidesToShow: 1,
    speed: 1000,
  });

  let numSlider = $("#numSlider");

  $(".slick-arrow").click(function () {
    numSlider.text(slideCenter.slick("slickCurrentSlide") + 1);
  });

  // Навигация по клику на кастомные "кубики"
  $(".slider-item").on("click", function () {
    var num = Number($(this).attr("id")) - 1; // Slick использует индексацию с 0
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
    // slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".video-posters",
  });
  $(".video-posters").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: ".video-player",
    dots: false,
    // centerMode: true,
    focusOnSelect: true,
  });

  // Инициализация слайдера
  // $(".video-posters").slick({
  //   slidesToShow: 2, // Сколько миниатюр видно одновременно (регулируйте на вкус)
  //   slidesToScroll: 1,
  // arrows: false, // Используем свои стрелки
  // dots: false, // Свои кружочки
  // infinite: false,
  //   centerMode: false,
  // });

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
