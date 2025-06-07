const name = document.querySelector('#name');
const semester = document.querySelector('#semester');
const phone = document.querySelector('#phone');
const btn = document.querySelector('#btn');

phone.addEventListener('input', () => {
  limitLength(phone, 10);
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCcugiZPZnlZ9XqRW4snTbjp-_hak1BOqY",
  authDomain: "farewell-register.firebaseapp.com",
  databaseURL: "https://farewell-register-default-rtdb.firebaseio.com",
  projectId: "farewell-register",
  storageBucket: "farewell-register.appspot.com",
  messagingSenderId: "1000923768561",
  appId: "1:1000923768561:web:5c050e34af2de143b42b50"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function limitLength(input, maxLength) {
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
}

function setData() {
  set(ref(db, "Users/" + phone.value.trim()), {
    Name: name.value.trim(),
    Semester: semester.value
  });
  
  name.value = "";
  phone.value = "";
  semester.value = "";
}

function checkPhoneExists(phoneNumber, callback) {
  const dataRef = ref(db, "Users/" + phoneNumber);
  onValue(dataRef, (snapshot) => {
    callback(snapshot.exists());
  }, { onlyOnce: true });
}

btn.addEventListener('click', () => {
  if (name.value && phone.value && semester.value) {
    if (phone.value.length == 10) {
      checkPhoneExists(phone.value.trim(), (exists) => {
        if (exists) {
          alert("Phone number already registered!");
        } else {
          setData();
          alert("Thank you for Registration ❣️");
        }
      });
    }
    else {
      alert("Enter valid number")
    }
  }
  else {
    alert("Please fill complete field");
  }
});
