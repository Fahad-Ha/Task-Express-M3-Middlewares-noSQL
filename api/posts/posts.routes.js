const express = require("express");
const router = express.Router();
const {
  postsGet,
  postsUpdate,
  postsDelete,
  postsCreate,
  fetchPost,
} = require("./posts.controllers");

router.param("postId", (req, res, next, postId) => {
  try {
    const foundPost = fetchPost();
    if (!foundPost) {
      return next({ status: 404, message: "Post Not Found" });
    }
    req.post = foundPost;
  } catch (err) {
    return next(err);
  }
});

router.get("/", postsGet);
router.post("/", postsCreate);

router.delete("/:postId", postsDelete);

router.put("/:postId", postsUpdate);

module.exports = router;
