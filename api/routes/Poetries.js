const Poetry = require("../models/Poetry")
const router = require("express").Router()

// Get Customers
router.get("/", (req, res) => {
  Poetry.find({})
    .then(poetries => {
      res.status(200).json({ status: "ok", poetries })
    })
    .catch(err => {
      res.status(200).json({ status: "not ok", err })
    })
})

router.get("/:id", async (req, res, next) => {
  Poetry.findById(req.params.id)
    .then(poetry => {
      res.status(200).json({ status: "ok", poetry })
    })
    .catch(err => {
      res.status(200).json({ status: "not ok", err })
    })
})


router.post("/", (req, res, next) => {
  const { poetryTitle, poetrySubtitle, poetryFindings } = req.body

  const poetry = new Poetry({
    poetryTitle,
    poetrySubtitle,
    poetryFindings
  })

  poetry
    .save()
    .then(poet => {
      console.log(poet)
      res
        .status(201)
        .json({ success: true, message: "Poetry Added", poet })
    })
    .catch(err => {
      console.log(err.message)
      res.status(400).json({
        success: false,
        message: "Failed to add Poetry",
        err
      })
    })
})

module.exports = router
