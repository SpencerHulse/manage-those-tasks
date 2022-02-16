const mongoose = require("mongoose");

// The schema is what to expect (essentially) for data.
// It is the structure.
// Only data that matches the schemas will be sent to the DB.
/* However, it does allow you to send empty objects, meaning you
 need validation. This can be seen below, with the object after name. */
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide name."],
    trim: true,
    maxlength: [20, "Name cannot exceed 20 characters."],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Model is the interface to the DB. It wraps the schemas.
// Used in controllers.
module.exports = mongoose.model("Task", TaskSchema);

// Instance of a model is called a document.
// The first argument is the singular name of the collection your model is for.
