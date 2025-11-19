import { useState } from "react";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import img from "../../assets/images/userlogin-picture.webp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import Navbar from "../layout/Navbar";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

function UserLogin() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Email + Password states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN FUNCTION
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");

      // Redirect after login
      // window.location.href = "/dashboard";

    } catch (error) {
      alert(error.message);
    }
  };
  const handleForgotPassword = async () => {
  if (!email) {
    alert("Please enter your email first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent! Check your inbox.");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <>
    <Navbar/>
    <div
      className="p-6 md:p-0 min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat mt-18"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-white/40"></div>

      <div className="relative z-10 w-170 max-w-5xl bg-white rounded-lg shadow-2xl flex overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-70 bg-[#047267] text-white p-7 hidden md:block">
          <h2 className="text-xl font-bold mb-6">Customer Login</h2>

          <ul className="space-y-8 text-[13px] leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle className="text-white mt-1" size={18} />
              Anytime, Anywhere, Any Device
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-white mt-1" size={18} />
              Go Paperless
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-white mt-1" size={18} />
              Secure Backup
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-white mt-1" size={18} />
              Multi Location Support
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-white mt-1" size={18} />
              Quick Insight On Key Performance
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-110 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold ml-22 md:ml-28 mb-8">Sign In</h2>

          {/* Email */}
          <div className="mb-5">
            <input
              type="text"
              placeholder="Email or User Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-65 md:w-80 border rounded-md p-3 outline-none focus:ring-2 focus:ring-[#047267]"
            />
          </div>

          {/* Password */}
          <div className="mb-2 ">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-65 md:w-80 border rounded-md p-3 outline-none focus:ring-2 focus:ring-[#047267]"
            />

            <span
              className="relative left-58 md:left-72 bottom-8 cursor-pointer text-[#009688]"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Forgot password */}
          <div onClick={handleForgotPassword} className="ml-46 md:ml-0 md:text-right mb-5">
            <a href="#" className="text-[#009688] mr-10 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-50 md:w-60 ml-5 md:ml-8  bg-[#047267] text-white py-3 rounded-md font-semibold hover:bg-[#03534b] transition cursor-pointer"
          >
            Login
          </button>

           <p className="mt-5 ml-10 text-sm">
              Don't have an account?{" "}
              <Link to="/user-registration" className="text-[#047267] underline">
                Sign Up
              </Link>
            </p>
        </div>
      </div>
    </div>
    </>
  );
}
export default UserLogin;
