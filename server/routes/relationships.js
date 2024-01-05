const express = require('express');
const router = express.Router();

const {getAllFollowings,getAllFollowers,addfollowing,deleterelationship} = require('../controllers/relationships');

router.get("/getAllFollowings",getAllFollowings);
router.get('/getAllFollowers',getAllFollowers)
router.post("/addfoll",addfollowing);
router.delete("/del",deleterelationship);

module.exports = router;

