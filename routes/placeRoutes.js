const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");

router.post("/", placeController.addPlaces);
router.get("/", placeController.getAllPlaces);
router.get("/:id", placeController.getPlaceById);
router.put("/:id", placeController.updatePlace);
router.delete("/:id", placeController.deletePlace);
router.post("/:id/reviews", placeController.addReview);
router.get("/popular", placeController.getPopularPlaces);  // ✅ New Route
router.get("/recommended", placeController.getRecommendedPlaces);  // ✅ New Route
router.get("/most-visited", placeController.getMostVisitedPlaces);
module.exports = router;
