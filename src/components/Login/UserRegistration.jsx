import { useState } from "react";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import img from "../../assets/images/userlogin-picture.webp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../layout/Navbar";
import { Link } from "react-router-dom";

function UserRegistration() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Registration states
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // REGISTER FUNCTION
  const handleRegister = async () => {
    if (!fullname || !email || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      // Create account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "patients", user.uid), {
        fullname: fullname,
        email: email,
        uid: user.uid,
        createdAt: new Date(),
      });

      alert("Registration successful!");

      // Redirect
      // window.location.href = "/login";

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="p-6 md:p-0 min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat mt-18"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="relative z-10 w-170 max-w-5xl bg-white rounded-lg shadow-2xl flex overflow-hidden">

          {/* LEFT */}
          <div className="w-70 bg-[#047267] text-white p-7 hidden md:block">
            <h2 className="text-xl font-bold mb-6">Create Account</h2>

            <ul className="space-y-8 text-[13px] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-white mt-1" size={18} />
                Create your secure profile
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-white mt-1" size={18} />
                Access medical records anywhere
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-white mt-1" size={18} />
                Fast, easy & reliable
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="w-110 p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold ml-10 md:ml-20 mb-8">
              Create Account
            </h2>

            {/* Full Name */}
            <div className="mb-5">
              <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-65 md:w-80 border rounded-md p-3 outline-none focus:ring-2 focus:ring-[#047267]"
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <input
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-65 md:w-80 border rounded-md p-3 outline-none focus:ring-2 focus:ring-[#047267]"
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Create Password"
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

            {/* Register Button */}
            <button
              onClick={handleRegister}
              className="w-50 md:w-60 ml-5 md:ml-8 bg-[#047267] text-white py-3 rounded-md font-semibold hover:bg-[#03534b] transition cursor-pointer"
            >
              Register
            </button>

            {/* Already have account */}
            <p className="mt-5 ml-10 text-sm">
              Already have an account?{" "}
              <Link to="/user-login" className="text-[#047267] underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRegistration;