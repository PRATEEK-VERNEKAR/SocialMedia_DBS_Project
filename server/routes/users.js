const express = require('express');
const router = express.Router();
const {getuser,updateuser,protectedRoute} = require('../controllers/user');


router.get("/protectedRoute",protectedRoute);
router.get("/:id",getuser);
router.put("/:id",updateuser);

module.exports = router;