const express = require("express");

const {
  addNote,
  userNotes,
  getASingleNote,
  updateNote,
  deleteNote,
} = require("../controller/notes.controller");

const router = express.Router();

//SINGLE NOTE
router.get("/single-note", getASingleNote);
//GET USER NOTES
router.get("/user-notes", userNotes);
//ADD NOTE
router.post("/new", addNote);
//UPDATE NOTE
router.put("/update-note/:id", updateNote);
//DELETE NOTE
router.delete("/delete/:id", deleteNote);

module.exports = router;
