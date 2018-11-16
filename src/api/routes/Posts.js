const Post = require("../models/Post");

module.exports = app => {
  // Get Customers
  app.get("/api/posts", async (req, res, next) => {
    try {
      const post = await Post.find({});
      res.send(post);
      next();
    } catch (err) {
      return next({ err });
    }
  });

  // Get Single Customer
  app.get("/api/posts/:id", async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      res.send(post);
      next();
    } catch (err) {
      return next(`There is no customer with the id of ${req.params.id}`);
    }
  });

  // Add Customer
  app.post("/api/posts", async (req, res, next) => {
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
  app.put("/api/posts/:id", async (req, res, next) => {
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
  app.delete("/api/posts/:id", async (req, res, next) => {
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
};
