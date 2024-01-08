// Flex-Slider setup file

// Flex Slider configuration
function register_flex_slider() {
  jQuery(".flexslider").flexslider({
    animation: "slide",
    touch: true,
    directionNav: false,
    useCSS: false,
  });
}

document.addEventListener("DOMContentLoaded", register_flex_slider, false);

// Correct rendering TP Slider and TP Testimonials widget in Elementor admin
window.addEventListener("elementor/frontend/init", function () {
  var elements = ["tp-slider", "tp-testimonials"];
  jQuery.each(elements, function (index, name) {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/" + name + ".default",
      register_flex_slider
    );
  });
});
