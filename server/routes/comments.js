const express = require('express');
const router = express.Router();
const {getcomments,addcomment,deletecomm} = require('../controllers/comment');
const { add } = require('lodash');


router.get("/getPostComments",getcomments)
router.post("/addComment",addcomment)
router.delete("/:id",deletecomm);
module.exports = router;