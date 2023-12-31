const express = require('express');
const router = express.Router();
const {getuser,updateuser,protectedRoute, getAllUser, updateProfile, updateCover, getSearchedUser} = require('../controllers/user');


router.get("/protectedRoute",protectedRoute);
router.get('/getAllUsers',getAllUser);
router.get("/getUser",getuser);
router.get('/getSearchedUser/:userid',getSearchedUser);
router.put("/updateUser",updateuser);
router.put("/updateCover",updateCover);
router.put("/updateProfile",updateProfile);


module.exports = router;