# Ghost CMS для Multi-Site Architecture

## 🐳 Docker конфигурация Ghost для Render

Этот Ghost CMS используется как единый источник контента для нескольких Next.js сайтов через систему тегов.

## 📁 Структура файлов

```
ghost-cms-docker/
├── Dockerfile              # Docker образ с Ghost 5
├── render.yaml            # Конфигурация для Render
├── config.production.json # Настройки Ghost
├── deploy.sh             # Скрипт деплоя (опционально)
└── themes/               # Кастомные темы (опционально)
```

## 🚀 Быстрый деплой

```bash
# 1. Создайте GitHub репозиторий
git init
git add .
git commit -m "Ghost CMS multi-site setup"
gh repo create ghost-multisite-cms --public --push

# 2. Подключите к Render
# Dashboard → New → Blueprint → Connect repo

# 3. Настройте домен
# Settings → Custom Domains → blog.dentalprice.ai
```

## 🏷️ Настройка Multi-Site через теги

### В Ghost Admin создайте internal теги:

| Tag | Для сайта | Описание |
|-----|-----------|----------|
| `#dentalprice` | dentalprice.ai | Основной сайт |
| `#partners` | partner sites | Партнерские сайты |
| `#internal` | - | Внутренние посты |

### Как это работает:

1. При создании поста добавьте tag `#dentalprice`
2. Next.js сайт фильтрует: `filter: 'tag:hash-dentalprice'`
3. Только эти посты появятся на dentalprice.ai/blog

## 🔑 Получение API Keys

После деплоя:
1. Откройте `https://blog.dentalprice.ai/ghost`
2. Settings → Integrations → Add custom integration
3. Name: "Multi-Site API"
4. Скопируйте **Content API Key**

## 🔧 Environment Variables для Render

Автоматически настраиваются из render.yaml:
- PostgreSQL база данных
- URL: blog.dentalprice.ai
- Email и Storage (опционально)

## 📊 Мониторинг

- Health check: `/ghost/api/admin/site/`
- Admin panel: `/ghost`
- Content API: `/ghost/api/content/`

## 🚦 Checklist деплоя

- [ ] GitHub repo создан
- [ ] Подключен к Render
- [ ] База данных создана
- [ ] Домен настроен
- [ ] SSL активен
- [ ] Admin аккаунт создан
- [ ] API key получен
- [ ] Internal теги созданы

## 📚 Документация

- Основная документация: [../README_MULTISITE.md](../README_MULTISITE.md)
- Интеграция Next.js: [../ghost-multisite-setup/](../ghost-multisite-setup/)
- Ghost Docs: https://ghost.org/docs/