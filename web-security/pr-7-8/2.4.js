const express = require("express");
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

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

function cleanAndValidateData(data) {
  const cleanedData = {};

  cleanedData.username = data.username.trim();
  if (cleanedData.username.length < 3 || cleanedData.username.length > 20) {
    throw new Error("Имя пользователя должно быть от 3 до 20 символов");
  }

  cleanedData.email = data.email.trim();
  if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(cleanedData.email)
  ) {
    throw new Error("Некорректный адрес электронной почты");
  }

  cleanedData.password = data.password.trim();
  if (cleanedData.password.length < 8 || cleanedData.password.length > 50) {
    throw new Error("Пароль должен быть от 8 до 50 символов");
  }

  return cleanedData;
}

app.post("/register", (req, res) => {
  try {
    const cleanedData = cleanAndValidateData(req.body);

    // Запись данных в базу данных
    const query = "INSERT INTO users SET ?";
    db.query(query, cleanedData, (err, results) => {
      if (err) {
        console.error("Ошибка записи данных в базу данных:", err);
        res.status(500).send("Ошибка записи данных в базу данных");
        return;
      }
      res.send("Пользователь успешно зарегистрирован");
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
