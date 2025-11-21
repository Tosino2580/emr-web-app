/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 15/11/2025 - 17:15:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Company/Home";
// import Lms from "./components/LabMedService/Lms";
import UserLogin from "./components/Login/userLogin";
import UserRegistration from "./components/Login/UserRegistration";
import PatientRegistration from "./components/Login/PatientRegistration";
import PatientLogin from "./components/Login/patientLogin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/lab-med-service" element={<Lms />} />  */}
          <Route path="/user-login" element={<UserLogin/>} /> 
          <Route path="/user-registration" element={<UserRegistration />} /> 
          <Route path="/patient-registration" element={<PatientRegistration/>} /> 
          <Route path="/patient-login" element={<PatientLogin/>} /> 
          
        </Routes>
      </Router>
    </>
  )

}

export default App;
