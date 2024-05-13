const express = require("express");
const healthInfoController = require("../controllers/healthInfoController");
const authMiddleware = require("../middleware/authMiddleware");
//const USER_ROLES = require("../constants/roles");

const router = express.Router();

router.post("/", /*authMiddleware([USER_ROLES.DOCTOR]),*/ healthInfoController.createHealthInfo);
router.get("/", /*authMiddleware([USER_ROLES.DOCTOR, USER_ROLES.STUDENT]),*/ healthInfoController.getHealthInfos);
//router.get("/count", authMiddleware([USER_ROLES.DOCTOR]), healthInfoController.getHealthInfosCount);
//router.get("/:id", authMiddleware([USER_ROLES.DOCTOR, USER_ROLES.STUDENT]), healthInfoController.getHealthInfoById);
//router.patch("/:id", authMiddleware([USER_ROLES.DOCTOR]), healthInfoController.updateHealthInfo);
router.delete("/:id", /*authMiddleware([USER_ROLES.DOCTOR]),*/ healthInfoController.deleteHealthInfo);

module.exports = router;
