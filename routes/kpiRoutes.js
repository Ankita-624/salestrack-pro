const express = require("express");
const {
  getTopSalesReps,
  getMonthlyRevenue,
  getRegionSummary
} = require("../controllers/kpiController");

const router = express.Router();

router.get("/top-reps", getTopSalesReps);
router.get("/monthly", getMonthlyRevenue);
router.get("/regions", getRegionSummary);

module.exports = router;
