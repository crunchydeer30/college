const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "users",
});

db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err);
    return;
  }
  console.log("Подключение к базе данных успешно");
});

app.use(bodyParser.urlencoded({ extended: true }));

function registerUser(req, res) {
  const { name, email, password } = req.body;

  // Хеширование пароля
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Запись данных в базу данных
  const query = "INSERT INTO users SET ?";
  const userData = { name, email, password: hashedPassword };
  db.query(query, userData, (err, results) => {
    if (err) {
      console.error("Ошибка записи данных в базу данных:", err);
      res.status(500).send("Ошибка записи данных в базу данных");
      return;
    }
    res.send("Пользователь успешно зарегистрирован");
  });
}

app.post("/register", registerUser);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
