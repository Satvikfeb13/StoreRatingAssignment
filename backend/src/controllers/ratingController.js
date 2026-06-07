const { Rating } = require("../models");

const submitRating = async (req, res) => {
  try {

    const { storeId, rating } = req.body;

    const existingRating =
      await Rating.findOne({
        where: {
          user_id: req.user.id,
          store_id: storeId
        }
      });

    if (existingRating) {
      return res.status(400).json({
        message: "You already rated this store"
      });
    }

    const newRating = await Rating.create({
      user_id: req.user.id,
      store_id: storeId,
      rating
    });

    res.status(201).json(newRating);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const updateRating = async (req, res) => {

  try {

    const { rating } = req.body;

    const ratingRecord =
      await Rating.findByPk(req.params.id);

    if (!ratingRecord) {
      return res.status(404).json({
        message: "Rating not found"
      });
    }

    if (
      ratingRecord.user_id !== req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    ratingRecord.rating = rating;

    await ratingRecord.save();

    res.json(ratingRecord);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  submitRating,
  updateRating
};