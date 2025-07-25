# Тестовый проект на Node.js пл парсингу блога

Задание: Необходимо реализовать мини-приложение парсер блога, поиска статей по запросу в формате одностраничника.

----------------------Сервер-----------------------<br>
.<br>

├── index.js # Точка входа в приложение<br>
├── knexfile.js         # Конфигурация Knex<br>
├── /migrations         # Папка с миграциями базы данных<br>
├── /db.sqlite          # SQLite база данных (создаётся автоматически)<br>
├── .env                # Переменные окружения<br>
├── package.json<br>

🛠️ Установка<br>
1.Установите зависимости:<br>
npm install<br>
2.Создайте базу данных и выполните миграции:<br>
npx knex migrate:latest --env development<br>
(Если npx knex не работает, установите knex глобально:<br>
npm install -g knex)<br>
▶️ Запуск сервера<br>
Для разработки (c авто-перезапуском):<br>
npm run dev<br>
Для продакшена:<br>
npm start<br>
По умолчанию сервер запускается на http://localhost:8080<br>
# Пример миграции(если необходимо создать)
exports.up = function (knex) {<br>
return knex.schema.createTable('posts', function (table) {<br>
table.increments('id').primary()<br>
table.string('link').notNullable()<br>
table.string('title').notNullable()<br>
table.text('descr').notNullable()<br>
table.text('date').notNullable()<br>
})<br>
}<br>

exports.down = function (knex) {<br>
return knex.schema.dropTable('posts')<br>
}<br>
<br>
----------------------Клиент-----------------------<br>

🛠️ Установка:<br>
npm install<br>
▶️ Запуск Клиента<br>
npm run dev<br>
▶️ (дополнительно)Сборка проекта:<br>
npm run build<br>
▶️ Превью сборки (для проверки production-версии локально):<br>
npm run preview<br>
🗂️ Структура проекта (примерная)<br>
front/<br>
├── public/                # Статические файлы<br>
├── src/<br>
│   ├── components/        # Компоненты Vue<br>
│   │   ├── SearchForm.vue<br>
│   │   └── SearchResult.vue<br>
│   ├── App.vue<br>
│   └── main.ts<br>
├── .env                   # Переменные окружения<br>
├── index.html<br>
├── package.json<br>
└── vite.config.js<br>

