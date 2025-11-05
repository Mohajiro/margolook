function initBurger() {
  const burger = document.querySelector(".burger");
  const navList = document.querySelector(".headnav_list");

  if (!burger || !navList) return;

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navList.classList.toggle("open");

    document.body.style.overflow = navList.classList.contains("open")
      ? "hidden"
      : "";
  });

  navList.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      navList.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}
