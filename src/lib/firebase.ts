// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVnU5vYbb8bhomfGSJxJNT19vMuqOWMMU",
  authDomain: "genui-ai-component-generator.firebaseapp.com",
  projectId: "genui-ai-component-generator",
  storageBucket: "genui-ai-component-generator.firebasestorage.app",
  messagingSenderId: "43837238710",
  appId: "1:43837238710:web:77c8d54f669d695abee517"
};

// Initialize Firebase
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);

export { app, auth };
