// Reviews carousel powered by native scroll-snap.
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

  function getSlideWidth() {
    if (!slides.length) {
      return 0;
    }

    return slides[0].offsetWidth + 16;
  }

  function updateDots(index) {
    dots.forEach(function (dot, dotIndex) {
      dot.classList.toggle("is-active", dotIndex === index);
      dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
    });
  }

  function getClosestIndex() {
    var slideWidth = getSlideWidth();
    if (!slideWidth) {
      return 0;
    }

    return Math.min(slides.length - 1, Math.round(track.scrollLeft / slideWidth));
  }

  function scrollToIndex(index) {
    var boundedIndex = Math.max(0, Math.min(index, slides.length - 1));
    var target = slides[boundedIndex];

    if (!target) {
      return;
    }

    track.scrollTo({
      left: target.offsetLeft,
      behavior: "smooth"
    });

    activeIndex = boundedIndex;
    updateDots(activeIndex);
  }

  slides.forEach(function (_, index) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot" + (index === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", "Перейти к отзыву " + (index + 1));
    dot.setAttribute("aria-current", index === 0 ? "true" : "false");
    dot.addEventListener("click", function () {
      scrollToIndex(index);
    });
    dotsRoot.appendChild(dot);
    dots.push(dot);
  });

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      scrollToIndex(getClosestIndex() - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      scrollToIndex(getClosestIndex() + 1);
    });
  }

  track.addEventListener("scroll", function () {
    window.requestAnimationFrame(function () {
      var nextIndex = getClosestIndex();
      if (nextIndex !== activeIndex) {
        activeIndex = nextIndex;
        updateDots(activeIndex);
      }
    });
  });

  window.addEventListener("resize", function () {
    scrollToIndex(activeIndex);
  });
});
