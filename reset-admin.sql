-- SQL скрипт для сброса админ пользователя Ghost
-- Создает нового админа с простым паролем

-- Удаляем существующего пользователя (опционально)
-- DELETE FROM users WHERE email = 'admin@ghost.local';

-- Создаем нового админа с известным паролем
-- Пароль: GhostAdmin2024!
INSERT OR REPLACE INTO users (
    id,
    name,
    slug,
    password,
    email,
    profile_image,
    cover_image,
    bio,
    website,
    location,
    accessibility,
    status,
    locale,
    visibility,
    meta_title,
    meta_description,
    tour,
    last_seen,
    created_at,
    created_by,
    updated_at,
    updated_by
) VALUES (
    '1',
    'Admin',
    'admin',
    '$2b$10$D0XDcdqqGvDw.RkQSI/WjOIz7dHhf8fTeXlKpF06e2LhKzQ8qGbNe',
    'admin@ghost.local',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'active',
    'en',
    'public',
    NULL,
    NULL,
    NULL,
    datetime('now'),
    datetime('now'),
    '1',
    datetime('now'),
    '1'
);

-- Даем админские права
INSERT OR REPLACE INTO roles_users (
    id,
    role_id,
    user_id
) VALUES (
    '1',
    '4', -- Owner role
    '1'
);