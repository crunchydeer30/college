const express = require("express");
const axios = require("axios");
const { URL } = require("url");

const urlValidator = (url) => {
  try {
    const parsedUrl = new URL(url);
    return (
      ["http:", "https:"].includes(parsedUrl.protocol) &&
      parsedUrl.hostname !== "internal-domain.com"
    );
  } catch (error) {
    return false;
  }
};

const app = express();

app.get("/fetch-url", async (req, res) => {
  const { url: requestedUrl } = req.query;

  if (!requestedUrl || !urlValidator(requestedUrl)) {
    return res.status(400).send({ error: "Invalid or unsafe URL" });
  }

  try {
    const { data, status, statusText } = await axios.get(requestedUrl);
    res.json({ data, status, statusText });
  } catch ({ response }) {
    res
      .status(500)
      .send({ error: "Error fetching URL", details: response.data });
  }
});

app.use((req, res) => {
  res.status(404).send({ error: "Not Found" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
