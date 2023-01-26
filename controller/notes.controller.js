const { mongoose } = require("mongoose");
const noteModel = require("../schemas/note.schema");

const mongoosePaginate = require("mongoose-paginate-v2");

const { prepareQueryForNotes } = require("../utils/helpers");
noteModel.plugin(mongoosePaginate);
const Notes = new mongoose.model("Notes", noteModel);

//GET A NOTE

const getASingleNote = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Notes.findById(id).exec();
    res.json({
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET A USERS NOTES
const userNotes = async (req, res) => {
  try {
    const searchParams = req.query.search;
    const sortParams = req.query.sort;
    const email = req.query.email;

    const query = prepareQueryForNotes(searchParams, sortParams, email);
    const notes = await Notes.find(query);
    res.json({
      data: notes,
      totalItems: notes.length,
    });
    return notes;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//ADD A NOTE
const addNote = async (req, res) => {
  const incomingData = req.body;
  const newData = new Notes(incomingData);
  try {
    await newData.save((err, result) => {
      if (err) {
        res.status(500).json({
          message: "An error occured. Please try again",
        });
      } else {
        res.json({
          result,
          message: "Posted",
        });
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
//UPDATE A NOTE

const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(500).json({
        message: "AN ERROR OCCURED",
      });
    }
    const { tag, title, note } = req.body;

    const data = await Notes.findById(id).exec();
    const { editHistory } = data;
    editHistory.push(Date.now());
    await Notes.updateOne(
      { _id: id },
      {
        $set: {
          tag,
          title,
          note,
          editHistory,
        },
      },
      (err, data) => {
        if (err) {
          res.status(500).json({
            message: "AN ERROR OCCURED",
          });
        } else {
          res.status(200).json({
            data,
            message: "UPDATE SUCCESSFUL",
          });
        }
      }
    ).clone();
  } catch (error) {
    throw new Error(error.message);
  }
};

//DELETE A NOTE
const deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    await Notes.deleteOne({ _id: id }, async (err, data) => {
      if (data) {
        res.status(201).json({
          data: data,
          message: data.deletedCount
            ? "DELTED SUCCESSFULLY"
            : "DOCUMENT NOT FOUND",
        });
      }
      if (err) {
        res.status(500).json({
          message: "AN ERROR OCCURED" || err,
        });
      }
    }).clone();
  } catch (error) {
    res.status(500).json({
      message: "AN ERROR OCCURED" || error,
    });
  }
};

module.exports = {
  addNote,
  userNotes,
  getASingleNote,
  updateNote,
  deleteNote,
};
