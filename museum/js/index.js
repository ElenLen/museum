$(document).ready(function () {
  const burgerBtn = document.getElementById("burger");
  const mobileMenu = document.getElementById("burger-menu");
  const closeBtn = document.getElementById("close");
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
    if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
      closeMenu();
    }
  }

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

  $(".slider-item").on("click", function () {
    const num = Number($(this).attr("id")) - 1; // Slick использует индексацию с 0
    slideCenter.slick("slickGoTo", num);

    $(".slider-item").removeClass("active");
    $(this).addClass("active");
    numSlider.text(Number(num + 1));
  });

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
    adaptiveHeight: false, // высота секции подстраивается под содержимое слайда
    variableWidth: false,
    waitForAnimate: true,
  });
  $(".video-posters").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".video-player",
    dots: false,
    focusOnSelect: true,
    adaptiveHeight: false,
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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Если элемент входит в видимую область
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
        // Если элемент выходит из видимой области
        else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    { threshold: 0.1 }
  ); // Анимация сработает, когда 10% элемента будет видно

  // Найдите все элементы с классом fade-in-section
  const elements = document.querySelectorAll(".fade-in-section");
  elements.forEach((element) => {
    observer.observe(element);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Цены билетов
  const ticketPrices = {
    basic: {
      "permanent-exhibition": 20,
      "temporary-exhibition": 25,
      "combined-admission": 40,
    },
    senior: {
      "permanent-exhibition": 10,
      "temporary-exhibition": 12.5,
      "combined-admission": 20,
    },
  };

  // Элементы DOM
  const ticketTypeRadios = document.querySelectorAll(
    'input[name="ticket-type"]'
  );
  const basicCountInput = document.getElementById("basic-tickets-count");
  const seniorCountInput = document.getElementById("senior-tickets-count");
  const totalPriceElement = document.getElementById("total-price");
  const basicMinusBtn = document.querySelector(".basic-minus");
  const basicPlusBtn = document.querySelector(".basic-plus");
  const seniorMinusBtn = document.querySelector(".senior-minus");
  const seniorPlusBtn = document.querySelector(".senior-plus");

  // Функция для сохранения состояния в Local Storage
  const saveState = () => {
    const state = {
      basicCount: basicCountInput.value,
      seniorCount: seniorCountInput.value,
      ticketTypeId: document.querySelector('input[name="ticket-type"]:checked')
        .id,
    };
    localStorage.setItem("ticketCalculatorState", JSON.stringify(state));
  };

  // Функция для загрузки состояния из Local Storage
  const loadState = () => {
    const savedState = localStorage.getItem("ticketCalculatorState");
    if (savedState) {
      const state = JSON.parse(savedState);
      basicCountInput.value = state.basicCount;
      seniorCountInput.value = state.seniorCount;
      document.getElementById(state.ticketTypeId).checked = true;
    }
  };

  // Функция для расчета и обновления общей цены
  const updateTotalPrice = () => {
    const selectedTicketTypeId = document.querySelector(
      'input[name="ticket-type"]:checked'
    ).id;
    const basicCount = parseInt(basicCountInput.value, 10);
    const seniorCount = parseInt(seniorCountInput.value, 10);

    const basicPrice = ticketPrices.basic[selectedTicketTypeId];
    const seniorPrice = ticketPrices.senior[selectedTicketTypeId];

    const totalPrice = basicCount * basicPrice + seniorCount * seniorPrice;
    totalPriceElement.textContent = `Total €${totalPrice.toFixed(2)}`;

    saveState();
  };

  // Обработчики событий для кнопок +/-
  basicMinusBtn.addEventListener("click", () => {
    const currentValue = parseInt(basicCountInput.value, 10);
    if (currentValue > 0) {
      basicCountInput.value = currentValue - 1;
      updateTotalPrice();
    }
  });

  basicPlusBtn.addEventListener("click", () => {
    const currentValue = parseInt(basicCountInput.value, 10);
    if (currentValue < 20) {
      basicCountInput.value = currentValue + 1;
      updateTotalPrice();
    }
  });

  seniorMinusBtn.addEventListener("click", () => {
    const currentValue = parseInt(seniorCountInput.value, 10);
    if (currentValue > 0) {
      seniorCountInput.value = currentValue - 1;
      updateTotalPrice();
    }
  });

  seniorPlusBtn.addEventListener("click", () => {
    const currentValue = parseInt(seniorCountInput.value, 10);
    if (currentValue < 20) {
      seniorCountInput.value = currentValue + 1;
      updateTotalPrice();
    }
  });

  // Обработчик событий для радио-кнопок
  ticketTypeRadios.forEach((radio) => {
    radio.addEventListener("change", updateTotalPrice);
  });

  // Инициализация: загрузка состояния и первый расчет цены
  loadState();
  updateTotalPrice();

  const ticketsForm = document.getElementById("tickets-form");

  // Добавление обработчика для отправки формы
  ticketsForm.addEventListener("submit", (event) => {
    //  предотвращает перезагрузку страницы при отправке формы
    event.preventDefault();

    // добавить логику отправки данных на сервер
    // или открыть модальное окно для оплаты.

    // Пример сбора данных из формы
    const formData = new FormData(ticketsForm);
    const data = {
      ticketType: formData.get("ticket-type"),
      basicTickets: formData.get("basic-tickets"),
      seniorTickets: formData.get("senior-tickets"),
      totalPrice: totalPriceElement.textContent,
    };

    console.log("Отправленные данные:", data);
    alert("Форма отправлена!");
  });

  const container = document.querySelector(".image-comparison-container");
  const topWrapper = document.querySelector(".image-top-wrapper");
  const sliderHandle = document.querySelector(".slider-handle");

  let isDragging = false;

  const startDragging = (e) => {
    isDragging = true;
  };

  const stopDragging = () => {
    isDragging = false;
  };

  const onDrag = (e) => {
    if (!isDragging) return;

    //  позици контейнера и мыши
    const containerRect = container.getBoundingClientRect();
    let newPosition = e.clientX - containerRect.left;

    // Ограничиваем движение ползунка границами контейнера
    if (newPosition < 0) {
      newPosition = 0;
    }
    if (newPosition > containerRect.width) {
      newPosition = containerRect.width;
    }

    // Обновляем ширину верхнего изображения и позицию ползунка
    topWrapper.style.width = `${newPosition}px`;
    sliderHandle.style.left = `${newPosition}px`;
  };

  // Обработчики событий мыши
  sliderHandle.addEventListener("mousedown", startDragging);
  document.addEventListener("mouseup", stopDragging);
  document.addEventListener("mousemove", onDrag);
});

// document.addEventListener("DOMContentLoaded", () => {
//   const toggleButton = document.querySelector(".burger-toggle");
//   const menu = document.querySelector(".menu-list");

//   // Функция для переключения состояния меню
//   const toggleMenu = () => {
//     const isExpanded =
//       toggleButton.getAttribute("aria-expanded") === "true" || false;
//     toggleButton.setAttribute("aria-expanded", !isExpanded);
//     toggleButton.classList.toggle("open");
//     menu.classList.toggle("open");
//   };

//   // 1. Открытие/закрытие по кнопке
//   toggleButton.addEventListener("click", toggleMenu);

//   // 2. Закрытие при клике вне меню
//   document.addEventListener("click", (event) => {
//     const isClickInsideMenu =
//       toggleButton.contains(event.target) || menu.contains(event.target);

//     // Если меню открыто и клик был НЕ внутри меню
//     if (menu.classList.contains("open") && !isClickInsideMenu) {
//       toggleMenu();
//     }
//   });
// });
