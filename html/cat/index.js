import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js"
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyADGDi-T5GnnYjClJD4Iv70R_RK6XeXyPQ",
  authDomain: "cat-freecodecamp.firebaseapp.com",
  projectId: "cat-freecodecamp",
  storageBucket: "cat-freecodecamp.appspot.com",
  messagingSenderId: "897664576846",
  appId: "1:897664576846:web:ded9ca5f44047853e2c21f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addButtonEl = document.getElementById("add-button");
const inputFieldEl = document.getElementById("input-field");

async function addMovie(data) {
  try {
    await addDoc(collection(db, "movies"), data);
  } catch (error) {
    console.error(error)
  }
}

async function getMovies() {
  try {
    const moviesCol = collection(db, "movies");
    const movieSnapshot = await getDocs(moviesCol);
    const movieList = movieSnapshot.docs.map(doc => doc.data());

    return movieList;
  } catch (error) {
    console.error(error)
  }
}

getMovies().then((movieList) => console.log(movieList));

addButtonEl.addEventListener("click", () => {
  addMovie({ title: inputFieldEl.value });
});
