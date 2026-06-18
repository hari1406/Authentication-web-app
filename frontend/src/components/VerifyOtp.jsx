import { useState } from "react";
import { verifyOtp } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    otp: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // const handleVerify = async () => {
  //   try {
  //     await verifyOtp(data.email, data.otp);

  //     alert("Account Verified");
  //     navigate("/login");
  //   } catch {
  //     alert("Invalid OTP");
  //   }
  // };
  const handleVerify = async () => {
  try {
    const response = await verifyOtp(
      data.email,
      data.otp
    );

    console.log(response.data);

    if (response.data === "Verified Successfully") {
      alert("Account Verified");
      navigate("/login");
    } else {
      alert(response.data);
    }

  } catch (error) {
    console.error(error);
    alert("Verification Failed");
  }
};

  return (
    <div className="container">
      <h2>Verify OTP</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="text"
        name="otp"
        placeholder="Enter OTP"
        onChange={handleChange}
      />

      <button onClick={handleVerify}>
        Verify
      </button>
    </div>
  );
}

export default VerifyOtp;