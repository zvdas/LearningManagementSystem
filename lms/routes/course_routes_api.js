const express = require('express');

const productControllerAPI = require('../controllers/course_controller_api');

const router = express.Router();

router.post("/",courseControllerAPI.add);

router.get("/",courseControllerAPI.getAll);

router.get("/:id",courseControllerAPI.getById);

router.put("/",courseControllerAPI.update);

router.delete("/:id",courseControllerAPI.delete);

module.exports = router;