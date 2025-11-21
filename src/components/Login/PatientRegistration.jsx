import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import img from "../../assets/images/userlogin-picture.webp";
import { auth, db } from "../../../firebase";
import {
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../layout/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

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
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [resendTimer, setResendTimer] = useState(0);

  const recaptchaRef = useRef(null);

  // PASSWORD STRENGTH
  const calculateStrength = (pwd) => {
    let score = 0;
    if (!pwd) return { label: "Empty", color: "bg-gray-300", width: "0%" };
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "25%" };
    if (score === 2) return { label: "Medium", color: "bg-orange-400", width: "50%" };
    if (score === 3) return { label: "Strong", color: "bg-yellow-400", width: "75%" };
    return { label: "Very Strong", color: "bg-green-500", width: "100%" };
  };

  const strength = calculateStrength(password);

  // LIVE VALIDATION
  useEffect(() => {
    const partial = {};
    if (fullname && !fullname.trim()) partial.fullname = "Full name is required.";
    if (mobile && !mobile.trim()) partial.mobile = "Mobile number is required.";
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim()))
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
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim()))
      newErrors.email = "Invalid email.";
    if (!password) newErrors.password = "Password is required.";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm your password.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // RESEND TIMER
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // RECAPTCHA SETUP
  const setupRecaptcha = () => {
    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
  };

  // 🔹 Helper: Format Nigerian phone number
  const formatPhoneNumber = (num) => {
    let cleaned = num.replace(/\D/g, ""); // remove non-digits
    if (cleaned.startsWith("0")) {
      cleaned = "+234" + cleaned.slice(1); // replace leading 0
    } else if (!cleaned.startsWith("+234")) {
      cleaned = "+234" + cleaned;
    }
    return cleaned;
  };

  // SEND OTP (console version for testing)
  const handleSendOtp = async () => {
    if (!mobile.trim()) return toast.error("Enter your mobile number.");

    setupRecaptcha();
    setLoading(true);

    try {
      const phoneNum = formatPhoneNumber(mobile);

      // 🔹 For testing: Generate random 6-digit OTP
      const testOtp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`📲 OTP for ${phoneNum}: ${testOtp}`);

      // Save OTP in confirmObj for verification
      setConfirmObj({
        confirm: (enteredOtp) =>
          new Promise((resolve, reject) => {
            if (enteredOtp === testOtp) resolve(true);
            else reject(new Error("Invalid OTP"));
          }),
      });

      setOtpSent(true);
      setResendTimer(60);
      toast.success("OTP sent! Check console for testing OTP.");
    } catch (err) {
      console.log(err);
      toast.error("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otpCode.trim()) return toast.error("Enter OTP.");
    if (!confirmObj) return toast.error("No OTP request found.");

    setLoading(true);

    try {
      await confirmObj.confirm(otpCode);
      setPhoneVerified(true);
      toast.success("Phone verified!");
    } catch (err) {
      console.log(err);
      toast.error("Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  // FINAL REGISTRATION
  const handleRegister = async () => {
    if (!validate()) return toast.error("Fix all errors.");
    if (!phoneVerified) return toast.error("You must verify your phone.");

    setLoading(true);

    try {
      const finalEmail = email.trim() || `${mobile.replace(/\D/g, "")}@placeholder.com`;

      const userCredential = await createUserWithEmailAndPassword(auth, finalEmail, password);
      const user = userCredential.user;

      await setDoc(doc(db, "patients", user.uid), {
        fullname,
        mobile: formatPhoneNumber(mobile),
        email: email.trim() || null,
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });

      toast.success("Registration successful! Redirecting…");
      setTimeout(() => navigate("/patient-login"), 1500);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div id="recaptcha-container"></div>
      <Navbar />

      <div
        className="p-6 md:p-0 min-h-screen flex justify-center items-center bg-cover bg-center mt-18 relative"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="relative z-10 w-170 max-w-5xl bg-white rounded-lg shadow-2xl flex overflow-hidden">
          <div className="w-110 p-10">
            <h2 className="text-2xl w-140 text-center font-semibold mb-6 py-4 rounded-2xl text-white bg-[#12887c]">
              Sign Up
            </h2>

            {/* FULL NAME */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-65 md:w-140 rounded-md p-3 focus:outline-0 shadow-sm shadow-gray-400"
              />
              {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
            </div>

            {/* MOBILE */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Mobile Number (e.g 08123456789)"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                className="w-65 md:w-140 rounded-md p-3 focus:outline-0 shadow-sm shadow-gray-400"
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
            </div>

            {/* OTP SECTION */}
            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="bg-[#047267] hover:bg-[#03534B] text-white w-65 md:w-80 py-2 md:ml-30 rounded-md font-semibold mb-4"
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
                    className="w-65 md:w-140 border rounded-md p-3"
                  />
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading || phoneVerified}
                  className="bg-[#047267] hover:bg-[#03534B] text-white w-65 md:w-80 py-2 rounded-md font-semibold mb-2"
                >
                  {loading ? "Verifying…" : phoneVerified ? "Verified" : "Verify OTP"}
                </button>

                <button
                  onClick={handleSendOtp}
                  disabled={resendTimer > 0 || loading}
                  className="text-sm text-[#047267] underline mb-4"
                >
                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
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
                className="w-65 md:w-140 focus:outline-0 shadow-sm shadow-gray-400 rounded-md p-3"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* PASSWORD */}
            <div className="mb-3 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-65 md:w-140 focus:outline-0 shadow-sm shadow-gray-400 rounded-md p-3"
              />
              <span
                className="absolute left-130 top-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* STRENGTH METER */}
            <div className="mb-4 w-65 md:w-140">
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className={`${strength.color} h-2`} style={{ width: strength.width }}></div>
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
                className="w-65 md:w-140 focus:outline-0 shadow-sm shadow-gray-400 rounded-md p-3"
              />
              <span
                className="absolute left-130 top-4 cursor-pointer"
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
              className="bg-[#047267] hover:bg-[#03534B] text-white w-65 md:w-80 py-3 md:ml-30 rounded-md font-semibold"
            >
              {loading ? "Registering…" : "Register"}
            </button>

            <p className="mt-5 md:ml-40 text-center text-sm">
              Already have an account?{" "}
              <Link to="/patient-login" className="text-[#047267] underline">
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
