##  Инструкция
- npm i
- cp .env.example .env
- docker compose up -d
- npx prisma db push
- npm run dev

##  Задание
Создайте сервер на Flask, который использует библиотеки для проверки и очистки вводимых данных от HTML-тегов и спецсимволо