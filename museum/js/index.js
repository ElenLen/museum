$(document).ready(function () {
  const burgerMenu = document.getElementById("burger");
  const mobileMenu = document.getElementById("menu");
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
  });

  let numSlider = $("#numSlider");
  $(".slick-arrow").click(function () {
    numSlider.text(slideCenter.slick("slickCurrentSlide") + 1);
  });
});
