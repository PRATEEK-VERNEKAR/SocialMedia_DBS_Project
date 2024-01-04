const express = require('express');
const router = express.Router();
const {getposts,addposts,deleteposts, getAllposts, getUserByPosts} = require('../controllers/post.js');



router.get('/allPosts',getAllposts)
router.get("/post/:postid",getposts);
router.post('/getUserByPosts',getUserByPosts);
router.post("/create",addposts);
router.delete("/delete",deleteposts);

module.exports = router;