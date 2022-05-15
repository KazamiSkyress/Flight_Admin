const{createAd,createNewInventory,updateFlight,login,search}=require("./admin.controller");
const router = require("express").Router();
const{checkToken}=require("../../auth/token_validation");
router.post("/createAd" , createAd);
router.post("/createNewInventory" , createNewInventory);
router.patch("/", updateFlight);
router.post("/login",login);
router.post("/search" , search);


module.exports = router;