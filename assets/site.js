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

  const programDetails = {
    'first-grade': {
      kicker: 'Семейная школа · 2027–2028',
      title: 'Набор в 1 класс',
      intro: 'Первый школьный год в малом классе с углублённым изучением английского и китайского языков.',
      points: [
        '<strong>Малый класс:</strong> педагог видит темп и учебные задачи каждого ребёнка.',
        '<strong>Спокойный старт:</strong> постепенно знакомим со школьным форматом и развиваем самостоятельность.',
        '<strong>Связь с семьёй:</strong> открыто обсуждаем адаптацию, учебные задачи и прогресс ребёнка.',
        '<strong>Языки:</strong> английский и китайский входят в расширенную программу.'
      ],
      note: 'Администратор расскажет об условиях набора и сообщит, когда будет опубликовано полное расписание.',
      pageLink: '/shkola-fz-demo/classes/first-grade/',
      pageLabel: 'Подробнее о наборе'
    },
    'school-prep': {
      kicker: '6–7 лет · 8 занятий в месяц',
      title: 'Подготовка к школе',
      intro: 'Единый связанный курс математики, чтения и письма, который помогает ребёнку прийти в школу уверенным.',
      points: [
        '<strong>Математика:</strong> прямой и обратный счёт в пределах 20, состав числа, сравнение, сложение, вычитание и логические задачи по методикам Л. Г. Петерсон и Е. М. Кац.',
        '<strong>Чтение:</strong> идём от звукового анализа к слогу и слову, учимся понимать текст, пересказывать и отвечать на вопросы.',
        '<strong>Письмо:</strong> готовим руку, осваиваем элементы и строчные буквы, соединения и письмо в узкой линейке.',
        '<strong>Окружающий мир:</strong> природа, сезоны, животные и правила безопасности.',
        '<strong>Формат:</strong> рабочие тетради, карточки и игровые задания без лишнего давления.'
      ],
      note: 'Групповые занятия проходят по вторникам и четвергам с 16:30 до 18:00.'
    },
    'fourth-grade': {
      kicker: 'Пятница · 15:00–18:00',
      title: 'Занятия для 4 класса',
      intro: 'Три ключевых предмета в одном учебном блоке: русский язык, математика и английский.',
      points: [
        '<strong>Русский язык:</strong> разбираем сложные темы, закрепляем правила и работаем над грамотностью.',
        '<strong>Математика:</strong> восстанавливаем пробелы, тренируем вычисления и решение задач.',
        '<strong>Английский язык:</strong> закрепляем школьную программу и развиваем практические языковые навыки.',
        'Готовимся к контрольным работам и МЦКО, точечно разбираем непонятные темы.'
      ],
      note: 'Свободные места в группе уточняйте у администратора.',
      pageLink: '/shkola-fz-demo/classes/fourth-grade/',
      pageLabel: 'Подробнее о программе'
    },
    english: {
      kicker: 'Главное направление школы',
      title: 'Английский язык',
      intro: 'Семь уровней Academy Stars для детей примерно от 5 до 12 лет — от Pre-A1 до A2+.',
      points: [
        '<strong>Уровни:</strong> Starter, Academy Stars 1–6; группу подбираем прежде всего по знаниям, а не только по возрасту.',
        '<strong>Погружение:</strong> до 90% занятия проходит на английском языке.',
        '<strong>Навыки:</strong> устная речь, аудирование, чтение, письмо, фонетика и домашнее чтение.',
        '<strong>Результат:</strong> ежегодное независимое тестирование по международному формату и именные сертификаты.',
        '<strong>Возможности:</strong> олимпиады, международные конкурсы, разговорный клуб и языковые стажировки.'
      ],
      note: 'В старших группах занятия ведёт носитель языка с международно признанным сертификатом CELTA.',
      pageLink: '/shkola-fz-demo/articles/english-at-school/',
      pageLabel: '10 особенностей программы'
    },
    chinese: {
      kicker: 'Группы 5+ · 8+ · 10+',
      title: 'Китайский язык',
      intro: 'Современная методика, практика общения с первых уроков и знакомство с культурой Китая.',
      points: [
        '<strong>Китайский клуб, 5+:</strong> один раз в неделю, 45 минут.',
        '<strong>HSK 1, 8+:</strong> по субботам, один раз в неделю, 90 минут.',
        '<strong>HSK 2, 10+:</strong> по субботам, один раз в неделю, 120 минут.',
        '<strong>Индивидуально:</strong> время и программа подбираются по запросу.'
      ],
      note: 'В конце учебного года — экзамен HSK 1/HSK 2 на площадке Московского государственного лингвистического университета.'
    },
    'exact-sciences': {
      kicker: 'Индивидуальные занятия',
      title: 'Математика и физика',
      intro: 'Точно определяем пробелы, подбираем понятный способ объяснения и движемся в темпе ученика.',
      points: [
        '<strong>Математика:</strong> дроби, уравнения, геометрия и другие темы, которые пока не получаются.',
        '<strong>Физика:</strong> школьная программа, прикладные задачи, проекты и олимпиадный уровень.',
        '<strong>Экзамены:</strong> подготовка к ОГЭ, ЕГЭ и внутренним испытаниям в профильные классы.',
        '<strong>Обратная связь:</strong> сразу разбираем ошибки и учимся не повторять их.'
      ],
      note: 'Формат, продолжительность и время занятий согласуются индивидуально.'
    },
    math: {
      kicker: 'Индивидуально',
      title: 'Математика',
      intro: 'Сосредотачиваемся именно на тех темах, которые пока не получаются: от дробей и уравнений до геометрии.',
      points: [
        'Работаем в собственном темпе: задерживаемся на сложном и не тратим время на уже понятное.',
        'Используем схемы, рисунки, реальные примеры или строгую последовательность правил — под способ мышления ребёнка.',
        'Сразу разбираем каждую ошибку и показываем, как не повторять её в следующих задачах.',
        'При необходимости готовимся к контрольным, ОГЭ, ЕГЭ и профильным испытаниям.'
      ]
    },
    physics: {
      kicker: 'Индивидуально',
      title: 'Физика',
      intro: 'От точечного разбора школьных тем до углублённой подготовки и проектной работы.',
      points: [
        'Закрываем пробелы и разбираем темы, которые вызывают трудности.',
        'Готовимся к ОГЭ, ЕГЭ и внутренним экзаменам в профильные классы.',
        'Решаем задачи от базовых до олимпиадных и разбираем типичные ошибки.',
        'Углубляемся в прикладную физику, проекты и интересные ученику темы.'
      ]
    },
    'primary-school': {
      kicker: 'Индивидуальная поддержка',
      title: 'Начальная школа',
      intro: 'Помогаем разобраться с непонятными темами, восстановить базу и вернуть уверенность в учёбе.',
      points: [
        'Определяем, где именно возникло затруднение и какие знания нужно восстановить.',
        'Объясняем тему понятным ребёнку способом и закрепляем её на практике.',
        'Работаем с математикой, русским языком, чтением и текущими школьными заданиями.',
        'Учимся работать по инструкции, проверять себя и доводить задачу до конца.'
      ]
    },
    russian: {
      kicker: 'Индивидуально',
      title: 'Русский язык',
      intro: 'Точечно закрываем пробелы, повышаем грамотность или готовимся к экзаменам с учётом особенностей ученика.',
      points: [
        'Проводим диагностику уровня, целей и особенностей ученика.',
        'Составляем индивидуальный план по сложным темам, пунктуации, сочинениям или грамотности.',
        'Учимся видеть логику языка, а не механически запоминать правила.',
        'Готовимся к ОГЭ, ЕГЭ и другим экзаменам.'
      ]
    },
    specialists: {
      kicker: 'Индивидуальная работа',
      title: 'Логопед и детский психолог',
      intro: 'Бережная помощь с речью, адаптацией, эмоциями и общением — с программой под конкретного ребёнка.',
      points: [
        '<strong>Логопед:</strong> диагностика, запуск речи, постановка звуков, развитие слуха, чтения и письма.',
        '<strong>Психолог:</strong> адаптация к саду и школе, тревожность, страхи, самооценка и отношения со сверстниками.',
        '<strong>Индивидуальный план:</strong> понятные задачи и регулярная обратная связь для родителей.',
        '<strong>Бережный формат:</strong> игровые и современные методики без перегруза и давления.'
      ],
      note: 'Первичная встреча помогает определить задачу и составить план дальнейшей работы.'
    },
    'speech-therapist': {
      kicker: 'Диагностика + план',
      title: 'Логопед',
      intro: 'Индивидуальные занятия для ясной и уверенной речи — без перегруза и давления.',
      points: [
        'Помогаем запустить речь, поставить звуки, развить слух и логику.',
        'Работаем с трудностями речи, чтения, письма и адаптации к школе.',
        'Используем методики Зайцева, Жуковой, Петерсон, логопедические и игровые техники.',
        'После первичной диагностики составляем понятный индивидуальный план.'
      ]
    },
    psychologist: {
      kicker: 'Бережная поддержка',
      title: 'Детский психолог',
      intro: 'Помогаем мягко пройти адаптацию, справиться со страхами и научиться понимать свои эмоции.',
      points: [
        'Привыкание к детскому саду, школе, новому городу или классу.',
        'Тревожность, страхи, истерики, апатия и перепады настроения.',
        'Агрессия, упрямство, границы и сложности в общении со сверстниками.',
        'Подростковый период, самооценка, семейные конфликты и перемены.'
      ]
    },
    'art-chess': {
      kicker: 'Творчество и стратегия',
      title: 'Художественная студия и шахматы',
      intro: 'Два разных направления развития: свободное творческое выражение и спокойное стратегическое мышление.',
      points: [
        '<strong>Художественная студия:</strong> цвет, форма, разные техники, наблюдательность, мелкая моторика и эмоциональный интеллект.',
        '<strong>Шахматы:</strong> логика, память, концентрация, планирование и обоснованные решения.',
        'Оба направления учат доводить начатое до результата и увереннее выражать свои идеи.',
        'Занятия проходят в доброжелательной атмосфере с вниманием к темпу ребёнка.'
      ]
    },
    art: {
      kicker: 'Творческое развитие',
      title: 'Художественная студия',
      intro: 'Дети знакомятся с разными видами творчества, учатся видеть детали и выражать идеи через цвет, форму и образ.',
      points: [
        'Развиваем мелкую моторику, координацию, внимание и память.',
        'Осваиваем новые художественные техники и учимся доводить рисунок до результата.',
        'Через творчество развиваем эмоциональный интеллект и способность понимать свои чувства.',
        'Обсуждение работ расширяет словарный запас и формирует связную речь.'
      ]
    },
    chess: {
      kicker: 'Понедельник · 19:00–20:30',
      title: 'Шахматы',
      intro: 'Игра становится инструментом уверенности и помогает развивать навыки, полезные в учёбе и жизни.',
      points: [
        'Логическое мышление и умение видеть на несколько шагов вперёд.',
        'Понимание соперника и контроль собственных эмоций.',
        'Планирование времени и распределение сил.',
        'Память, внимание и концентрация.'
      ]
    },
    'camp-internships': {
      kicker: 'Английский за пределами класса',
      title: 'Кэмп и языковые стажировки',
      intro: 'Летние форматы, в которых язык становится частью общения, игры, путешествия и самостоятельного опыта.',
      points: [
        '<strong>«Горчаково Кэмп»:</strong> летний английский клуб с творческими задачами, живым общением и новыми друзьями.',
        '<strong>Стажировки:</strong> Великобритания, Мальта, Дубай и Китай.',
        '<strong>Погружение:</strong> занятия, экскурсии и повседневные ситуации помогают преодолеть языковой барьер.',
        '<strong>Самостоятельность:</strong> поездки развивают ответственность, адаптивность и уверенность.'
      ],
      note: 'Школа организует языковые стажировки с 2012 года.'
    },
    camp: {
      kicker: 'Летний английский клуб',
      title: '«Горчаково Кэмп»',
      intro: 'Каникулы с английским языком, живым общением, творческими заданиями и командными активностями.',
      points: [
        'Практикуем английский в понятных игровых и проектных ситуациях.',
        'Развиваем уверенность в общении и не боимся ошибок.',
        'Участвуем в тематических днях, творческих заданиях и командных играх.',
        'Знакомимся, общаемся и проводим каникулы с пользой.'
      ]
    },
    testing: {
      kicker: 'Ежегодное подтверждение результата',
      title: 'Независимое тестирование',
      intro: 'Ученики проходят независимое тестирование по формату, аналогичному Cambridge, и получают именные сертификаты.',
      points: [
        'Проверяем чтение, письмо, аудирование и устную речь.',
        'Результат помогает увидеть реальный прогресс за учебный год.',
        'Формат даёт опыт экзаменационной работы без лишнего стресса.',
        'Платиновый партнёр школы — BKS.'
      ],
      pageLink: '/shkola-fz-demo/articles/english-at-school/',
      pageLabel: 'Подробнее об английском в школе'
    },
    internships: {
      kicker: 'С 2012 года',
      title: 'Языковые стажировки',
      intro: 'Регулярно организуем образовательные поездки в Великобританию, на Мальту, в Дубай и Китай.',
      points: [
        'Полное погружение в язык на занятиях, экскурсиях, в транспорте и повседневном общении.',
        'Занятия с носителями и развитие говорения, аудирования, чтения и письма.',
        'Квесты, проекты, постановки, короткие видео и дебаты.',
        'Знакомство с культурой, новые друзья, самостоятельность и устойчивая мотивация к языку.'
      ],
      note: 'Состав программы, возраст участников и даты ближайшей поездки уточняйте у администратора.'
    }
  };

  const detailCards = document.querySelectorAll('[data-program-id]');
  let programDialog = null;
  let programDialogTrigger = null;

  function closeProgramDialog() {
    if (!programDialog || !programDialog.open) return;
    programDialog.close();
  }

  function openProgramDialog(card) {
    const detail = programDetails[card.dataset.programId];
    if (!detail) return;

    if (!programDialog) {
      programDialog = document.createElement('dialog');
      programDialog.className = 'program-modal';
      programDialog.setAttribute('aria-labelledby', 'program-modal-title');
      programDialog.innerHTML = '<button class="program-modal-close" type="button" data-close-program aria-label="Закрыть">×</button><div class="program-modal-head"><span class="program-modal-kicker"></span><h2 id="program-modal-title"></h2><p class="program-modal-intro"></p></div><div class="program-modal-body"><ul class="program-modal-points"></ul><p class="program-modal-note"></p></div><div class="program-modal-actions"><a class="button" href="/shkola-fz-demo/prices/">Узнать стоимость</a><button class="button button-dark" type="button" data-open-callback>Записаться</button><a class="program-modal-more" href=""></a></div>';
      document.body.appendChild(programDialog);

      programDialog.addEventListener('click', function (event) {
        if (event.target === programDialog || event.target.closest('[data-close-program]')) closeProgramDialog();
      });
      programDialog.addEventListener('close', function () {
        if (programDialogTrigger) programDialogTrigger.focus();
      });
    }

    programDialog.querySelector('.program-modal-kicker').textContent = detail.kicker;
    programDialog.querySelector('#program-modal-title').textContent = detail.title;
    programDialog.querySelector('.program-modal-intro').textContent = detail.intro;
    programDialog.querySelector('.program-modal-points').innerHTML = detail.points.map(function (point) {
      return '<li>' + point + '</li>';
    }).join('');

    const note = programDialog.querySelector('.program-modal-note');
    note.textContent = detail.note || '';
    note.hidden = !detail.note;

    const moreLink = programDialog.querySelector('.program-modal-more');
    moreLink.href = detail.pageLink || '';
    moreLink.textContent = detail.pageLabel || '';
    moreLink.hidden = !detail.pageLink;

    programDialogTrigger = card;
    if (typeof programDialog.showModal === 'function') programDialog.showModal();
    else programDialog.setAttribute('open', '');
    programDialog.querySelector('[data-close-program]').focus();
  }

  detailCards.forEach(function (card) {
    card.addEventListener('click', function (event) {
      if (event.target.closest('a, button')) return;
      openProgramDialog(card);
    });
    card.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openProgramDialog(card);
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

  const footerPrimaryLinks = document.querySelector('.footer-links');
  if (footerPrimaryLinks && !footerPrimaryLinks.querySelector('a[href="/shkola-fz-demo/prices/"]')) {
    const priceItem = document.createElement('li');
    priceItem.innerHTML = '<a href="/shkola-fz-demo/prices/">Стоимость занятий</a>';
    footerPrimaryLinks.appendChild(priceItem);
  }

  const footer = document.querySelector('.site-footer');
  if (footer && !footer.querySelector('.footer-social-strip')) {
    const socialStrip = document.createElement('nav');
    socialStrip.className = 'container footer-social-strip';
    socialStrip.setAttribute('aria-label', 'Социальные сети школы');
    socialStrip.innerHTML = '<span>Новости и предложения</span><div><a href="https://t.me/BC_ZARUBEZHKA" target="_blank" rel="noopener noreferrer">Telegram-канал ↗</a><a class="footer-social-primary" href="https://max.ru/id381710479580_biz" target="_blank" rel="noopener noreferrer">MAX · новости ↗</a><a href="https://vk.ru/zarubina_school" target="_blank" rel="noopener noreferrer">ВКонтакте ↗</a><button class="footer-callback" type="button" data-open-callback>Перезвоним</button><button class="footer-cookie-settings" type="button" data-open-privacy>Настроить cookie</button></div>';
    footer.insertBefore(socialStrip, footerBottom);
  }

  const privacyStorageKey = 'school-privacy-choice-v3';

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
  callbackDialog.innerHTML = '<button class="callback-close" type="button" data-close-callback aria-label="Закрыть">×</button><div class="callback-intro"><span>Обратный звонок</span><h2 id="callback-title">Перезвоним</h2><p>Оставьте ФИО и номер телефона — администратор получит заявку и свяжется с вами.</p></div><form class="callback-form"><label><span>ФИО</span><input name="fullName" type="text" autocomplete="name" required placeholder="Иванова Анна Сергеевна"></label><label><span>Номер телефона</span><input name="phone" type="tel" autocomplete="tel" inputmode="tel" required pattern="[+0-9()\\s-]{7,}" placeholder="+7 900 000-00-00"></label><label class="callback-honeypot" aria-hidden="true"><span>Сайт</span><input name="website" type="text" tabindex="-1" autocomplete="off"></label><label class="callback-consent"><input name="consent" type="checkbox" required><span>Согласен(на) с <a href="/shkola-fz-demo/privacy/" target="_blank">политикой конфиденциальности</a> и даю <a href="/shkola-fz-demo/agreement/" target="_blank">согласие на обработку персональных данных</a>.</span></label><button class="button" type="submit">Отправить заявку</button><p class="callback-status" role="status" aria-live="polite"></p></form>';
  document.body.appendChild(callbackDialog);

  document.addEventListener('click', function (event) {
    const openButton = event.target.closest('[data-open-callback]');
    if (openButton) {
      programDialogTrigger = null;
      closeProgramDialog();
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
  callbackForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!callbackForm.reportValidity()) return;
    const formData = new FormData(callbackForm);
    const fullName = String(formData.get('fullName') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const website = String(formData.get('website') || '').trim();
    const status = callbackForm.querySelector('.callback-status');
    const submitButton = callbackForm.querySelector('button[type="submit"]');

    status.className = 'callback-status';
    status.textContent = 'Отправляем заявку…';
    submitButton.disabled = true;
    submitButton.textContent = 'Отправляем…';

    try {
      const response = await fetch('https://formsubmit.co/ajax/bc-zarubezhka@yandex.ru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          'ФИО': fullName,
          'Телефон': phone,
          'Страница': window.location.href,
          '_subject': 'Новая заявка «Перезвоним» с сайта',
          '_template': 'table',
          '_captcha': 'false',
          '_honey': website
        })
      });
      const result = await response.json().catch(function () { return {}; });
      if (!response.ok || result.success === false || String(result.success).toLowerCase() === 'false') {
        throw new Error('Form submission failed');
      }
      callbackForm.reset();
      status.classList.add('is-success');
      status.textContent = 'Спасибо! Заявка отправлена. Администратор перезвонит вам по указанному номеру.';
      submitButton.textContent = 'Заявка отправлена';
    } catch (error) {
      status.classList.add('is-error');
      status.textContent = 'Не удалось отправить заявку. Позвоните нам по номеру 8 926 077-16-79.';
      submitButton.disabled = false;
      submitButton.textContent = 'Отправить заявку';
    }
  });
})();
