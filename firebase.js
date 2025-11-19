/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 15/11/2025 - 13:41:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvoAXJ2OQ6gdklzY2K37wI_lNnfe_uYuY",
  authDomain:"emr-app-ce56d.firebaseapp.com",
  projectId: "emr-app-ce56d",
  storageBucket: "emr-app-ce56d.firebasestorage.app",
  messagingSenderId: "364702935118",
  appId: "1:364702935118:web:822bd58adfe34d39297b1f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
