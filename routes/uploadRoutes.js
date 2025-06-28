const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { uploadCSVToS3, insertSalesData } = require("../controllers/uploadController");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // saves file locally before upload

router.post("/", upload.single("file"), async (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded. Please attach a CSV file with key 'file'." });
  }

  const filePath = req.file.path;
  const fileName = req.file.originalname;

  console.log("📁 File received:", fileName);

  try {
    await uploadCSVToS3(filePath, fileName);
    await insertSalesData(filePath);
    res.status(200).json({ message: "✅ Upload & import successful!" });
  } catch (err) {
    console.error("❌ Error during upload/processing:", err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) console.error("❌ Error deleting temp file:", err);
      else console.log("🧹 Temp file deleted:", filePath);
    });
  }
});

module.exports = router;
