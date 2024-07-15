const express = require('express');
const { register, login, users, data } = require('../controllers/userControllers');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
// router.get("/users", auth, isAdmin, users)
router.get("/users", users)
router.get("/data", data)

module.exports = router;