# Сайт-визитка психолога-аддиктолога

Современный одностраничный сайт для Николая Николаевича Абаза с mobile-first подходом.

## Технологии

- HTML5 (семантическая разметка)
- CSS3 (адаптивный дизайн, анимации)
- Vanilla JavaScript (без зависимостей)
- Google Fonts (Inter)

## Особенности

✅ **Mobile-first дизайн** - отлично работает на устройствах от 320px до 1920px
✅ **Быстрая загрузка** - оптимизирован для загрузки < 2 секунд
✅ **Анимации** - плавные fade-in эффекты при скролле
✅ **Слайдер отзывов** - автоматическая смена + свайпы на мобильных
✅ **Доступность** - поддержка клавиатурной навигации и скринридеров
✅ **SEO-оптимизация** - правильные meta-теги и семантическая разметка

## Структура файлов

```
nn-site/
├── index.html          # Основная страница
├── styles.css          # Все стили
├── script.js           # JavaScript функционал
└── README.md           # Документация
```

## Запуск

Просто откройте `index.html` в браузере. Сайт не требует сервера.

Для локальной разработки можно использовать Live Server:

```bash
# Если у вас установлен Python
python -m http.server 8000

# Или с Node.js (npx)
npx serve
```

## Цветовая схема

- **Основной цвет**: `#4A90A4` (мягкий синий)
- **Фон**: `#F5F3F0` (бежевый)
- **Текст**: `#2C2C2C` (темно-серый)
- **Белый**: `#FFFFFF`

## Адаптивность

Сайт оптимизирован для следующих breakpoints:

- **320px-479px**: Мобильные устройства (mobile-first базовые стили)
- **480px-767px**: Большие мобильные / маленькие планшеты
- **768px-1023px**: Планшеты
- **1024px-1439px**: Маленькие десктопы
- **1440px-1919px**: Стандартные десктопы
- **1920px+**: Большие экраны

## Добавление контента

### Добавление фотографии специалиста

В секцию `.hero-content` добавьте:

```html
<div class="hero-image">
    <img src="images/photo.webp" alt="Николай Николаевич Абаза" loading="lazy" width="300" height="300">
</div>
```

### Добавление дипломов/сертификатов

Создайте новую секцию после "О специалисте":

```html
<section class="certificates" id="certificates">
    <div class="container">
        <h2 class="section-title fade-in">Образование и сертификаты</h2>
        <div class="certificates-grid">
            <img src="images/cert1.webp" alt="Диплом" loading="lazy">
            <!-- Добавьте остальные -->
        </div>
    </div>
</section>
```

### Замена заглушек в отзывах

В `index.html` найдите секцию `.testimonials` и отредактируйте содержимое карточек `.testimonial-card`.

## Оптимизация изображений

Для максимальной производительности используйте WebP формат:

```bash
# Конвертация изображений в WebP (с помощью cwebp)
cwebp -q 80 image.jpg -o image.webp

# Или онлайн: https://squoosh.app/
```

Рекомендуемые размеры:
- Фото специалиста: 600x600px
- Дипломы: 1200x900px
- Иконки: SVG (векторные)

## Настройка контактов

Контакты находятся в нескольких местах:

1. **Hero-секция** - кнопки Telegram и WhatsApp
2. **Секция контактов** - детальная информация

Для изменения ссылок отредактируйте:
- `https://t.me/niko.las0174` - Telegram
- `https://wa.me/77711031232` - WhatsApp (формат: международный код без +)
- `tel:+77711031232` - Телефонные ссылки

## Дополнительная оптимизация

### Минификация файлов

Для production используйте минифицированные версии:

```bash
# CSS
npx clean-css-cli -o styles.min.css styles.css

# JavaScript
npx terser script.js -o script.min.js -c -m
```

### Google Analytics

Добавьте перед закрывающим `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Open Graph для соцсетей

Добавьте в `<head>`:

```html
<meta property="og:title" content="Николай Абаза - Психолог-аддиктолог">
<meta property="og:description" content="Первый шаг к свободе от зависимости">
<meta property="og:image" content="https://yoursite.com/images/og-image.jpg">
<meta property="og:url" content="https://yoursite.com">
<meta property="og:type" content="website">
```

## Браузерная поддержка

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

Для старых браузеров может потребоваться полифил для Intersection Observer.

## Лицензия

Все права защищены © 2026 Николай Николаевич Абаза

## Техническая поддержка

При возникновении вопросов обращайтесь к разработчику или используйте браузерную консоль для отладки (F12).

---

**Версия**: 1.0.0
**Дата создания**: Январь 2026
**Последнее обновление**: Январь 2026
