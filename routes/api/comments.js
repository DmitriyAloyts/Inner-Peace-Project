const router = require("express").Router();
const postsController = require("../../controllers/postsController");

// Matches with "/api/comments"
router
  .route("/")
  .post(postsController.createComment);

module.exports = router;