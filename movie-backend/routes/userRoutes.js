const express = require('express');
const { getUser, login, logout, register } = require('../controllers/userController');
const { validateRegisterRequest, validateLoginRequest } = require('../validations/validationSchema');
const { addFavorite, removeFavorite, getfavorite } = require('../controllers/movieController');
const { getComment, addComment } = require('../controllers/commentController');

const router = express.Router();
router.post("/register",validateRegisterRequest,register)
router.post("/login",validateLoginRequest,login)
router.get("/logout",logout)
router.get("/getuser", getUser)
router.post("/addfavorite", addFavorite)
router.delete("/removefavorite", removeFavorite)
router.get("/getfavorite/:username",getfavorite)
router.post("/addcomment/:imdbID", addComment)
router.get("/getcomment/:imdbID",getComment)

module.exports = router;