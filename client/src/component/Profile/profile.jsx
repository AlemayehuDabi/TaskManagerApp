import Dropdown from "react-bootstrap/Dropdown";
import "./profile.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../AxiosInstance";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Profile = ({ userInfo, getUser }) => {
  const name = userInfo?.username || "";
  const userFirstLetter = name.substr(0, 1).toUpperCase();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setOldPassword("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const navigator = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  // logout functionality
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigator(`/Login`);
    toast.success("Successfuly logged out");
  };

  // update personal info
  const updatePerInfo = async () => {
    try {
      const response = await axiosInstance.patch("./user/update-user", {
        username,
        email,
        oldPassword,
        password,
      });

      if (response.data && response.data.updatePerInfo) {
        handleClose();
        getUser();
        toast.success(response.data.msg);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    if (show && userInfo) {
      setUsername(userInfo?.username || "");
      setEmail(userInfo?.email || "");
      setPassword(userInfo?.password || "");
    }
  }, [show, userInfo]);

  return (
    <>
      <div className="after-toggler">
        <Dropdown drop="start" as={ButtonGroup}>
          <>
            <Button className="button-profile" variant="success">
              {userFirstLetter}
            </Button>

            <Dropdown.Toggle
              variant="success"
              split
              id="dropdown-split-basic"
              className="drop-profile"
            />
          </>
          <Dropdown.Menu>
            <Dropdown.Item className="dropdown-hover" onClick={handleShow}>
              My-profile
            </Dropdown.Item>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title className="title-profile">
                  Update Profile
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="text-profile">Username: </Form.Label>
                    <Form.Control
                      className="input-profile"
                      type="text"
                      placeholder="Username..."
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label className="text-profile">
                      Email address:
                    </Form.Label>
                    <Form.Control
                      className="input-profile"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Label className="text-profile">
                      old-password:
                    </Form.Label>
                    <Form.Control
                      className="input-profile"
                      type="password"
                      placeholder="old-password..."
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label className="text-profile">password: </Form.Label>
                    <Form.Control
                      className="input-profile"
                      type="password"
                      placeholder="password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button className="save-profile" onClick={updatePerInfo}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <Dropdown.Item className="dropdown-hover" onClick={logout}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default Profile;
