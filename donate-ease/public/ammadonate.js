import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import {getDatabase,ref,set,push} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

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

const ammaform=document.getElementById("ammadonation");

ammaform.addEventListener("submit",function(event){
    event.preventDefault();
    const name=ammaform.donorname.value;
     const mobilenumber=ammaform.donormobile.value;
      const address=ammaform.donoraddress.value;
      const selecttag=ammaform.donationtype.value;
      const      donationdetails=ammaform.donationdetails.value;
      
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          
          UserData(user.uid,{
            name:name,
            mobilenumber:mobilenumber,
            address:address,
            selecttag:selecttag,
            donationdetails:donationdetails
          })
         
        } else {
          alert("please login");
          window.location.href="login.html";
        }
      });

})

function UserData(userId, userData) {
  const db = getDatabase();
  const postListRef = ref(db, 'donations');
  const newPostRef = push(postListRef);
  set(newPostRef, userData
  ).then(() => {
      console.log("data saved successfully!");
      alert("thank you for donating!!");
      window.location.href="donate.html";
    })
    .catch((error) => {
      console.error("Error saving user data:", error);
      alert("please check the details");
    });
}