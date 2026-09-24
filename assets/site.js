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
    socialStrip.innerHTML = '<span>Новости и предложения</span><div><a href="https://t.me/BC_ZARUBEZHKA" target="_blank" rel="noopener noreferrer">Telegram ↗</a><a class="footer-social-primary" href="https://max.ru/id381710479580_biz" target="_blank" rel="noopener noreferrer">MAX — написать ↗</a><a href="https://vk.ru/zarubina_school" target="_blank" rel="noopener noreferrer">ВКонтакте ↗</a><button class="footer-callback" type="button" data-open-callback>Перезвоним</button><button class="footer-cookie-settings" type="button" data-open-privacy>Настроить cookie</button></div>';
    footer.insertBefore(socialStrip, footerBottom);
  }

  const privacyStorageKey = 'school-privacy-choice-v2';

  function getPrivacyChoice() {
    try {
      return window.localStorage.getItem(privacyStorageKey);
    } catch (error) {
      return null;
    }
  }

  function showPrivacyBanner(force) {
    if (!force && getPrivacyChoice()) return;
    const existingBanner = document.querySelector('.privacy-banner');
    if (existingBanner) existingBanner.remove();

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
        window.localStorage.setItem(privacyStorageKey, button.dataset.privacyChoice);
      } catch (error) {
        // The banner can still be closed for the current visit.
      }
      privacyBanner.remove();
      document.body.classList.remove('has-privacy-banner');
    });
  }

  showPrivacyBanner(false);

  document.addEventListener('click', function (event) {
    const settingsButton = event.target.closest('[data-open-privacy]');
    if (!settingsButton) return;
    showPrivacyBanner(true);
  });

  const callbackDialog = document.createElement('dialog');
  callbackDialog.className = 'callback-modal';
  callbackDialog.setAttribute('aria-labelledby', 'callback-title');
  callbackDialog.innerHTML = '<button class="callback-close" type="button" data-close-callback aria-label="Закрыть">×</button><div class="callback-intro"><span>Обратный звонок</span><h2 id="callback-title">Перезвоним</h2><p>Оставьте ФИО и номер телефона. В демоверсии данные передаются через письмо в вашей почтовой программе.</p></div><form class="callback-form"><label><span>ФИО</span><input name="fullName" type="text" autocomplete="name" required placeholder="Иванова Анна Сергеевна"></label><label><span>Номер телефона</span><input name="phone" type="tel" autocomplete="tel" inputmode="tel" required pattern="[+0-9()\\s-]{7,}" placeholder="+7 900 000-00-00"></label><label class="callback-consent"><input name="consent" type="checkbox" required><span>Согласен(на) с <a href="/shkola-fz-demo/privacy/" target="_blank">политикой конфиденциальности</a> и даю <a href="/shkola-fz-demo/agreement/" target="_blank">согласие на обработку персональных данных</a>.</span></label><button class="button" type="submit">Подготовить заявку</button><p class="callback-status" role="status" aria-live="polite"></p></form>';
  document.body.appendChild(callbackDialog);

  document.addEventListener('click', function (event) {
    const openButton = event.target.closest('[data-open-callback]');
    if (openButton) {
      if (typeof callbackDialog.showModal === 'function') callbackDialog.showModal();
      else callbackDialog.setAttribute('open', '');
      const firstInput = callbackDialog.querySelector('input');
      if (firstInput) firstInput.focus();
      return;
    }
    if (event.target.closest('[data-close-callback]')) callbackDialog.close();
  });

  callbackDialog.addEventListener('click', function (event) {
    if (event.target === callbackDialog) callbackDialog.close();
  });

  const callbackForm = callbackDialog.querySelector('.callback-form');
  callbackForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!callbackForm.reportValidity()) return;
    const formData = new FormData(callbackForm);
    const fullName = String(formData.get('fullName') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const subject = encodeURIComponent('Заявка «Перезвоним» с сайта');
    const body = encodeURIComponent('ФИО: ' + fullName + '\nТелефон: ' + phone + '\n\nСогласие на обработку персональных данных подтверждено в форме сайта.');
    const status = callbackForm.querySelector('.callback-status');
    status.textContent = 'Открываем почтовую программу. Для передачи заявки останется отправить письмо.';
    window.location.href = 'mailto:bc-zarubezhka@yandex.ru?subject=' + subject + '&body=' + body;
  });
})();
