document.addEventListener('DOMContentLoaded', () => {
  const jobRows = document.querySelectorAll('.job-row');

  jobRows.forEach((row) => {
    const id = row.dataset.id;
    const detail = document.querySelector(`.job-detail[data-parent="${id}"]`);

    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');
    row.setAttribute('aria-expanded', 'false');

    if (detail) {
      detail.id = detail.id || `job-detail-${id}`;
      row.setAttribute('aria-controls', detail.id);
    }

    const toggleRow = () => {
      document.querySelectorAll('.job-detail').forEach((detailRow) => {
        const isCurrent = detailRow.dataset.parent === id;
        const shouldOpen = isCurrent && detailRow.style.display !== 'table-row';
        detailRow.style.display = shouldOpen ? 'table-row' : 'none';
        detailRow.classList.toggle('is-open', shouldOpen);

        const controller = document.querySelector(`.job-row[data-id="${detailRow.dataset.parent}"]`);
        if (controller) controller.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      });
    };

    row.addEventListener('click', toggleRow);
    row.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      toggleRow();
    });
  });

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  const closeNav = () => {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.addEventListener('click', (event) => {
    if (!document.body.classList.contains('nav-open')) return;
    if (event.target.closest('.site-header')) return;
    closeNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeNav();
  });
});
