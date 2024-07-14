const express = require("express");
const Task = require("../model/taskModel");

// get All tasks
const getAllTasks = async (req, res) => {
  const user = req.user;

  try {
    const task = await Task.find({ userId: user._id }).sort({
      isPinned: -1,
      updatedAt: -1,
    });

    return res.json({
      error: false,
      task,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Internal server error",
    });
  }
};

// get in-complete Task
const getInCompleteTask = async (req, res) => {
  const user = req.user;
  const isCompleted = req.params.isCompleted === "true";

  try {
    if (!user) {
      return res.status(401).json({
        error: true,
        msg: "Unauthorized",
      });
    }

    const inCompleteTasks = await Task.find({
      userId: user._id,
      isCompleted: isCompleted,
    }).sort({
      isPinned: -1,
      updatedAt: -1,
    });

    return res.json({
      error: false,
      inCompleteTasks,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
};

// edit task stage
const editCompleted = async (req, res) => {
  const { isCompleted } = req.body;
  const taskId = req.params.id;
  const user = req.user;

  try {
    const checkComplete = await Task.findOne({
      _id: taskId,
      userId: user._id,
    }).sort({
      isPinned: -1,
      updatedAt: -1,
    });

    if (!checkComplete) {
      return res.status(400).json({
        error: true,
        msg: "user and task does much or user is not found",
      });
    }

    checkComplete.isCompleted = isCompleted;
    await checkComplete.save();

    return res.json({
      error: false,
      checkComplete,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Server Error",
    });
  }
};

// add task
const addTask = async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;

  try {
    if (!title || !content) {
      return res.status(400).json({
        error: true,
        msg: "title and content are required",
      });
    } else {
      const taskCreated = await Task.create({
        title,
        content,
        tags: tags || [],
        userId: user._id,
      });

      return res.json({
        error: false,
        msg: "successfuly create task ",
        taskCreated,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Server Error",
    });
  }
};

// edit task
const editTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, content, tags } = req.body;
  const user = req.user;

  try {
    const task = await Task.findOne({ _id: taskId, userId: user._id });

    if (!task) {
      return res.status(400).json({
        error: true,
        msg: "Task is not found",
      });
    }

    const taskUpdate = {};

    if (title) taskUpdate.title = title;
    if (content) taskUpdate.content = content;
    if (tags) taskUpdate.tags = tags;

    const editTask = await Task.findByIdAndUpdate(task, taskUpdate, {
      new: true,
    });

    return res.json({
      error: false,
      msg: "Successfully update",
      editTask,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Server Error",
    });
  }
};

// edit the pin
const editPin = async (req, res) => {
  const taskId = req.params.id;
  const { isPinned } = req.body;
  const user = req.user;

  try {
    const task = await Task.findOne({ _id: taskId, userId: user._id });

    if (!task) {
      res.status(400).json({
        error: true,
        msg: "Task is not found",
      });
    }

    task.isPinned = isPinned;

    const editTask = await task.save();

    res.json({
      error: false,
      msg: "Successfuly pinned Task",
      editTask,
    });
  } catch (error) {
    res.status(500).status({
      error: true,
      msg: "Server Error",
    });
  }
};

// delete Task
const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const user = req.user;

  try {
    const task = await Task.findOne({ _id: taskId, userId: user._id });

    if (!task) {
      return res.status(400).json({
        error: true,
        msg: "Task is not found",
      });
    }

    await Task.deleteOne({ _id: taskId, userId: user._id });

    return res.json({
      error: false,
      msg: "Task successfully delete",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Server Error",
    });
  }
};

// search api
const searchTask = async (req, res) => {
  const user = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      error: true,
      msg: "Search queries are required",
    });
  }
  try {
    const matchingTask = await Task.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
        { tags: { $regex: new RegExp(query, "i") } },
      ],
    });
    return res.json({
      error: false,
      matchingTask,
      mag: "The tasks you're looking for are here",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "Server Error",
    });
  }
};

module.exports = {
  addTask,
  editTask,
  deleteTask,
  editPin,
  searchTask,
  getAllTasks,
  editCompleted,
  getInCompleteTask,
};
