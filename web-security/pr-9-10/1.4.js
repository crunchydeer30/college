const express = require("express");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const csrfConfig = {
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  },
};

const csrfProtection = csrf(csrfConfig);
const app = express();

app.use(cookieParser());
app.use(csrfProtection);

app.get("/", (req, res) => {
  res.status(200).send({ message: "CSRF protection is online" });
});

app.post("/submit", (req, res) => {
  if (req.csrfToken() === req.body.csrfToken) {
    res.status(201).send({ message: "CSRF token verified successfully" });
  } else {
    res.status(403).send({ message: "CSRF token mismatch" });
  }
});

app.listen(3000, () => {
  console.log(`Server is live on port 3000`);
});
