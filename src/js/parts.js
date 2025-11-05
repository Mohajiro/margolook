// Загружает header и footer
async function loadPartials() {
  try {
    const [headerRes, footerRes] = await Promise.all([
      fetch('/src/partials/header.html'),
      fetch('/src/partials/footer.html')
    ]);
    const headerHTML = await headerRes.text();
    const footerHTML = await footerRes.text();

    document.getElementById('header-container').innerHTML = headerHTML;
    document.getElementById('footer-container').innerHTML = footerHTML;

    // Инициализация бургера после загрузки header
    if (typeof initBurger === 'function') {
      initBurger();
    }
  } catch (error) {
    console.error("Erreur lors du chargement des partiels :", error);
  }
}

loadPartials();
