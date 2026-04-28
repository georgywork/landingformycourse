// Reviews slider that shows one full-size screenshot at a time.
document.addEventListener("DOMContentLoaded", function () {
  var track = document.getElementById("reviews-track");
  var dotsRoot = document.getElementById("carousel-dots");

  if (!track || !dotsRoot) {
    return;
  }

  var slides = Array.prototype.slice.call(track.querySelectorAll(".review-slide"));
  var prevButton = document.querySelector(".carousel-button-prev");
  var nextButton = document.querySelector(".carousel-button-next");
  var dots = [];
  var activeIndex = 0;

  function updateSlides(index) {
    slides.forEach(function (slide, slideIndex) {
      var isActive = slideIndex === index;
      slide.hidden = !isActive;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    dots.forEach(function (dot, dotIndex) {
      var isActive = dotIndex === index;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function showIndex(index) {
    activeIndex = (index + slides.length) % slides.length;
    updateSlides(activeIndex);
  }

  slides.forEach(function (_, index) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot" + (index === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", "Перейти к отзыву " + (index + 1));
    dot.setAttribute("aria-current", index === 0 ? "true" : "false");
    dot.addEventListener("click", function () {
      showIndex(index);
    });
    dotsRoot.appendChild(dot);
    dots.push(dot);
  });

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      showIndex(activeIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      showIndex(activeIndex + 1);
    });
  }

  updateSlides(activeIndex);
});
