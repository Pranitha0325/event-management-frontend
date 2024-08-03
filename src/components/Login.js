import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { loginUser, registerUser } from "../services/authService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  // const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [confrimshowPass, setConfrimShowPass] = useState(false);
  const [show, setshow] = useState(false);
  const [details, setDetails] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  function closeModal() {
    setshow(false);
  }

  const customforreport = {
    content: {
      width: "500px",
      height: "400px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      overflow: "hidden",
      zIndex: 2,
    },
  };

  function passwordChange(id) {
    var x = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    if (id === "pass") setShowPass(!showPass);
    else setConfrimShowPass(!confrimshowPass);
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(details.email, details.password);
      console.log(response, "userresponse");
      alert(`Welcome ${response.data.userName}`);
      navigate("/create-event");
    } catch (error) {
      alert("Incorrect Email");
      // setMessage(error.response?.data?.error || "Login failed");
    }
  };

  const register = async () => {
    try {
      const response = await registerUser(
        details.email,
        details.password,
        details.userName,
        details.mobileNumber
      );
      console.log(response, "userresponse");
      alert("Registeration Successfull");
    } catch (error) {
      alert("Registeration Failed");
    }
  };

  return (
    <div className="login-container">
      <h1>Event Management</h1>
      <div className="form-container">
        <form
          onSubmit={(e) => {
            handleLogin(e);
          }}
        >
          <div>
            <h3 className="logosign" style={{ marginBottom: "20px" }}>
              <span className="logosign" style={{ color: "#094162" }}>
                LOG
              </span>
              <span className="logoin" style={{ color: "#ff5b22" }}>
                IN
              </span>
            </h3>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <span>
                <MdEmail
                  style={{
                    color: "#793A7A ",
                    height: "25px",
                    marginRight: "10px",
                  }}
                />
              </span>
            </div>

            <input
              type="text"
              style={{ backgroundColor: "#F5EEF5", minWidth: "250px" }}
              required
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              placeholder="Email id"
            />
            <br />
          </div>
          <div
            style={{ display: "flex", marginTop: "20px", marginBottom: "10px" }}
          >
            <div>
              <span>
                <RiLockPasswordFill
                  style={{
                    color: "#793A7A ",
                    height: "25px",
                    marginRight: "10px",
                  }}
                />
              </span>
            </div>

            <input
              type="password"
              id="pass"
              style={{ backgroundColor: "#F5EEF5", minWidth: "250px" }}
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              placeholder="Enter Password"
              aria-label="Email"
              aria-describedby="basic-addon1"
              autoComplete="off"
            />
            <span
              onClick={() => passwordChange("pass")}
              className="input-group-text"
              style={{ width: "60px", maxWidth: "40px" }}
              id="basic-addon1"
            >
              {showPass ? (
                <AiTwotoneEyeInvisible style={{ color: "#793A7A" }} />
              ) : (
                <AiFillEye style={{ color: "#793A7A" }} />
              )}
            </span>
          </div>

          <button className="buttons " type="submit">
            Login
          </button>
        </form>
        <div style={{ display: "flex" }}>
          <button onClick={() => setshow(true)} className="w-100 btn buttons">
            Sign up
          </button>
        </div>
      </div>

      <Modal
        isOpen={show}
        onRequestClose={closeModal}
        style={customforreport}
        contentLabel="Example Modal"
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ fontWeight: "600" }}>Sign up</h3>
          <div
            style={{ cursor: "pointer" }}
            className="close-icon"
            onClick={closeModal}
          >
            &#10006;
          </div>
        </div>

        <div className="input-group mb-2">
          <div className="input-group-prepend"></div>

          <input
            type="text"
            className="form-control changePlaceHolderSize"
            wrapperClassName="mb-4"
            required
            value={details.userName}
            onChange={(e) =>
              setDetails({ ...details, userName: e.target.value })
            }
            placeholder="Name"
            aria-label="Email"
            aria-describedby="basic-addon1"
            autoComplete="off"
          />
          <br />
        </div>

        <div className="input-group mb-5">
          <div className="input-group-prepend"></div>

          <input
            type="text"
            className="form-control changePlaceHolderSize"
            wrapperClassName="mb-4"
            required
            value={details.mobileNumber}
            onChange={(e) =>
              setDetails({ ...details, mobileNumber: e.target.value })
            }
            placeholder="mobile Number"
            aria-label="Email"
            aria-describedby="basic-addon1"
            autoComplete="off"
          />
          <br />
        </div>

        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              style={{ width: "60px", maxWidth: "40px" }}
              id="basic-addon1"
            >
              <MdEmail style={{ color: "rgb(3, 104, 104)", height: "30px" }} />
            </span>
          </div>

          <input
            type="text"
            className="form-control changePlaceHolderSize"
            wrapperClassName="mb-4"
            required
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            placeholder="Email id"
            aria-label="Email"
            aria-describedby="basic-addon1"
            autoComplete="off"
          />
          <br />
        </div>

        <div className="input-group mb-2" id="pass-div">
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              style={{ width: "60px", maxWidth: "40px" }}
              id="basic-addon1"
            >
              <RiLockPasswordFill
                style={{ color: "rgb(3, 104, 104)", height: "30px" }}
              />
            </span>
          </div>

          <input
            type="password"
            id="pass"
            className="form-control changePlaceHolderSize"
            value={details.password}
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            placeholder="Enter Password"
            aria-label="Email"
            aria-describedby="basic-addon1"
            autoComplete="off"
          />

          <span
            onClick={() => passwordChange("pass")}
            className="input-group-text"
            style={{ width: "60px", maxWidth: "40px" }}
            id="basic-addon1"
          >
            {showPass ? (
              <AiTwotoneEyeInvisible style={{ color: "rgb(3, 104, 104)" }} />
            ) : (
              <AiFillEye style={{ color: "rgb(3, 104, 104)" }} />
            )}
          </span>
        </div>

        <button
          style={{
            backgroundColor: "#094162",
            color: "white",
          }}
          onClick={register}
          className="w-100 btn "
          type="button"
        >
          Signin
        </button>
      </Modal>
    </div>
  );
}

export default Login;
