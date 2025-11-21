import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import Navbar from "../layout/Navbar";
import img from "../../assets/images/userlogin-picture.webp";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function PatientLogin() {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [passwordLoginMode, setPasswordLoginMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize Recaptcha once
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
      window.recaptchaVerifier.appVerificationDisabledForTesting = true; // console OTP
    }
  }, []);

  // SEND OTP
  const handleSendOTP = async () => {
    if (!mobile) return toast.error("Enter your mobile number");
    setLoading(true);

    try {
      const fullPhone = "+234" + mobile.replace(/^0/, ""); // make sure number format is correct
      const confirmation = await signInWithPhoneNumber(auth, fullPhone, window.recaptchaVerifier);

      window.confirmationResult = confirmation;
      setOtpSent(true);
      console.log("OTP sent! Use 123456 for testing"); // you can input this OTP to test
      toast.success("OTP sent! Check console for testing OTP.");
    } catch (error) {
      toast.error("Failed to send OTP. Check number format.");
      console.log(error);
    }

    setLoading(false);
  };

  // VERIFY OTP
  const handleVerifyOTP = async () => {
    if (!otp) return toast.error("Enter the OTP sent to your phone");
    setLoading(true);

    try {
      await window.confirmationResult.confirm(otp);
      toast.success("Login successful via OTP!");
    } catch (error) {
      toast.error("Incorrect OTP");
      console.log(error);
    }

    setLoading(false);
  };

  // PASSWORD LOGIN
  const handlePasswordLogin = async () => {
    if (!password) return toast.error("Enter your password");

    if (!email && !mobile) return toast.error("Enter email or mobile number");

    setLoading(true);
    try {
      if (email) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful via email/password!");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />

      <div
        className="p-6 md:p-0 min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat mt-18"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="relative z-10 w-170 max-w-5xl bg-white rounded-lg shadow-2xl flex overflow-hidden">
          {/* LEFT SIDE */}
          <div className="w-70 bg-[#0096A0] text-white p-8 hidden md:block">
            <h2 className="text-xl font-semibold mb-6">Patient Login</h2>

            <ul className="space-y-6 text-[13px] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="mt-1" />
                Book Video Consultation
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="mt-1" />
                Book Doctor Appointment
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="mt-1" />
                View Medical Records
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="mt-1" />
                Add Family Members
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="mt-1" />
                And much more...
              </li>
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-110 p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold ml-16 md:ml-24 mb-8">Patient Login</h2>

            {/* MOBILE INPUT */}
            <div className="flex gap-2 mb-5">
              <select className="p-3 rounded-md w-20 outline-none shadow-sm shadow-gray-400">
                <option>+234 NG</option>
              </select>

              <input
                type="text"
                placeholder="Mobile No"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-44 md:w-60 rounded-md p-3 outline-none shadow-sm shadow-gray-400"
              />
            </div>

            {/* PASSWORD INPUT */}
            {passwordLoginMode && (
              <>
                <input
                  type="text"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full md:w-60 mb-4 p-3 ml-16 rounded-md outline-none shadow-sm shadow-gray-400"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full md:w-60 mb-6 p-3 ml-16 rounded-md outline-none shadow-sm shadow-gray-400"
                />
              </>
            )}

            {/* OTP INPUT */}
            {otpSent && !passwordLoginMode && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full md:w-60 mb-6 p-3 ml-16 rounded-md outline-none shadow-sm shadow-gray-400"
              />
            )}

            {/* ACTION BUTTON */}
            {!passwordLoginMode ? (
              !otpSent ? (
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full md:w-40 bg-[#0096A0] md:ml-26 cursor-pointer text-white py-3 rounded-md font-semibold hover:bg-[#025b61] transition mb-6 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              ) : (
                <button
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="w-full md:w-40 bg-[#0096A0] md:ml-26 cursor-pointer text-white py-3 rounded-md font-semibold hover:bg-[#025b61] transition mb-6 disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              )
            ) : (
              <button
                onClick={handlePasswordLogin}
                disabled={loading}
                className="w-full md:w-60 ml-16 bg-[#0096A0] cursor-pointer text-white py-3 rounded-md font-semibold hover:bg-[#025b61] transition mb-6 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Login"}
              </button>
            )}

            {/* TOGGLE LOGIN TYPE */}
            <button
              onClick={() => {
                setPasswordLoginMode(!passwordLoginMode);
                setOtpSent(false);
              }}
              className="w-full md:w-60 shadow-sm ml-16 shadow-gray-400 text-[#0096A0] py-3 rounded-md font-semibold hover:bg-[#0096A0] hover:text-white transition"
            >
              {passwordLoginMode ? "Login with OTP" : "Login with Password"}
            </button>

            {/* REGISTER LINK */}
            <p className="mt-6 text-sm text-center">
              Don't have an account?{" "}
              <Link to="/patient-registration" className="text-[#0096A0] underline">
                Register here
              </Link>
            </p>

            {/* Recaptcha container */}
            <div id="recaptcha-container"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientLogin;
