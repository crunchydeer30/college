const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/login", (req, res) => {
  req.session.user = { id: 1, name: "John Doe" };
  res.send("Вы успешно авторизовались");
});

app.get("/profile", (req, res) => {
  if (req.session.user) {
    res.send(`Привет, ${req.session.user.name}`);
  } else {
    res.send("Вы не авторизованы");
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
