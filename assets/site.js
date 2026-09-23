(function () {
  const headerInner = document.querySelector('.header-inner');

  if (headerInner) {
    const accessibilityButton = document.createElement('button');
    accessibilityButton.className = 'accessibility-toggle';
    accessibilityButton.type = 'button';
    accessibilityButton.innerHTML = '<span aria-hidden="true">Аа</span><span>Версия для слабовидящих</span>';

    let accessibilityEnabled = false;
    try {
      accessibilityEnabled = window.localStorage.getItem('school-accessibility') === 'on';
    } catch (error) {
      accessibilityEnabled = false;
    }

    function applyAccessibilityMode(enabled) {
      document.body.classList.toggle('is-accessible', enabled);
      accessibilityButton.setAttribute('aria-pressed', String(enabled));
      accessibilityButton.setAttribute('aria-label', enabled ? 'Вернуть обычную версию сайта' : 'Включить версию для слабовидящих');
    }

    applyAccessibilityMode(accessibilityEnabled);
    accessibilityButton.addEventListener('click', function () {
      accessibilityEnabled = !accessibilityEnabled;
      applyAccessibilityMode(accessibilityEnabled);
      try {
        window.localStorage.setItem('school-accessibility', accessibilityEnabled ? 'on' : 'off');
      } catch (error) {
        // The mode still works for the current page if local storage is unavailable.
      }
    });

    document.body.appendChild(accessibilityButton);
  }

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Открыть меню' : 'Закрыть меню');
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('nav-open', !open);
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Открыть меню');
        nav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
      }
    });
  }

  const filters = document.querySelectorAll('[data-filter]');
  const programCards = document.querySelectorAll('[data-category]');

  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      const filter = button.dataset.filter;
      filters.forEach(function (item) {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      programCards.forEach(function (card) {
        const visible = filter === 'all' || card.dataset.category.split(' ').includes(filter);
        card.hidden = !visible;
      });
    });
  });

  const details = Array.from(document.querySelectorAll('.info-detail'));
  const expandButton = document.querySelector('[data-expand-all]');

  if (expandButton && details.length) {
    expandButton.addEventListener('click', function () {
      const shouldOpen = details.some(function (item) { return !item.open; });
      details.forEach(function (item) { item.open = shouldOpen; });
      expandButton.textContent = shouldOpen ? 'Свернуть все' : 'Раскрыть все';
      expandButton.setAttribute('aria-expanded', String(shouldOpen));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      const target = document.querySelector(link.getAttribute('href'));
      if (target && target.tagName === 'DETAILS') target.open = true;
    });
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const footerBottom = document.querySelector('.footer-bottom');
  if (footerBottom && !footerBottom.querySelector('.footer-legal-inline')) {
    const legalLinks = document.createElement('span');
    legalLinks.className = 'footer-legal-inline';
    legalLinks.innerHTML = '<a href="/shkola-fz-demo/privacy/">Персональные данные</a><a href="/shkola-fz-demo/cookie/">Cookie</a><a href="/shkola-fz-demo/agreement/">Согласие</a>';
    footerBottom.appendChild(legalLinks);
  }

  const footer = document.querySelector('.site-footer');
  if (footer && !footer.querySelector('.footer-social-strip')) {
    const socialStrip = document.createElement('nav');
    socialStrip.className = 'container footer-social-strip';
    socialStrip.setAttribute('aria-label', 'Социальные сети школы');
    socialStrip.innerHTML = '<span>Новости и предложения</span><div><a href="https://t.me/BC_ZARUBEZHKA" target="_blank" rel="noopener noreferrer">Telegram ↗</a><a href="https://max.ru/id381710479580_biz" target="_blank" rel="noopener noreferrer">MAX ↗</a><a href="https://vk.ru/zarubina_school" target="_blank" rel="noopener noreferrer">ВКонтакте ↗</a></div>';
    footer.insertBefore(socialStrip, footerBottom);
  }

  let privacyChoice = null;
  try {
    privacyChoice = window.localStorage.getItem('school-privacy-choice');
  } catch (error) {
    privacyChoice = null;
  }

  if (!privacyChoice) {
    const privacyBanner = document.createElement('section');
    privacyBanner.className = 'privacy-banner';
    privacyBanner.setAttribute('role', 'dialog');
    privacyBanner.setAttribute('aria-labelledby', 'privacy-banner-title');
    privacyBanner.setAttribute('aria-describedby', 'privacy-banner-text');
    privacyBanner.innerHTML = '<div><strong id="privacy-banner-title">Конфиденциальность и cookie</strong><p id="privacy-banner-text">Сайт использует только необходимые технические данные для корректной работы и сохранения выбранных настроек. Ознакомьтесь с <a href="/shkola-fz-demo/privacy/">политикой конфиденциальности</a> и <a href="/shkola-fz-demo/cookie/">политикой cookie</a>.</p></div><div class="privacy-banner-actions"><button type="button" data-privacy-choice="necessary">Только необходимые</button><button type="button" class="privacy-accept" data-privacy-choice="accepted">Принять</button></div>';
    document.body.classList.add('has-privacy-banner');
    document.body.appendChild(privacyBanner);

    privacyBanner.addEventListener('click', function (event) {
      const button = event.target.closest('[data-privacy-choice]');
      if (!button) return;
      try {
        window.localStorage.setItem('school-privacy-choice', button.dataset.privacyChoice);
      } catch (error) {
        // The banner can still be closed for the current visit.
      }
      privacyBanner.remove();
      document.body.classList.remove('has-privacy-banner');
    });
  }
})();
