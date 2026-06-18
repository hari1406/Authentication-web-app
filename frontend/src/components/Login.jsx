import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, verifyOtp } from "../services/AuthService";

function Login() {
  const navigate = useNavigate();

  const [stage, setStage] = useState("login");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
  try {
    const response = await login(data);

    if (response.data === "Login Successful") {
      localStorage.setItem("token", "dummy-token");
      navigate("/dashboard");
    } else {
      alert(response.data);
    }
  } catch {
    alert("Invalid credentials");
  }
};

  const handleVerify = async () => {
    try {
      const response = await verifyOtp(data.email, otp);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {stage === "login" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify();
          }}
        >
          <p>Enter the OTP sent to {data.email}</p>

          <input
            type="text"
            name="otp"
            value={otp}
            placeholder="OTP"
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button type="submit">Verify OTP</button>
          <button
            type="button"
            onClick={() => setStage("login")}
            style={{ marginLeft: "8px" }}
          >
            Back
          </button>
        </form>
      )}

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;