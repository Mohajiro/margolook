document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('homeGalleryTrack');
  if (!track) return;

  const prev = document.querySelector('.gallery__nav--prev');
  const next = document.querySelector('.gallery__nav--next');
  const dotsWrap = document.getElementById('homeGalleryDots');

  // создаём точки по количеству «страниц» (видимых групп)
  const pageWidth = () => track.clientWidth;
  const maxScroll = () => track.scrollWidth - track.clientWidth;

  const buildDots = () => {
    dotsWrap.innerHTML = '';
    const pages = Math.max(1, Math.round(track.scrollWidth / pageWidth()));
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.className = 'gallery__dot' + (i === 0 ? ' is-active' : '');
      dot.type = 'button';
      dot.addEventListener('click', () => {
        track.scrollTo({ left: i * pageWidth(), behavior: 'smooth' });
      });
      dotsWrap.appendChild(dot);
    }
  };

  const syncDots = () => {
    const i = Math.round(track.scrollLeft / pageWidth());
    [...dotsWrap.children].forEach((d, idx) =>
      d.classList.toggle('is-active', idx === i)
    );
  };

  const scrollByPage = dir => {
    const left = Math.min(
      Math.max(0, track.scrollLeft + dir * pageWidth()),
      maxScroll()
    );
    track.scrollTo({ left, behavior: 'smooth' });
  };

  prev.addEventListener('click', () => scrollByPage(-1));
  next.addEventListener('click', () => scrollByPage(1));
  track.addEventListener('scroll', () => {
    // синхронизация точек с задержкой, чтобы не дёргалось
    clearTimeout(track._syncT);
    track._syncT = setTimeout(syncDots, 80);
  });

  // автопрокрутка
  let auto = setInterval(() => {
    if (Math.ceil(track.scrollLeft) >= maxScroll() - 2) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      scrollByPage(1);
    }
  }, 5000);

  // пауза при наведении
  track.addEventListener('mouseenter', () => clearInterval(auto));
  track.addEventListener('mouseleave', () => {
    clearInterval(auto);
    auto = setInterval(() => {
      if (Math.ceil(track.scrollLeft) >= maxScroll() - 2) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollByPage(1);
      }
    }, 5000);
  });

  // перестройка точек при ресайзе
  const ro = new ResizeObserver(() => { buildDots(); syncDots(); });
  ro.observe(track);
  buildDots();
  syncDots();
});
