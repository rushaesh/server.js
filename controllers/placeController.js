const Place = require("../models/Place");

// ✅ Get Place by ID
exports.getPlaceById = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Find place by ID
        const place = await Place.findById(id);

        if (!place) {
            return res.status(404).json({ status: "error", message: "Place not found" });
        }

        res.status(200).json({ status: "success", data: place });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// ✅ Add a new place (POST)
exports.addPlaces = async (req, res) => {
    try {
        const places = req.body; // Expecting an array of places
        if (!Array.isArray(places) || places.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid input, expected an array of places" });
        }

        const savedPlaces = await Place.insertMany(places);
        res.status(201).json({ status: "success", message: "Places added successfully", data: savedPlaces });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// ✅ Get all places (GET)
exports.getAllPlaces = async (req, res) => {
    try {
        const places = await Place.find(); // Fetch all places from the database
        res.status(200).json({ status: "success", data: places });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// ✅ Get a place by ID (GET)
exports.getPlaceById = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ status: "error", message: "Place not found" });
        }
        res.json({ status: "success", data: place });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// ✅ Update a place by ID (PUT)
exports.updatePlace = async (req, res) => {
    try {
        const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlace) {
            return res.status(404).json({ status: "error", message: "Place not found" });
        }
        res.json({ status: "success", message: "Place updated successfully", data: updatedPlace });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// ✅ Delete a place by ID (DELETE)
exports.deletePlace = async (req, res) => {
    try {
        const deletedPlace = await Place.findByIdAndDelete(req.params.id);
        if (!deletedPlace) {
            return res.status(404).json({ status: "error", message: "Place not found" });
        }
        res.json({ status: "success", message: "Place deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
exports.getPopularPlaces = async (req, res) => {
    try {
        const popularPlaces = await Place.find({ rate: { $gte: 4.5 } });
        res.status(200).json({ status: "success", data: popularPlaces });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// ✅ Get only Recommended Places (Price < 500)
exports.getRecommendedPlaces = async (req, res) => {
    try {
        const recommendedPlaces = await Place.find({ price: { $lt: 500 } });
        res.status(200).json({ status: "success", data: recommendedPlaces });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// ✅ Get only Most Visited Places (Top 10 by visitors)
exports.getMostVisitedPlaces = async (req, res) => {
    try {
        const mostVisitedPlaces = await Place.find().sort({ visitors: -1 }).limit(100);
        res.status(200).json({ status: "success", data: mostVisitedPlaces });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
exports.bookPlace = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ status: "error", message: "Place not found" });
        }

        place.visitors += 1;
        await place.save();
        res.status(200).json({ status: "success", data: place });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
exports.addReview = async (req, res) => {
    try {
        const { user, rating, comment } = req.body;
        const place = await Place.findById(req.params.id);

        if (!place) {
            return res.status(404).json({ status: "error", message: "Place not found" });
        }

        // Create new review object
        const newReview = { rating, comment };
        place.reviews.push(newReview);

        // Update the average rating
        const totalReviews = place.reviews.length;
        const totalRating = place.reviews.reduce((sum, review) => sum + review.rating, 0);
        place.rate = totalRating / totalReviews;

        await place.save();
        res.json({ status: "success", message: "Review added successfully", data: newReview });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
