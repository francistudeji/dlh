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
    // Check for JSON
    if (!req.is("application/json")) {
      return next("Expects 'application/json'");
    }

    const { title, author, body, slug, image } = req.body;

    const post = new Post({
      title,
      author,
      body,
      slug,
      image
    });

    try {
      const newPost = await post.save();
      res.send(201);
      next();
    } catch (err) {
      return next(err.message);
    }
  });

  // Update Customer
  app.put(
    "/api/posts/:id",
    async (req, res, next) => {
      // Check for JSON
      if (!req.is("application/json")) {
        return next(
          "Expects 'application/json'"
        );
      }

      try {
        const post = await Post.findOneAndUpdate(
          { _id: req.params.id },
          req.body
        );
        res.send(200);
        next();
      } catch (err) {
        return next(`There is no customer with the id of ${req.params.id}`);
      }
    }
  );

  // Delete Customer
  app.delete(
    "/api/posts/:id",
    async (req, res, next) => {
      try {
        const post = await Post.findOneAndRemove({
          _id: req.params.id
        });
        res.send(204);
        next();
      } catch (err) {
        return next(`There is no customer with the id of ${req.params.id}`);
      }
    }
  );
};
