// server/controllers/placeController.js
const axios = require("axios");

const getPlaceDetails = async (req, res) => {
  const { locationName } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;
  const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    locationName
  )}&key=${apiKey}`;

  try {
    // Step 1: Search for the place using its name
    const textSearchResponse = await axios.get(textSearchUrl);
    const { results } = textSearchResponse.data;

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No results found for the provided location name." });
    }

    const placeId = results[0].place_id;

    // Step 2: Retrieve place details using Place ID
    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
    const placeDetailsResponse = await axios.get(placeDetailsUrl);
    const placeDetails = placeDetailsResponse.data.result;

    // Step 3: Extract the necessary information
    const placeInfo = {
      name: placeDetails.name,
      rating: placeDetails.rating,
      reviewsCount: placeDetails.user_ratings_total,
      category: placeDetails.types ? placeDetails.types.join(", ") : "",
      address: placeDetails.formatted_address,
      imageUrl: placeDetails.photos
        ? getPhotoUrl(placeDetails.photos[0].photo_reference, apiKey)
        : "",
    };

    res.json(placeInfo);
  } catch (error) {
    console.error("Error fetching place details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to get the photo URL
const getPhotoUrl = (photoReference, apiKey) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
};

module.exports = { getPlaceDetails };
