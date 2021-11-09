const router = require('express').Router();
const {catchErrors} = require("../handlers/errorHanders");
const chatroomController = require("../controllers/chatroomController");

const auth = require("../middlewares/auth");

router.get("/getchatrooms",auth,catchErrors(chatroomController.getAllChatrooms));
router.post("/createchatrooms",auth,catchErrors(chatroomController.createChatroom));
router.get("/generatechatrooms",auth,catchErrors(chatroomController.generateChatroom));


module.exports = router;