const express = require("express");
const router = express.Router();


//controller
const {
  createNote,
  readAllNote,
  readAllMyNote,
  readNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");


router.post("/note",createNote)
router.get("/note/:id",readNote)
router.get("/note", readAllNote)
router.get("/note-mynote/:id", readAllMyNote)
router.put("/note/:id", updateNote)
router.delete("/note/:id", deleteNote)

module.exports = router;
