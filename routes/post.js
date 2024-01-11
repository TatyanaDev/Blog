const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find({});

  res.status(200).json(posts);
});

router.post("/", async (req, res) => {
  const postData = {
    title: req.body.title,
    text: req.body.text,
  };

  const post = new Post(postData);
  await post.save();

  res.status(201).json(post);
});

router.delete("/:postId", async (req, res) => {
  await Post.deleteOne({ _id: req.params.postId });

  res.status(200).json({ message: "Deleted" });
});

module.exports = router;
