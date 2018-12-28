const Post = require("../models/Post");
const router = require("express").Router();


// Get Customers
router.get("/", (req, res) => {
  Post.find({})
    .then(posts => {
      res.status(200).json({status: "ok", posts});
    })
    .catch(err => {
      res.status(200).json({ status: "not ok", err });
    })
});

// Get Single Customer
router.get("/:id", async (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      res.status(200).json({ status: "ok", post });
    })
    .catch(err => {
      res.status(200).json({ status: "not ok", err });
    })
});

// Add Customer
router.post("/", async (req, res, next) => {
  const { title, author, description, content, slug } = req.body;

  console.log(title, author, description, content, slug);
  const post = new Post({
    title,
    author,
    description,
    content,
    slug
  });

  post
    .save()
    .then(data => {
      console.log(data);
      res.status(201).json({ success: true, message: "Post Created", data });
    })
    .catch(err => {
      console.log(err.message);
      res.status(400).json({ success: false, message: "Post not Created", err });
    });
});

// Update Customer
router.put("/:id", async (req, res, next) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).json({ status: "ok", message: "Post found" });
    next();
  } catch (err) {
    return next(`There is no customer with the id of ${req.params.id}`);
  }
});

// Delete Customer
router.delete("/:id", async (req, res, next) => {
  try {
    const post = await Post.findOneAndRemove({
      _id: req.params.id
    });
    res.status(204).json({ status: "ok", message: "Post deleted" });
    next();
  } catch (err) {
    return next(`There is no customer with the id of ${req.params.id}`);
  }
});

module.exports = router;
