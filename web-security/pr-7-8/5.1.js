const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.send("Тестовый запрос");
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
