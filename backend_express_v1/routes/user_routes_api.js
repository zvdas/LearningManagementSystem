const express = require('express');

const userControllerAPI = require('../controllers/user_controller_api');

const router = express.Router();

router.post("/", userControllerAPI.add);

router.get("/", userControllerAPI.getAll);

router.get("/:id", userControllerAPI.getById);

router.put("/", userControllerAPI.update);

router.delete("/:id", userControllerAPI.delete);

module.exports = router;