const { User,Store, Rating } = require("../models");
const { fn, col } = require("sequelize");

const getOwnerDashboard = async (req, res) => {
  try {

    const store = await Store.findOne({
      where: {
        owner_id: req.user.id
      }
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found"
      });
    }

    const averageRating = await Rating.findOne({
      attributes: [
        [fn("AVG", col("rating")), "averageRating"]
      ],
      where: {
        store_id: store.id
      },
      raw: true
    });

    res.status(200).json({
      storeName: store.name,
      averageRating:
        averageRating.averageRating || 0
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getStoreRatings = async (req, res) => {
  try {

    const store = await Store.findOne({
      where: {
        owner_id: req.user.id
      }
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found"
      });
    }

    const ratings = await Rating.findAll({
      where: {
        store_id: store.id
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"]
        }
      ]
    });

    res.status(200).json(ratings);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getOwnerDashboard,
  getStoreRatings
};