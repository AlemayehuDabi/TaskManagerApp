import Sidebar from "../../component/SideBar/SideBar";
import NavBar from "../../component/NavBar/NavBar";
import "./Home.css";
import TaskDisplay from "../../component/TaskDisplay/TaskDisplay";

const Home = ({
  handleShowAddModal,
  showAdd,
  setShowAdd,
  getStageTasks,
  searchApi,
  userInfo,
  getUser,
}) => {
  return (
    <div className="layout-main">
      <Sidebar
        handleShowAddModal={handleShowAddModal}
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        getStageTasks={getStageTasks}
      />
      <div className="Task-Navbar">
        <NavBar searchApi={searchApi} userInfo={userInfo} getUser={getUser} />
        <TaskDisplay />
      </div>
    </div>
  );
};

export default Home;
