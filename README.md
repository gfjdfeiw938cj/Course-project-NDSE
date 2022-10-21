# CourseProject
# Курсовой проект "NDSE - Настройка окружения и Express.js"

## Запуск приложения

Для запуска приложения необходим Docker
1) Скачать репозиторий
2) Выполнить команду docker-compose build
3) Выполнить команду docker-compose up

## Функционал
### API

#### Регистрация
POST /api/signup — зарегистрироваться
#### Аутентификация
POST /api/signin — залогиниться

#### Просмотр объявлений
GET /api/advertisements — получить список объявлений.
GET /api/advertisements/:id — получить данные объявления.
#### Управление объявлениями
POST /api/advertisements — добавить объявление.
DELETE /api/advertisements/:id — удалить объявление

### SOCKET.IO

Приходящее событие 'get-history' - получить историю сообщений из чата
Приходящее событие 'send-message' - отправить сообщение
Отправляемое событие 'chat-history' - ответ на событие 'get-history'.
Отправляемое событие 'new-message' - ответ на событие 'send-message'.

