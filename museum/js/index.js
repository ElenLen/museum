$(document).ready(function () {
  let slideCenter = $(".welcome-image");
  slideCenter.slick({
    infinite: true,
    slidesToShow: 1,
  });

  // вывод номера текущего слайдера в span
  let numSlider = $("#numSlider");
  $(".slick-arrow").click(function () {
    // console.log(slideCenter.slick('slickCurrentSlide') + 1);
    numSlider.text(slideCenter.slick("slickCurrentSlide") + 1);
  });
});
