const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const User = require("./user.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: String,
  },
  price: Number,
  location: String,
  country: String,
  listingReviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: [
      "Trending",
      "Rooms",
      "Mountains",
      "Castles",
      "Amazing Pools",
      "Camping",
      "Farms",
      "Arctic",
      "Iconic Cities",
    ],
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.listingReviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
