require("dotenv").config();

const app = require("./app");
const { sequelize } = require("./src/config/db");

const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(console.error);