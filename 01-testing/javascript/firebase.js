<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBBFGObtwFNg--NObQTS41EsyF8MePBjJc",
    authDomain: "leads-tracker-app-75fff.firebaseapp.com",
    projectId: "leads-tracker-app-75fff",
    storageBucket: "leads-tracker-app-75fff.firebasestorage.app",
    messagingSenderId: "448031762908",
    appId: "1:448031762908:web:8e8820c41e94ec4d684719",
    measurementId: "G-T9TK99SX33"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>