const express = require('express');
const router = express.Router();
const {getposts,addposts,deleteposts, getAllposts} = require('../controllers/post.js');



router.get('/allPosts',getAllposts)
router.get("/post",getposts);
router.post("/create",addposts);
router.delete("/delete",deleteposts);

module.exports = router;