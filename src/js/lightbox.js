document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".full-gallery__item img");

  if (!galleryItems.length) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML = '<img><button class="lightbox__close">&times;</button>';
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector("img");
  const closeBtn = overlay.querySelector(".lightbox__close");

  galleryItems.forEach(img => {
    img.addEventListener("click", () => {
      imgEl.src = img.src;
      overlay.classList.add("open");
    });
  });

  closeBtn.addEventListener("click", () => overlay.classList.remove("open"));
  overlay.addEventListener("click", e => {
    if (e.target === overlay) overlay.classList.remove("open");
  });
});
