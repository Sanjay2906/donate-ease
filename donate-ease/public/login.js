import { getAuth ,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
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
const auth = getAuth();

const loginForm = document.getElementById('login-form');

// Function to show login page and hide registration pag

// Function to handle user login
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Perform authentication logic here (e.g., validate against stored user data)
  // For simplicity, we'll use localStorage to store user data (not secure for production!)
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert("logged in");
    window.location.href="donate.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    alert(errorCode);
  });
});
// Function to handle user registration


// Event listeners for login and registration forms

