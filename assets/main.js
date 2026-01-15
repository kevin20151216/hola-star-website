
document.querySelectorAll('.job-row').forEach(row=>{
  row.addEventListener('click',()=>{
    const id=row.dataset.id;
    document.querySelectorAll('.job-detail').forEach(d=>{
      if(d.dataset.parent===id){
        d.style.display=d.style.display==='table-row'?'none':'table-row';
      }else{
        d.style.display='none';
      }
    })
  })
})

// ===== Mobile nav toggle (SaaS header) =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  const closeNav = () => {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('nav-open')) return;
    if (e.target.closest('.site-header')) return;
    closeNav();
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeNav();
  });
});
