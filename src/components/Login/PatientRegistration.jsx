import { useState, useEffect, useRef } from "react";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import img from "../../assets/images/userlogin-picture.webp";
import { auth, db } from "../../../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../layout/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

// 🔥 Full Registration With Phone Auth + Redirect
function PatientRegistration() {
  const navigate = useNavigate();

  // FORM FIELDS
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI STATES
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});
  const recaptchaRef = useRef(null);

  // PASSWORD STRENGTH CHECK
  const calculateStrength = (pwd) => {
    let score = 0;
    if (!pwd) return { score: 0, label: "Empty", color: "bg-gray-300", width: "w-0" };
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score, label: "Weak", color: "bg-red-500", width: "w-1/4" };
    if (score === 2) return { score, label: "Medium", color: "bg-orange-400", width: "w-2/4" };
    if (score === 3) return { score, label: "Strong", color: "bg-yellow-400", width: "w-3/4" };
    return { score, label: "Very Strong", color: "bg-green-500", width: "w-full" };
  };

  const strength = calculateStrength(password);

  // LIVE VALIDATION
  useEffect(() => {
    const partial = {};
    if (fullname && !fullname.trim()) partial.fullname = "Full name is required.";
    if (mobile && !mobile.trim()) partial.mobile = "Mobile number is required.";
    if (email && email.length && !/^\S+@\S+\.\S+$/.test(email))
      partial.email = "Enter a valid email.";
    if (password && password.length < 6)
      partial.password = "Password must be at least 6 characters.";
    if (confirmPassword && password !== confirmPassword)
      partial.confirmPassword = "Passwords do not match.";
    setErrors((prev) => ({ ...prev, ...partial }));
  }, [fullname, mobile, email, password, confirmPassword]);

  // FINAL VALIDATION
  const validate = () => {
    const newErrors = {};
    if (!fullname.trim()) newErrors.fullname = "Full name is required.";
    if (!mobile.trim()) newErrors.mobile = "Mobile number is required.";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email.";
    if (!password) newErrors.password = "Password is required.";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm your password.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔥 Initialize Invisible Recaptcha
  const setupRecaptcha = () => {
    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  };

  // 🔥 Send OTP
  const handleSendOtp = async () => {
    if (!mobile.trim()) return toast.error("Enter your mobile number.");

    setupRecaptcha();
    setLoading(true);

    try {
      const phoneNum = "+234" + mobile.slice(1); // change to your country logic if needed
      const confirmation = await signInWithPhoneNumber(auth, phoneNum, recaptchaRef.current);
      setConfirmObj(confirmation);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (err) {
      toast.error("Failed to send OTP.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Verify OTP
  const handleVerifyOtp = async () => {
    if (!otpCode.trim()) return toast.error("Enter OTP.");

    setLoading(true);

    try {
      await confirmObj.confirm(otpCode);
      toast.success("Phone verified!");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Invalid OTP.");
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  // 🔥 Final Registration After OTP Verified
  const handleRegister = async () => {
    if (!validate()) {
      toast.error("Fix all errors.");
      return;
    }

    if (!otpSent) {
      toast.error("You must verify your phone.");
      return;
    }

    setLoading(true);

    try {
      const finalEmail =
        email.trim() || `${mobile.replace(/\D/g, "")}@placeholder.com`;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        finalEmail,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "patients", user.uid), {
        fullname,
        mobile,
        email: email.trim() || null,
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });

      toast.success("Registration successful! Redirecting…");

      setTimeout(() => navigate("/user-login"), 1500);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-right" />

      {/* Recaptcha */}
      <div id="recaptcha-container"></div>

      <Navbar />

      <div
        className="p-6 md:p-0 min-h-screen flex justify-center items-center bg-cover bg-center mt-18 relative"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="relative z-10 w-170 max-w-5xl bg-white rounded-lg shadow-2xl flex overflow-hidden">

          {/* LEFT SIDE */}
          <div className="w-70 bg-[#047267] text-white p-7 hidden md:block">
            <h2 className="text-xl font-bold mb-6">Create Account</h2>
            <ul className="space-y-8 text-[13px] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle size={18} /> Access your records anywhere
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} /> Fast & secure
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} /> Phone verified login
              </li>
            </ul>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="w-110 p-10">

            <h2 className="text-2xl text-center font-semibold mb-6">Sign Up</h2>

            {/* FULL NAME */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-65 md:w-80 border rounded-md p-3 focus:ring-2 focus:ring-[#047267]"
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
              )}
            </div>

            {/* MOBILE */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Mobile Number (e.g 08123456789)"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-65 md:w-80 border rounded-md p-3 focus:ring-2 focus:ring-[#047267]"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* OTP SECTION */}
            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="bg-[#047267] hover:bg-[#03534B] text-white w-65 md:w-80 py-2 rounded-md font-semibold mb-4"
              >
                {loading ? "Sending OTP…" : "Send OTP"}
              </button>
            ) : (
              <>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-65 md:w-80 border rounded-md p-3"
                  />
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="bg-[#047267] hover:bg-[#03534B] text-white w-65 md:w-80 py-2 rounded-md font-semibold mb-4"
                >
                  {loading ? "Verifying…" : "Verify OTP"}
                </button>
              </>
            )}

            {/* EMAIL OPTIONAL */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-65 md:w-80 border rounded-md p-3"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-3 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-65 md:w-80 border rounded-md p-3"
              />
              <span
                className="absolute right-4 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* STRENGTH METER */}
            <div className="mb-4 w-65 md:w-80">
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`${strength.color} h-2 transition-all duration-300`}
                  style={{ width: strength.width === "w-0" ? "0%" : undefined }}
                ></div>
              </div>
              <p className="text-sm mt-2">{password ? strength.label : "Password strength"}</p>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-4 relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-65 md:w-80 border rounded-md p-3"
              />
              <span
                className="absolute right-4 top-3 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* REGISTER */}
            <button
              onClick={handleRegister}
              disabled={loading}
              className="bg-[#047267] hover:bg-[#03534B] text-white w-65 md:w-80 py-3 rounded-md font-semibold"
            >
              {loading ? "Registering…" : "Register"}
            </button>

            <p className="mt-5 text-center text-sm">
              Already have an account?{" "}
              <Link to="/user-login" className="text-[#047267] underline">
                Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}

export default PatientRegistration;
