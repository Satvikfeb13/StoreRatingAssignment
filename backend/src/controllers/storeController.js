const { Op } = require("sequelize");
const { Store } = require("../models");

const searchStores = async (req, res) => {
  try {

    const search = req.query.search || "";

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
      }
    });

    res.status(200).json(stores);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  searchStores
};