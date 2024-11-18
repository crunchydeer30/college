const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("joi");

const app = express();
app.use(bodyParser.json());

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

function deserializeUser(data) {
  try {
    const result = userSchema.validate(data);
    if (result.error) {
      throw new Error("Invalid data");
    }
    return result.value;
  } catch (error) {
    throw new Error("Failed to deserialize user data");
  }
}

app.post("/users", (req, res) => {
  try {
    const userData = req.body;
    const deserializedUser = deserializeUser(userData);
    res.send(deserializedUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
