import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";




// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBekWLavgS-o7yklqPe0UjMQY97gnOiujY",
  authDomain: "saylani-form-df8dc.firebaseapp.com",
  projectId: "saylani-form-df8dc",
  storageBucket: "saylani-form-df8dc.firebasestorage.app",
  messagingSenderId: "954223639771",
  appId: "1:954223639771:web:7e1d5e242014e3ab63a0fe",
  measurementId: "G-Q1EX7RTK6Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const form = document.getElementById("auth-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const cnic = document.getElementById("cnic").value;
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  const course = document.getElementById("course").value;
  const city = document.getElementById("city").value;
  const address = document.getElementById("address").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "registrations", user.uid), {
      uid: user.uid,
      name,
      email,
      phone,
      cnic,
      dob,
      gender,
      course,
      city,
      address,
      createdAt: new Date()
    });

    alert(`✅ Registration successful for ${name}`);
    form.reset();
  } catch (error) {
    alert("❌ Error: " + error.message);
  }
});




// async function getData() {

//   const docRef = doc(db, "registrations", "0F1O3GiKniZ1bIl1MmWf5pAapGi1");
  
  
//   try {
//     const doc = await getDoc(docRef);
  
//     // Document was found in the cache. If no cached document exists,
//     // an error will be returned to the 'catch' block below.
//     console.log("document data:", doc.data());
//     console.log("CNIC:", doc.data().cnic);
//   } catch (e) {
//     console.log("Error getting cached document:", e);
//   }
// }

let admitCard = document.getElementById('search-btn');

admitCard.addEventListener('click', getData);

async function getData(event) {
  event.preventDefault();
  let getUserInput = document.getElementById('search-cnic');
  let cnic = getUserInput.value;
  let searchForm = document.getElementById('search')
  
  

  if (!cnic) {
    alert("Please enter a valid CNIC.");
    return;
  }

  console.log("Searching for CNIC:", cnic);

  const q = query(collection(db, 'registrations'), where("cnic", "==", cnic));  

  try {
    const documents = await getDocs(q);
    if (documents.empty) {
      console.log("No matching record found.");
    } else {
      documents.forEach((doc) => {
        console.log(doc.id, "=>", doc.data().cnic);
        
        const p = document.createElement("p");
        
        if (searchForm.contains(p)) {
          searchForm.removeChild(p);

        }
 
       
        

        p.innerHTML = `
          <div class="user-card">
            <h3>👤 ${doc.data().name}</h3>
            <p><strong>CNIC:</strong> ${doc.data().cnic}</p>
            <p><strong>Email:</strong> ${doc.data().email}</p>
            <p><strong>Phone:</strong> ${doc.data().phone}</p>
            <p><strong>Date of Birth:</strong> ${doc.data().dob}</p>
            <p><strong>Gender:</strong> ${doc.data().gender}</p>
            <p><strong>Course:</strong> ${doc.data().course}</p>
            <p><strong>City:</strong> ${doc.data().city}</p>
            <p><strong>Address:</strong> ${doc.data().address}</p>
            <p><strong>User ID:</strong> ${doc.data().uid}</p>
          </div>
        `;
        
        searchForm.appendChild(p);


      });
    }
  } catch (e) {
    console.log("Error getting documents:", e);
  }
}



// 🔁 Tab logic
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    const tabId = btn.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("active");
  });
});



