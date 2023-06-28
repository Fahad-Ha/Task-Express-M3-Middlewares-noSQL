const express = require("express");
const router = express.Router();
const uploader = require("../../middlewares/uploader");
const {
  postsGet,
  postsUpdate,
  postsDelete,
  postsCreate,
  fetchPost,
  getPostById,
} = require("./posts.controllers");

router.param("postId", async (req, res, next, postId) => {
  try {
    const foundPost = await fetchPost(postId);
    if (!foundPost) {
      return next({ status: 404, message: "Post Not Found" });
    }
    req.post = foundPost;
    return next();
  } catch (err) {
    return next(err);
  }
});

router.get("/", postsGet);
router.post("/", uploader.single("image"), postsCreate);

router.delete("/:postId", postsDelete);

router.put("/:postId", postsUpdate);

router.get("/:postId", getPostById);

module.exports = router;
