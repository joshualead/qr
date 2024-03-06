const express = require("express");
const Controller = require("../controller");
const router = express.Router();


router.get("/", Controller.home);
router.get("/all", Controller.all);
router.get("/new_person", Controller.newPerson);
router.get("/add_score", Controller.addScore);

module.exports = router;
