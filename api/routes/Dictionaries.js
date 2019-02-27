const Dictionary = require("../models/Dictionary");
const router = require("express").Router();

// Get Customers
router.get("/", (req, res) => {
  Dictionary.find({})
    .then(words => {
      res.status(200).json({ status: "ok", words });
    })
    .catch(err => {
      res.status(200).json({ status: "not ok", err });
    });
});

router.get("/:id", async (req, res, next) => {
  Dictionary.findById(req.params.id)
    .then(word => {
      res.status(200).json({ status: "ok", word });
    })
    .catch(err => {
      res.status(200).json({ status: "not ok", err });
    });
});

// Add Customer
router.post("/", (req, res, next) => {
  const { englishWord, ibibioWord } = req.body;

  const dictionary = new Dictionary({
    englishWord,
    ibibioWord
  });

  dictionary
    .save()
    .then(word => {
      console.log(word);
      res
        .status(201)
        .json({ success: true, message: "Word Added to Dictionary", word });
    })
    .catch(err => {
      console.log(err.message);
      res
        .status(400)
        .json({
          success: false,
          message: "Failed to add Word to Dictionary",
          err
        });
    });
});

module.exports = router;
