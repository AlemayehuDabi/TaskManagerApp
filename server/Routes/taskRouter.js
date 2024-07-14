const express = require("express");
const { authProtection } = require("../middleware/auth");
const router = express.Router();
const {
  addTask,
  editTask,
  deleteTask,
  editPin,
  searchTask,
  getAllTasks,
  getInCompleteTask,
  editCompleted,
} = require("../controller/taskController");

// get All tasks
router.route("/get-task").get(authProtection, getAllTasks);

// get incomplete tasks
router
  .route("/get-incomplete/:isCompleted")
  .get(authProtection, getInCompleteTask);

// add new task - API

router.route("/add-task").post(authProtection, addTask);

// edit task

router.route("/edit-task/:id").put(authProtection, editTask);

// delete task

router.route("/delete-task/:id").delete(authProtection, deleteTask);

// pin OR unpin

router.route("/edit-pin/:id").patch(authProtection, editPin);

// search route

router.route("/search-task/").get(authProtection, searchTask);

// edit stage
router.route("/edit-completed/:id").patch(authProtection, editCompleted);

// export
module.exports = router;
