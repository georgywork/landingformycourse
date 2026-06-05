# Landing

Статический одностраничный лендинг на чистом `HTML + CSS + JavaScript`, готовый к деплою на GitHub Pages.

## Структура

- `index.html` — основная страница лендинга
- `css/style.css` — базовые стили и layout
- `css/mobile.css` — адаптивные брейкпоинты для tablet и desktop
- `css/animations.css` — scroll-анимации
- `js/main.js` — `IntersectionObserver` для reveal-анимаций
- `js/carousel.js` — переключение отзывов по одному
- `js/form.js` — отправка формы в Google Apps Script
- `google-apps-script/Code.gs` — серверная логика для Google Sheets + email

## Как запустить локально

1. Открой файл `landing/index.html` в браузере.

## Деплой на GitHub Pages

1. Закоммить папку `landing/` в репозиторий.
2. В настройках GitHub Pages выбери ветку с проектом.
3. Укажи корневую папку публикации, если нужно, или перенеси содержимое `landing/` в root ветки Pages.

## Что можно заменить позже

- Фото автора
- Скриншоты отзывов

## Как включить сбор заявок

1. Создай новую Google Sheets таблицу.
2. В таблице открой `Extensions -> Apps Script`.
3. Вставь код из [Code.gs](/Users/gastepanov/Documents/landingformycourse/landing/google-apps-script/Code.gs).
4. Нажми `Deploy -> New deployment -> Web app`.
5. Выбери:
   - `Execute as`: `Me`
   - `Who has access`: `Anyone`
6. Скопируй URL веб-аппа.
7. Открой [form.js](/Users/gastepanov/Documents/landingformycourse/landing/js/form.js) и замени строку `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` на этот URL.
8. Если позже меняешь код в Apps Script, обязательно заново сделай `Deploy -> Manage deployments -> Edit -> Deploy`, чтобы обновить опубликованную версию.

После этого форма будет:
- записывать заявки в Google Sheets
- отправлять уведомление на `georgywork0@gmail.com`
