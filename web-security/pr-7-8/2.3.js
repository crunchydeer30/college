const validator = require("validator");
const express = require("express");
const app = express();
const port = 3000;

function cleanUrlData(url) {
  url = url.trim();

  if (!validator.isURL(url)) {
    throw new Error("Некорректный URL");
  }

  url = validator.escape(url);

  return url;
}

app.post("/url", (req, res) => {
  const url = req.body.url;
  const cleanedUrl = cleanUrlData(url);

  // DB operations

  res.send(`URL: ${cleanedUrl}`);
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
