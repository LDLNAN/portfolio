// https://firebase.google.com/docs/auth/web/google-signin
// https://www.geeksforgeeks.org/reactjs/how-to-implement-google-login-in-your-web-app-with-firebase/

function toggleMenu() {
    let x = document.getElementById("nav-menu");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// auth
import { auth } from '../firebase.js'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'

const provider = new GoogleAuthProvider()

function handleGoogleSignIn() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user
            console.log("User signed in:", user.displayName)
        })
        .catch((error) => {
            console.error("Error during sign in:", error.message)
        })
}

function handleSignOut() {
    signOut(auth)
        .then(() => {
            console.log("User signed out")
        })
        .catch((error) => {
            console.error("Error during sign out:", error.message)
        })
}

// show correct ui based on auth state
onAuthStateChanged(auth, (user) => {
    const authSection = document.getElementById("auth-section")
    const userInfo = document.getElementById("user-info")
    const userName = document.getElementById("user-name")
    
    // prevents error, this stuff not needed on every page
    if (!authSection || !userInfo || !userName) {
        return
    }
    
    if (user) { // if signed in
        authSection.style.display = "none"
        userInfo.style.display = "block"
        userName.textContent = user.displayName || "User"
    } else {
        authSection.style.display = "block"
        userInfo.style.display = "none"
    }
})

// wait for page load, grab the buttons, add event listeners to the buttons
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn')
    const logoutBtn = document.querySelector('.logout-btn')
    
    if (loginBtn) {
        loginBtn.addEventListener('click', handleGoogleSignIn)
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleSignOut)
    }

    const navToggleBtn = document.querySelector('.nav-toggle-btn')
    if (navToggleBtn) {
        navToggleBtn.addEventListener('click', toggleMenu)
    }
})