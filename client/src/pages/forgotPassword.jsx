import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Auth/signup.css";
import SignLoign from "../images/sign-log.png";
import axiosInstance from "../AxiosInstance";

const forgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/user/forgot-password", {
        email,
      });

      if (response.data && response.data.forgot) {
        toast.success(response.data.msg);
        navigate(`/login`);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Something went wrong, please try again!");
      }
    }
  };

  return (
    <div className="screen">
      <div className="body">
        <div className="none-above">
          <img className="sign" src={SignLoign} alt="" />
        </div>
        <div className="cont">
          <div className="main">
            <form onSubmit={handleSubmit} className="form">
              <br />
              <br />

              <h2 className="signup-login-text">Forgot password</h2>
              <br />

              <label className="title-sign-login" htmlFor="email">
                Email:
              </label>
              <br />

              <input
                className="input"
                type="email"
                placeholder="enter email..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <br />

              <button className="button-sign-log" type="submit">
                forgot password
              </button>
              <br />
              <a href="/login">
                <p>Login</p>
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forgotPassword;
