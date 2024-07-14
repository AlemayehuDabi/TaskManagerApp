import { useState } from "react";
import "./signup.css";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosInstance";
import SignLoign from "../../images/sign-log.png";

function SignUp() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();

    const { email, username, password } = data;

    try {
      const response = await axiosInstance.post("/user/signup", {
        email: email,
        username: username,
        password: password,
      });

      if (response.data && response.data.token) {
        toast.success(response.data.msg);
        // put token into local storage

        const token = response.data.token;
        localStorage.setItem("Token", token);
        navigate(`/tasks`);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Something went wrong, please try again!");
      }
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="screen">
      <div className="body">
        <div className="none-above">
          <img className="sign" src={SignLoign} alt="" />
        </div>

        <div className="cont">
          <div className="main">
            <form onSubmit={Register} className="form">
              <h2 className="signup-login-text">Sign Up</h2>
              <label className="title-sign-login" htmlFor="name">
                Username:
              </label>
              <input
                type="text"
                placeholder="enter username..."
                className="input"
                name="username"
                value={data.username}
                onChange={handleChange}
              />

              <label className="title-sign-login" htmlFor="email">
                Email:
              </label>
              <input
                className="input"
                type="email"
                placeholder="enter email..."
                name="email"
                value={data.email}
                onChange={handleChange}
              />

              <label className="title-sign-login" htmlFor="password">
                Password:
              </label>
              <input
                className="input"
                type="password"
                placeholder="enter password..."
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              <br />
              <button className="button-sign-log" type="submit">
                SignUp
              </button>

              <p>
                Have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
