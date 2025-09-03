#!/bin/sh
# Startup script для Ghost с возможностью сброса админа

# Проверяем переменную окружения для сброса
if [ "$RESET_ADMIN" = "true" ]; then
    echo "Resetting admin password..."
    # Ждем запуска Ghost
    sleep 10
    # Применяем SQL сброс если база существует
    if [ -f "/var/data/ghost.db" ]; then
        sqlite3 /var/data/ghost.db < /tmp/reset-admin.sql
        echo "Admin reset complete. Login: admin@ghost.local / GhostAdmin2024!"
    fi
fi

# Запускаем Ghost
exec node --max-old-space-size=256 current/index.js