const Admin = require("../models/Admin");
const router = require("express").Router();
const uuid = require("uuidv4");
const bcrypt = require("bcryptjs");

const administrator = {
  email: "edimenzani@gmail.com",
  password: "lorem1234",
  token: uuid()
};

// Get Customers
router.get("/register", (req, res) => {
  const { email, password, token } = administrator;

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  const admin = new Admin({
    email: email,
    password: hash,
    token
  });

  admin
    .save()
    .then(admin => {
      res.status(201).json({
        status: "ok",
        admin
      });
    })
    .catch(err => {
      res.status(401).json({
        status: "not ok",
        err
      });
    });
});

// Get Customers
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Admin.findOne({ email }, (err, admin) => {
    if (err) {
      res.status(404).json({
        status: 404,
        error: {
          message: 'adminnotfound'
        }
      });
    } else {

      const isValidPassword = bcrypt.compareSync(password, admin.password);

      if (!isValidPassword) {
        res.status(404).json({
          status: 404,
          error: {
            message: 'invalidcredentials'
          }
        });
      } else {
        const authadmin = {
          firstname: admin.firstname,
          lastname: admin.lastname,
          email: admin.email,
          token: admin.token
        };

        res.status(200).json({
          status: 200,
          admin: authadmin
        });
      }
    }





  });
});

// Get Single Customer
router.get("/logout", async (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      res.status(200).json({ status: "ok", post });
    })
    .catch(err => {
      res.status(200).json({ status: "not ok", err });
    });
});

// // Add Customer
// router.post("/", async (req, res, next) => {
//   const { title, author, description, content, slug } = req.body;

//   console.log(title, author, description, content, slug);
//   const post = new Post({
//     title,
//     author,
//     description,
//     content,
//     slug
//   });

//   post
//     .save()
//     .then(data => {
//       console.log(data);
//       res.status(201).json({ success: true, message: "Post Created", data });
//     })
//     .catch(err => {
//       console.log(err.message);
//       res
//         .status(400)
//         .json({ success: false, message: "Post not Created", err });
//     });
// });

// // Update Customer
// router.put("/:id", async (req, res, next) => {
//   try {
//     const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body);
//     res.status(200).json({ status: "ok", message: "Post found" });
//     next();
//   } catch (err) {
//     return next(`There is no customer with the id of ${req.params.id}`);
//   }
// });

// // Delete Customer
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const post = await Post.findOneAndRemove({
//       _id: req.params.id
//     });
//     res.status(204).json({ status: "ok", message: "Post deleted" });
//     next();
//   } catch (err) {
//     return next(`There is no customer with the id of ${req.params.id}`);
//   }
// });

module.exports = router;
