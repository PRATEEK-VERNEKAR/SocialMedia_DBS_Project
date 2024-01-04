const express = require('express');
const router = express.Router();
const {getuser,updateuser,protectedRoute, getAllUser} = require('../controllers/user');


router.get("/protectedRoute",protectedRoute);
router.get('/getAllUsers',getAllUser);
router.get("/:id",getuser);
router.put("/:id",updateuser);

module.exports = router;