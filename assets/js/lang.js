(function(){
  const DEFAULT_LANG='en';

  function applyLinks(lang){
    const privacy=document.getElementById('privacyLink');
    const terms=document.getElementById('termsLink');
    if(privacy) privacy.href = `privacy.html?lang=${lang}`;
    if(terms) terms.href = `terms.html?lang=${lang}`;
  }

  function setLang(lang){
    localStorage.setItem('lang',lang);
    document.querySelectorAll('.lang-switch a').forEach(a=>{
      a.classList.toggle('active', a.dataset.lang===lang);
    });
    applyLinks(lang);
  }

  function getLangFromUrl(){
    const m = location.search.match(/[?&]lang=([a-z]+)/i);
    return m ? m[1].toLowerCase() : null;
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const urlLang=getLangFromUrl();
    const saved=localStorage.getItem('lang')||DEFAULT_LANG;
    const lang=urlLang||saved;

    document.querySelectorAll('.lang-switch a').forEach(a=>{
      a.addEventListener('click', (e)=>{
        e.preventDefault();
        setLang(a.dataset.lang);
      });
    });

    setLang(lang);
  });
})();
