import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// import { getFirestore} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import {getDatabase,ref,set} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"

//Authentication with firebase

const firebaseConfig = {
  apiKey: "AIzaSyCKvJ8oE7mC4vdzdBUoP0PqtOtGsdkTUn4",
  authDomain: "donate-ease-fd195.firebaseapp.com",
  projectId: "donate-ease-fd195",
  storageBucket: "donate-ease-fd195.appspot.com",
  messagingSenderId: "30329555430",
  appId: "1:30329555430:web:7b786e8bb11e19d1202e27",
  measurementId: "G-8D6WZ7RZ1S"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database =getDatabase(app);

const registrationForm = document.getElementById("register-page");

// Handle user registration
registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get user input
  const username = registrationForm.username.value;
  const firstname = registrationForm.firstname.value;
  const lastname = registrationForm.lastname.value;
  const email = registrationForm.email.value;
  const password = registrationForm.password.value;

  // Register user with Firebase Authentication
  const auth = getAuth();
  createUserWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      // Registration successful, you can perform further actions or redirect the user
     alert("Registration successful.");


      // Add additional user information to the Firestore or Realtime Database
      const user = userCredential.user;
      
      saveUserData(user.uid, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email
      });
      window.location.href = "login.html";
    })
    .catch((error) => {
      // Handle registration errors
      alert("user already exists");
    });
});

// Function to save additional user information to the database
function saveUserData(userId, userData) {
  set(ref(database, 'users/' + userId),userData)
      .then(() => {
        console.log("User data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving user data:", error);
      });
}
