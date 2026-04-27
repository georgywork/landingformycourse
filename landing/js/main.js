// Reveal sections and cards when they enter the viewport.
document.addEventListener("DOMContentLoaded", function () {
  var animatedElements = document.querySelectorAll(".animate-on-scroll");

  if (!("IntersectionObserver" in window)) {
    animatedElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  animatedElements.forEach(function (element) {
    observer.observe(element);
  });
});
