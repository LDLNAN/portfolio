function toggleMenu() {
    let x = document.getElementById("nav-menu");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// login state
let isLoggedIn = false;

// test toggle login function
function toggleLogin() {
    isLoggedIn = !isLoggedIn;
    
    const authSection = document.getElementById("auth-section");
    const userInfo = document.getElementById("user-info");
    const userName = document.getElementById("user-name");
    
    if (isLoggedIn) {
        authSection.style.display = "none";
        userInfo.style.display = "block";
        userName.textContent = "Lucas";
    } else {
        authSection.style.display = "block";
        userInfo.style.display = "none";
    }
}