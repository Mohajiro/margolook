document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero__slider img");
  let current = 0;

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 6000);
});
