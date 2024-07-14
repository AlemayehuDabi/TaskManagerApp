import Card from "react-bootstrap/Card";
import { MdOutlinePushPin } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import "./TaskCard.css";
import { SiTicktick } from "react-icons/si";
import toast from "react-hot-toast";
import axiosInstance from "../../AxiosInstance";
import EditModal from "../AddEditModal/EditModal/EditModal";
const TaskCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinTask,
  task,
  getStageTasks,
  getIncompleteTasks,
  getCompleteTasks,
  stages,
  editTask,
  showEdit,
  setShowEdit,
  handleShowEditModal,
}) => {
  const tagsAllowed = tags.slice(0, 3);

  // task stage edit
  const editStage = async (taskId) => {
    try {
      const response = await axiosInstance.patch(
        `/task/edit-completed/${taskId}`,
        {
          isCompleted: !task.isCompleted,
        }
      );

      if (response.data && response.data.checkComplete) {
        if (response.data.checkComplete.isCompleted) {
          toast.success("Task completed successfully");
        } else {
          toast.success("Task marked as incomplete");
        }

        // Refresh task lists
        getStageTasks();
        getIncompleteTasks();
        getCompleteTasks();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  };

  return (
    <div>
      <Card className="cards">
        <Card.Body className="d-flex flex-column">
          <div className="d-flex">
            <Card.Title className="title-task">{title.slice(0, 20)}</Card.Title>
            <MdOutlinePushPin
              className="ms-auto pin-task"
              style={{
                cursor: "pointer",
                color: isPinned ? "rgb(0, 127, 115)" : "rgba(0, 127, 115,0.2)",
              }}
              onClick={onPinTask}
            />
          </div>
          <Card.Subtitle className="mb-2 date-task">{date}</Card.Subtitle>
          <Card.Text
            style={{ textAlign: "start" }}
            className="fs-14 content-task"
          >
            {content?.slice(0, 100)}
          </Card.Text>

          <div className="d-flex mt-auto">
            <div className="tags-cont me-auto">
              {tagsAllowed.map((tag, index) => (
                <p key={index} className="tags-task">
                  #{tag.slice(0, 4)}
                </p>
              ))}
            </div>
            <div
              className="mt-auto"
              style={{
                cursor: "pointer",
              }}
            >
              <SiTicktick
                onClick={() => editStage(task._id)}
                className="completed"
                style={{
                  color: stages ? "rgb(0,0,0)" : "rgba(0,0,0,0.3)",
                }}
              />
            </div>
            <div
              className="mt-auto"
              style={{
                color: "blue",
                cursor: "pointer",
                marginLeft: "3rem",
              }}
            >
              <EditModal
                onEdit={onEdit}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                handleShowEditModal={handleShowEditModal}
                editTask={editTask}
                getStageTasks={getStageTasks}
              />
            </div>
            <div
              className="mt-auto"
              style={{
                color: "blue",
                cursor: "pointer",
                marginLeft: "12px",
              }}
            >
              <AiFillDelete className="delete-task" onClick={onDelete} />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TaskCard;
