const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
});
const PlaceSchema = new mongoose.Schema({
    image: { type: String, required: true }, // URL or base64
    name: { type: String, required: true },
    location: { type: String, required: true },
    rate: { type: Number, required: true, min: 0, max: 5 },
    openTime: { type: String, required: true }, // e.g., "9:00 AM"
    closeTime: { type: String, required: true }, // e.g., "10:00 PM"
    price: { type: Number, required: true },
    about: { type: String, required: true },
    duration: { type: String, required: true }, // e.g., "2 hours"
    visitors: { type: Number, default: 0 },
    km: { type: Number, required: true },
    independentTourPrice: { type: Number, required: true },
    hostedTourPrice: { type: Number, required: true },
    excursionTourPrice: { type: Number, required: true },
    category: { type: String, required: true },
    booked: { type: Boolean, default: false },
    favorite: { type: Boolean, default: false },
    reviews: [ReviewSchema]
});

module.exports = mongoose.model("Place", PlaceSchema);
