const { Store, Rating } = require("../models");
const { Op, fn, col } = require("sequelize");

const searchStores = async (req, res) => {
  try {

    const search = req.query.search || "";
    const sort = req.query.sort;

    const stores = await Store.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`
            }
          },
          {
            address: {
              [Op.like]: `%${search}%`
            }
          }
        ]
      },
      order: sort ? [[sort, "ASC"]] : []
    });

    const result = [];

    for (const store of stores) {

      const avgRating = await Rating.findOne({
        attributes: [
          [
            fn("AVG", col("rating")),
            "averageRating"
          ]
        ],
        where: {
          store_id: store.id
        },
        raw: true
      });

      const userRating = await Rating.findOne({
        where: {
          store_id: store.id,
          user_id: req.user.id
        }
      });

      result.push({
        id: store.id,
        storeName: store.name,
        address: store.address,
        overallRating:
          avgRating.averageRating || 0,
        userSubmittedRating:
          userRating
            ? userRating.rating
            : null
      });
    }

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getAllStores = async (req, res) => {
  try {

    const sort = req.query.sort;

    const stores = await Store.findAll({
      order: sort
        ? [[sort, "ASC"]]
        : []
    });

    res.status(200).json(stores);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  searchStores,
  getAllStores
};