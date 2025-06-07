const name = document.querySelector('#name');
const semester = document.querySelector('#semester');
const phone = document.querySelector('#phone');
const btn = document.querySelector('#btn');
phone.addEventListener('input', () => {
  limitLength(phone, 10);
  getData();
})
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcugiZPZnlZ9XqRW4snTbjp-_hak1BOqY",
  authDomain: "farewell-register.firebaseapp.com",
  databaseURL: "https://farewell-register-default-rtdb.firebaseio.com",
  projectId: "farewell-register",
  storageBucket: "farewell-register.firebasestorage.app",
  messagingSenderId: "1000923768561",
  appId: "1:1000923768561:web:5c050e34af2de143b42b50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";
const db = getDatabase();

function setData() {
  set(ref(db, "Users/" + phone.value.trim()), {
    Name: name.value.trim(),
    Semester: semester.value
  });
}

function getData() {
  const data = ref(db, "Users");
  onValue(data, (snapshot) => {
    if (snapshot.exists()) {
      let review = snapshot.val();
      
      console.log(Object.keys(review))
      Object.keys(review).forEach((key) => {
        if (key == phone.value) {
          alert("Phone no. already found")
        }
        else {
          console.log("match not found")
        }
        
        
      })
    }
  })
}
btn.addEventListener('click', () => {
  if (name.value && phone.value && semester.value) {
    getData()
    setData()
    name.value = "";
    phone.value = "";
    semester.value = "";
  }
  else {
    alert("Please fill complete field");
  }
})

function limitLength(phone, maxLength) {
  if (phone.value.length > maxLength) {
    phone.value = phone.value.slice(0, maxLength);
  }
    }
