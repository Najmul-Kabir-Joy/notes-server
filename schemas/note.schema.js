const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    tag: {
      type: String,
      enum: ["casual", "urgent", "todo", "ongoing"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    editHistory: {
      type: [Date],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = noteSchema;
