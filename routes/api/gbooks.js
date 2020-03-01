const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/gbooks/:name"
router.route("/:name")
  .get(booksController.qGoogle);

module.exports = router;
