const express = require('express');
const router = express.Router();
const {addlike,dislike, getpostlikes} = require('../controllers/like');

router.get("/getlikes",getpostlikes);
router.post("/like",addlike);
router.delete("/like",dislike)

module.exports = router;