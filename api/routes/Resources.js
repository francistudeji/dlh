const Resource = require("../models/Resource");
const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads/");
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  }
});

const upload = multer({ storage });

// Get Customers
router.get("/", (req, res) => {
  Resource.find({})
    .then(resources => {
      res.status(200).json({ status: "ok", resources });
    })
    .catch(err => {
      res.status(200).json({ status: "not ok", err });
    });
});

// Get Single Customer
router.get("/:id", async (req, res, next) => {
  Resource.findById(req.params.id)
    .then(resource => {
      res.status(200).json({ status: "ok", resource });
    })
    .catch(err => {
      res.status(200).json({ status: "not ok", err });
    });
});

// Add Customer
router.post("/", upload.single("avatar"), (req, res, next) => {
  const { name, description } = req.body;

  const url = "https://ibibiolanguagehub.herokuapp.com" + "/" + req.file.originalname
  const resource = new Resource({
    name,
    description,
    langfile: url
  });

  resource
    .save()
    .then(resource => {
      console.log(resource);
      res
        .status(201)
        .json({ success: true, message: "Resource Created", resource });
    })
    .catch(err => {
      console.log(err.message);
      res
        .status(400)
        .json({ success: false, message: "Resource not Created", err });
    });
});

// Update Customer
router.put("/:id", async (req, res, next) => {
  try {
    const resource = await Resource.findOneAndUpdate(
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
    const post = await Resource.findOneAndRemove({
      _id: req.params.id
    });
    res.status(204).json({ status: "ok", message: "Post deleted" });
    next();
  } catch (err) {
    return next(`There is no customer with the id of ${req.params.id}`);
  }
});

module.exports = router;
