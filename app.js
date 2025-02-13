const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const postRouter = require("./routes/post");

const app = express();

const port = process.env.PORT || 5000;
const clientPath = path.join(__dirname, "client");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(bodyParser.json());

app.use("/api/post", postRouter);

app.use(express.static(clientPath));

app.listen(port, () => console.log(`Server has been started on port ${port}`));
