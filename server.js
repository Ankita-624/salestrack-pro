// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");
const { verifyToken } = require("./middleware/authMiddleware");
const kpiRoutes = require("./routes/kpiRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

// 🔒 Protect KPI & upload routes
app.use("/api/kpi", verifyToken, kpiRoutes);
app.use("/api/upload", verifyToken, uploadRoutes);


app.get("/", (req, res) => res.send("SalesTrack Pro API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
