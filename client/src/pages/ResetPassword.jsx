import { useState } from "react";

import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import SignLoign from "../images/sign-log.png";
import axiosInstance from "../AxiosInstance";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();

  const navigate = useNavigate();

  const resetSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.patch(
        `/user/reset-password/${token}`,
        {
          newPassword,
        }
      );

      if (response.data && response.data.reset) {
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
    <div>
      <div className="screen">
        <div className="body">
          <div className="none-above">
            <img className="sign" src={SignLoign} alt="" />
          </div>
          <div className="cont">
            <div className="main">
              <br />
              <form onSubmit={resetSubmit} className="form">
                <h2 className="signup-login-text">Reset password</h2>
                <br />

                <label className="title-sign-login" htmlFor="password">
                  New Password:
                </label>
                <input
                  className="input"
                  type="password"
                  placeholder="*******"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <br />
                <br />

                <button className="button-sign-log" type="submit">
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
