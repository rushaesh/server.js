const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");
const { getPlaceById } = require("../controllers/placeController");

router.post("/", placeController.addPlaces);
router.get("/popular", placeController.getPopularPlaces);
router.get("/recommended", placeController.getRecommendedPlaces);
router.get("/most-visited", placeController.getMostVisitedPlaces);
router.get("/:id", getPlaceById);
router.get("/", placeController.getAllPlaces);
router.put("/:id", placeController.updatePlace);
router.delete("/:id", placeController.deletePlace);
router.post("/:id/book", placeController.bookPlace);
router.post("/:id/review", placeController.addReview);


module.exports = router;
