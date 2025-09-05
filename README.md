# Ghost Blog для DentalPrice

## 📝 Простой блог на поддомене

Это Ghost CMS для blog.dentalprice.ai - отдельный блог без сложных интеграций.

## 🚀 Деплой

### Render настройки
- **Сервис**: dentalprice-blog
- **URL**: https://dentalprice-blog.onrender.com
- **Домен**: blog.dentalprice.ai
- **План**: Starter ($7/месяц)

### DNS настройка
```
Type: CNAME
Name: blog
Value: dentalprice-blog.onrender.com
```

## 📁 Файлы

```
ghost-cms-docker/
├── Dockerfile              # Docker образ
├── render.yaml            # Конфигурация Render
├── config.production.json # Настройки Ghost
└── docker-compose.yml     # Локальная разработка
```

## 💻 Локальная разработка

```bash
docker compose up
# Открыть: http://localhost:2369/ghost
```

## 📧 Email

Настроен Zoho SMTP:
- От: noreply@dentalprice.ai
- Работают все функции email

## 🔗 Интеграция

На основном сайте просто добавьте ссылку:
```html
<a href="https://blog.dentalprice.ai">Blog</a>
```

---
Простое решение - отдельный блог на поддомене!