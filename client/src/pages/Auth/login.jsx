import { useState } from "react";

import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// import Reset from "../forgotPassword";
import "./signup.css";
import axiosInstance from "../../AxiosInstance";
import SignLoign from "../../images/sign-log.png";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const Login = async (e) => {
    e.preventDefault();
    const { password, email } = data;
    try {
      const response = await axiosInstance.post("/user/login", {
        password: password,
        email: email,
      });

      if (response.data && response.data.token && response.data.user) {
        toast.success("Successfully logged in");
        // putting token in the local storage
        const token = response.data.token;
        localStorage.setItem("Token", token);
        navigate("/tasks");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("sth went WRONG, Please try again");
      }
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="screen">
      <div className="body">
        <div className="cont">
          <div className="main">
            <form onSubmit={Login} className="form">
              <h2 className="signup-login-text">Login</h2>
              <label className="title-sign-login" htmlFor="email">
                Email:
              </label>
              <input
                className="input"
                type="email"
                placeholder="enter email..."
                value={data.email}
                name="email"
                onChange={handleChange}
              />
              <label className="title-sign-login" htmlFor="password">
                Password:
              </label>
              <input
                className="input"
                type="password"
                placeholder="enter password..."
                value={data.password}
                name="password"
                onChange={handleChange}
              />
              <br />
              <button className="button-sign-log" type="submit">
                Login
              </button>
              <br />
              <br />
              <p>
                Create Account{" "}
                <Link to="/signup">
                  <span className="forget-signup"> Sign-Up</span>
                </Link>
              </p>
              <br />
              <p>
                <Link to="/forget-password">Forget Password?</Link>
              </p>
            </form>
          </div>
        </div>

        <div className="none-above">
          <img className="login" src={SignLoign} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
