import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/login";
import SignUp from "./pages/Auth/signup";
import Four04 from "./pages/Four04";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import Task from "./component/Task/Task";
import InComplete from "./component/InComplete/InComplete";
import Completed from "./component/Completed/Completed";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "./AxiosInstance";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const [userInfo, setUserInfo] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const [editTask, setEditTask] = useState({
    data: null,
  });

  // show-add-modal state
  const [showAdd, setShowAdd] = useState(false);

  // show-add modal function
  const handleShowAddModal = () => {
    setShowAdd(true);
  };

  // show-edit-modal state
  const [showEdit, setShowEdit] = useState(false);

  // show-edit modal function
  const handleShowEditModal = () => {
    setShowEdit(true);
  };

  // get-task state
  const [getAllTask, setgetAllTask] = useState([]);
  const [getIncompleteTask, setGetIncompleteTask] = useState([]);
  const [getCompleteTask, setGetCompleteTask] = useState([]);

  const navigate = useNavigate();

  // ensure the edit modal
  const modalEdit = (taskDetail) => {
    setShowEdit(true);
    setEditTask({ data: taskDetail });
  };

  // get stage tasks
  const getStageTasks = async () => {
    try {
      const response = await axiosInstance.get(`./task/get-task/`);

      if (response.data && response.data.task) {
        setgetAllTask(response.data.task);
      }
    } catch (error) {
      if (error.response && error.response.error && error.response.error.msg) {
        toast.error(error.response.error.msg);
      } else {
        toast.error("sth went WRONG, please try again");
      }
    }
  };

  // get Incomplete task
  const getIncompleteTasks = async () => {
    try {
      const response = await axiosInstance.get(`/task/get-incomplete/false`);
      setGetIncompleteTask(response.data.inCompleteTasks || []);
    } catch (error) {
      if (error.response && error.response.error && error.response.error.msg) {
        toast.error(error.response.error.msg);
      }
    }
  };

  // get Complete task
  const getCompleteTasks = async () => {
    try {
      const response = await axiosInstance.get(`/task/get-incomplete/true`);
      setGetCompleteTask(response.data.inCompleteTasks || []);
    } catch (error) {
      if (error.response && error.response.error && error.response.error.msg) {
        toast.error(error.response.error.msg);
      }
    }
  };

  // pin task
  const pin = async (task) => {
    const taskId = task._id;

    try {
      const response = await axiosInstance.patch("./task/edit-pin/" + taskId, {
        isPinned: !task.isPinned,
      });

      if (response.data && response.data.editTask) {
        const pinned = response.data.editTask.isPinned;

        if (pinned) {
          toast.success(`Successfuly pin task ${task.title}`);
        } else {
          toast.success(`Successfuly unpin task ${task.title}`);
        }
        getStageTasks();
        getCompleteTasks();
        getIncompleteTasks();
      }
    } catch (error) {
      if (error.response && error.response.error && error.response.error.msg) {
        toast.error(error.response.error.msg);
      } else {
        toast.error("sth went WRONG, please try again");
      }
    }
  };

  // delete Task
  const deleteTask = async (task) => {
    const taskId = task._id;

    try {
      const response = await axiosInstance.delete(
        "./task/delete-task/" + taskId
      );

      if (response.data && !response.data.error && response.data.msg) {
        toast.success(response.data.msg);
        getStageTasks();
        return;
      }
    } catch (error) {
      if (error.response && error.response.error && error.response.error.msg) {
        toast.error(error.response.error.msg);
      } else {
        toast.error("sth went WRONG, please try again");
      }
    }
  };

  // delete function
  const deleteUnit = (task) => {
    deleteTask(task);
  };

  // Get Info
  const getUser = async () => {
    try {
      const token = localStorage.getItem("Token");

      if (!token) {
        return; // Exit early if no token is found
      }
      const response = await axiosInstance.get("/user/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        setIsAuth(true);
      }
    } catch (error) {
      if (error.response && error.response.error && error.response.error.msg) {
        toast.error(error.response.error.msg);
        localStorage.clear();
        navigate("/login");
      } else if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      } else {
        toast.error("sth went WRONG, please try again");
      }
    }
  };

  // search api
  const searchApi = async (query) => {
    try {
      const response = await axiosInstance.get("./task/search-task/", {
        params: { query },
      });

      if (response.data && response.data.matchingTask) {
        setgetAllTask(response.data.matchingTask);
      }
    } catch (error) {
      if (error.response && error.response.error && error.response.error.msg) {
        toast.error(error.response.error.msg);
      } else {
        toast.error("sth went WRONG, please try again");
      }
    }
  };

  useEffect(() => {
    if (isAuth) {
      getStageTasks();
      getCompleteTasks();
      getIncompleteTasks();
    }
  }, [isAuth]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Toaster
        richColors
        position="bottom-right"
        toastOptions={{ duration: 5000 }}
      />
      <Routes>
        <Route path="/login" exact element={<Login />} />

        <Route path="/signup" exact element={<SignUp />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home
                handleShowAddModal={handleShowAddModal}
                showAdd={showAdd}
                setShowAdd={setShowAdd}
                getStageTasks={getStageTasks}
                searchApi={searchApi}
                userInfo={userInfo}
                getUser={getUser}
              />
            </ProtectedRoute>
          }
        >
          <Route
            exact
            path="/tasks"
            element={
              <Task
                getIncompleteTasks={getIncompleteTasks}
                getCompleteTasks={getCompleteTasks}
                pin={pin}
                deleteUnit={deleteUnit}
                getAllTask={getAllTask}
                modalEdit={modalEdit}
                editTask={editTask}
                getStageTasks={getStageTasks}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                handleShowEditModal={handleShowEditModal}
              />
            }
          />
          <Route
            exact
            path="/incomplete"
            element={
              <InComplete
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                handleShowEditModal={handleShowEditModal}
                setGetIncompleteTask={setGetIncompleteTask}
                getIncompleteTask={getIncompleteTask}
                getIncompleteTasks={getIncompleteTasks}
                getCompleteTasks={getCompleteTasks}
                pin={pin}
                deleteUnit={deleteUnit}
                modalEdit={modalEdit}
                editTask={editTask}
                getStageTasks={getStageTasks}
              />
            }
          />
          <Route
            exact
            path="/completed"
            element={
              <Completed
                getCompleteTask={getCompleteTask}
                getIncompleteTasks={getIncompleteTasks}
                getCompleteTasks={getCompleteTasks}
                pin={pin}
                deleteUnit={deleteUnit}
                modalEdit={modalEdit}
                editTask={editTask}
                getStageTasks={getStageTasks}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                handleShowEditModal={handleShowEditModal}
              />
            }
          />
        </Route>

        <Route path="/forget-password" exact element={<ForgotPassword />} />
        <Route
          path="/reset-password/:token"
          exact
          element={<ResetPassword />}
        />

        <Route path="*" element={<Four04 />} />
      </Routes>
    </div>
  );
};
export default App;
