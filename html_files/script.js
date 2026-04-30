(function(){
  const header = document.getElementById('siteHeader');
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('mobileToggle');
  const backToTop = document.getElementById('backToTop');
  const page = document.body.getAttribute('data-page') || 'index.html';

  function updateHeader(){
    if(window.scrollY > 20){ header.classList.add('scrolled'); } else { header.classList.remove('scrolled'); }
    if(backToTop){ backToTop.classList.toggle('show', window.scrollY > 520); }
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader);

  document.querySelectorAll('.main-nav a').forEach(link => {
    if(link.getAttribute('data-page') === page){ link.classList.add('active'); }
  });

  if(toggle && nav){
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      header.classList.toggle('menu-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.addEventListener('click', e => {
      if(e.target.tagName === 'A'){
        nav.classList.remove('open');
        header.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded','false');
      }
    });
  }

  if(backToTop){
    backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }

  const params = new URLSearchParams(window.location.search);
  const productParam = params.get('product');
  if(productParam){
    const productField = document.getElementById('productInterest');
    if(productField){
      const decoded = productParam.replace(/\+/g, ' ');
      if(productField.tagName === 'SELECT'){
        const option = Array.from(productField.options).find(opt => opt.value === decoded || opt.text === decoded);
        if(option){ productField.value = option.value || option.text; }
        else{
          const custom = document.createElement('option');
          custom.value = decoded; custom.textContent = decoded; custom.selected = true;
          productField.appendChild(custom);
        }
      }else{ productField.value = decoded; }
    }
  }

  document.querySelectorAll('.quick-inquiry').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.getAttribute('data-product');
      if(product){ sessionStorage.setItem('lastProductInquiry', product); }
    });
  });

  const savedProduct = sessionStorage.getItem('lastProductInquiry');
  const productField = document.getElementById('productInterest');
  if(savedProduct && productField && !productField.value){
    if(productField.tagName === 'SELECT'){
      const option = Array.from(productField.options).find(opt => opt.value === savedProduct || opt.text === savedProduct);
      if(option){ productField.value = option.value || option.text; }
    }else{ productField.value = savedProduct; }
  }

  document.querySelectorAll('form[data-form="inquiry"]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const message = form.querySelector('.form-message');
      if(message){ message.textContent = 'Thank you. Your inquiry has been recorded for this demo. Our sales team would contact you within 24 hours.'; }
      form.reset();
    });
  });

  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      item.classList.toggle('open');
    });
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('#productGrid .product-card');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      const filter = button.getAttribute('data-filter');
      productCards.forEach(card => {
        const match = filter === 'All Products' || card.getAttribute('data-category') === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  const hash = decodeURIComponent(location.hash.replace('#','').replace(/-/g,' '));
  if(hash && filterButtons.length){
    const target = Array.from(filterButtons).find(btn => btn.getAttribute('data-filter') === hash);
    if(target){ target.click(); }
  }

  const newsTabs = document.querySelectorAll('.news-tab');
  const newsCards = document.querySelectorAll('#newsGrid .news-card');
  newsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      newsTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-news-filter');
      newsCards.forEach(card => {
        const match = filter === 'All' || card.getAttribute('data-category') === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  const mainImage = document.querySelector('.main-product-image img');
  document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const img = thumb.getAttribute('data-image');
      if(mainImage && img){ mainImage.src = img; }
      document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
})();
