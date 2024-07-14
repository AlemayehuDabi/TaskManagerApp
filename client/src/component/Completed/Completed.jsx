import TaskCard from "../TaskCard/TaskCard";
import "../TaskCard/TaskCard.css";
import moment from "moment";
function Task({
  getCompleteTask,
  modalEdit,
  deleteUnit,
  pin,
  getStageTasks,
  getIncompleteTasks,
  getCompleteTasks,
  editTask,
  showEdit,
  setShowEdit,
  handleShowModal,
}) {
  return (
    <div className="task-container">
      {getCompleteTask.map((task) => (
        <TaskCard
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          handleShowModal={handleShowModal}
          editTask={editTask}
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
