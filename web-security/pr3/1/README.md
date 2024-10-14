##  Инструкция
- npm i
- cp .env.example .env
- docker compose up -d
- npx prisma db push
- npm run dev

##  Задание
Создайте приложение на Flask, которое принимает текстовые данные от пользователя, шифрует их с помощью AES и сохраняет зашифрованные данные в базе данных.