const router = require("express").Router();
const bookRoutes = require("./books");
const gbookRoutes = require("./gbooks");

// Book routes
router.use("/books", bookRoutes);
router.use("/gbooks", gbookRoutes);

module.exports = router;
