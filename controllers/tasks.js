const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks }); // sends all tasks
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with the ID: ${taskID}`, 404));
    // deals with ids of the right length that do not exist
    // return res.status(404).json({ msg: `No task with the ID: ${taskID}` });
    // replaced by above
  }

  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    // always returns the new value
    new: true,
    // runs the set validators for the schema
    runValidators: true,
    // to make it a put to replace and not just change, need to have overwrite: true
  });

  if (!task) {
    return next(createCustomError(`No task with the ID: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with the ID: ${taskID}`, 404));
  }
  // For delete, it does not really matter what you send back,
  // since you refresh the entire thing
  // Only 200 status matters
  res.status(200).json({ task });
  // res.status(200).json({ task: null, status: "success" })
  // res.status(200).send()
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
