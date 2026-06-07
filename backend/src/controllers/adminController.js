const { User, Store, Rating } = require("../models");
const bcrypt = require("bcrypt");
const getAllUsers = async (req, res) => {
  try {

    const users = await User.findAll({
      attributes: {
        exclude: ["password"]
      }
    });

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.status(200).json({
      totalUsers,
      totalStores,
      totalRatings
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const addUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      address,
      role
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const addStore = async (req, res) => {
  try {

    const {
      name,
      email,
      address,
      owner_id
    } = req.body;

    const store = await Store.create({
      name,
      email,
      address,
      owner_id
    });

    res.status(201).json(store);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getAllStores = async (req, res) => {
  try {

    const stores = await Store.findAll();

    res.status(200).json(stores);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
module.exports = {
  getDashboard,
  addUser,
  addStore,
  getAllUsers,
  getAllStores,
  
  

};