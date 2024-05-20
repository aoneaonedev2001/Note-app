const express = require("express");
const router = express.Router();


//controller
const {
  createHistoryNote,
  readAllHistoryNote,
  readAllMyHistoryNote,
  readHistoryNote,
  updateHistoryNote,
  deleteHistoryNote,
} = require("../controllers/historynote");

router.post("/historynote", createHistoryNote)
router.get("/historynote/:id",readHistoryNote)
router.get("/historynote", readAllHistoryNote)
router.get("/historynote-mynote/:id",readAllMyHistoryNote)
router.put("/historynote/:id", updateHistoryNote)
router.delete("/historynote/:id", deleteHistoryNote)

module.exports = router;