import express from "express";
import fs from "fs/promises";

const app = express();
app.use(express.static("static"));

app.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("static/index.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.send(data);
  } catch (e) {
    res.status(404).send("Not found");
  }
  res.send("OK");
});

app.listen(8000, () => {
  console.log("Server is listening on http://localhost:8000");
});
