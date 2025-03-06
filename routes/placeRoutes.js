const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");

router.post("/", placeController.addPlaces);
router.get("/", placeController.getAllPlaces);
router.get("/:id", placeController.getPlaceById);
router.put("/:id", placeController.updatePlace);
router.delete("/:id", placeController.deletePlace);
router.post("/:id/reviews", placeController.addReview);

module.exports = router;
