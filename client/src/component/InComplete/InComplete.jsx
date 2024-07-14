import TaskCard from "../TaskCard/TaskCard";
import "../TaskCard/TaskCard.css";
import moment from "moment";
function Task({
  getIncompleteTask,
  modalEdit,
  deleteUnit,
  pin,
  getStageTasks,
  getIncompleteTasks,
  getCompleteTasks,
  setGetIncompleteTask,
  editTask,
  showEdit,
  setShowEdit,
  handleShowModal,
}) {
  return (
    <div className="task-container">
      {getIncompleteTask.map((task) => (
        <TaskCard
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          handleShowModal={handleShowModal}
          editTask={editTask}
          setGetIncompleteTask={setGetIncompleteTask}
          getIncompleteTasks={getIncompleteTasks}
          getCompleteTasks={getCompleteTasks}
          task={task}
          getStageTasks={getStageTasks}
          key={task._id}
          title={task.title}
          date={moment(task.createdOn).format("Do MMM YYYY")}
          content={task.content}
          tags={task.tags}
          onEdit={() => {
            modalEdit(task);
          }}
          onPinTask={() => {
            pin(task);
          }}
          onDelete={() => {
            deleteUnit(task);
          }}
          stages={task.isCompleted}
          isPinned={task.isPinned}
        />
      ))}
    </div>
  );
}

export default Task;
