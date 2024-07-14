import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";
import "./add-modal.css";
import InputTag from "../../InputTag/InputTag";
import axiosInstance from "../../../AxiosInstance";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const AddModal = ({
  handleShowAddModal,
  showAdd,
  setShowAdd,
  getStageTasks,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError] = useState("");

  const handleClose = () => {
    setError("");
    setTitle("");
    setContent("");
    setTags([]);
    setShowAdd(false);
  };

  // Add Task

  const addTasks = async () => {
    try {
      if (!title) {
        return setError("Please task title is require!");
      }
      if (!content) {
        return setError("Please title descriptions are require!");
      }

      setError("");
      const response = await axiosInstance.post("./task/add-task", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.taskCreated) {
        toast.success(response.data.msg);
        return;
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("sth went WRONG, please try again");
      }
    }
  };

  const handleAddTask = () => {
    addTasks();
    getStageTasks();
    handleClose();
  };

  return (
    <div>
      <button onClick={handleShowAddModal} className="button-add">
        <IoIosAdd className="add-btn-icon" color="#fff" />
      </button>

      <Modal show={showAdd} onHide={handleClose} dialogClassName="custom-modal">
        <div className="modals">
          <Modal.Header closeButton>
            <Modal.Title className="edit-modal">Add Task</Modal.Title>
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
                  <label
                    className="tags-modal"
                    style={{ textAlign: "start", color: "rgba(0, 0, 0, 0.4)" }}
                  >
                    Tags
                  </label>

                  <InputTag tags={tags} setTags={setTags} />
                </Col>
              </Row>
            </Container>
            <br />

            {error && <p className="error">{error}</p>}
            <Button className="footer-button" onClick={() => handleAddTask()}>
              Add
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default AddModal;
