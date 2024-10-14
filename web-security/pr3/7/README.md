##  Инструкция
- npm i
- cp .env.example .env
- docker compose up -d
- npx prisma db push
- npm run dev

##  Задание
Создайте сервер на Flask, который безопасно обрабатывает загрузку файлов, проверяя расширение и размер файла.