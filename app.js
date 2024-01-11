const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
require("dotenv").config();
const postRouter = require("./routes/post");

const app = express();

const port = process.env.PORT || 5000;
const clientPath = path.join(__dirname, "client");

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@fullstackblog.na8dy.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(bodyParser.json());

app.use("/api/post", postRouter);

app.use(express.static(clientPath));

app.listen(port, () => console.log(`Server has been started on port ${port}`));
