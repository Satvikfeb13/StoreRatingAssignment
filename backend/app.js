const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");

const testRoutes = require("./src/routes/testRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const storeRoutes = require("./src/routes/storeRoutes");
const ratingRoutes =
    require("./src/routes/ratingRoutes");
const ownerRoutes =
    require("./src/routes/ownerRoutes");

const app = express();

app.use(cors());

app.use(express.json());


app.use("/api/owner", ownerRoutes);

app.use("/api/ratings", ratingRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/test", testRoutes);

app.use("/api/auth", authRoutes);

module.exports = app;