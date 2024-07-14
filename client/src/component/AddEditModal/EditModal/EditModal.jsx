import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";
import "./edit-modal.css";
import InputTag from "../../InputTag/InputTag";
import axiosInstance from "../../../AxiosInstance";
import { TbEdit } from "react-icons/tb";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Edit = ({
  editTask,
  handleShowEditModal,
  showEdit,
  setShowEdit,
  getStageTasks,
  onEdit,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const handleClose = () => {
    setTitle("");
    setContent("");
    setTags([]);
    setShowEdit(false);
  };

  useEffect(() => {
    if (showEdit && editTask.data) {
      setTitle(editTask.data?.title || "");
      setContent(editTask.data?.content || "");
      setTags(editTask.data?.tags || []);
    }
  }, [showEdit, editTask]);

  // Edit task

  const editTasks = async () => {
    const taskId = editTask.data._id;

    try {
      if (
        title === editTask.data?.title &&
        content === editTask.data?.content &&
        tags === editTask.data?.tags
      ) {
        toast.error("NO change was made!");
        handleClose();
      } else {
        const response = await axiosInstance.put("./task/edit-task/" + taskId, {
          title,
          content,
          tags,
        });

        if (response.data && response.data.editTask) {
          toast.success(response.data.msg);
          getStageTasks();
          return;
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("sth went wrong, please try again");
      }
    }
  };

  const handleEditTask = () => {
    editTasks();
    getStageTasks();
    handleClose();
  };

  return (
    <div>
      <button onClick={handleShowEditModal} className="edit-button">
        <TbEdit className="edit-task" onClick={onEdit} />
      </button>

      <Modal
        show={showEdit}
        onHide={handleClose}
        dialogClassName="custom-modal"
      >
        <div className="modals">
          <Modal.Header closeButton>
            <Modal.Title className="edit-modal">Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="title-modal">Task</Form.Label>
                <Form.Control
                  className="task-textarea"
                  type="text"
                  placeholder="task here"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="content-modal">Content</Form.Label>
                <Form.Control
                  className="task-textarea"
                  as="textarea"
                  rows={3}
                  placeholder="description..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="footer">
            <Container>
              <Row>
                <Col className="me-auto">
                  <label className="tags-modal">Tags</label>

                  <InputTag tags={tags} setTags={setTags} />
                </Col>
              </Row>
            </Container>
            <br />
            <Button className="footer-button" onClick={() => handleEditTask()}>
              Edit
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default Edit;
