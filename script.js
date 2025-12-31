// SIGNUP FUNCTION
function userSignup() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("password").value.trim();

    if (name === "" || email === "" || pass === "") {
        alert("Please fill all fields");
        return;
    }

    let user = {
        name: name,
        email: email,
        password: pass,
        totalMatches: 0,
        wins: 0,
        losses: 0
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("loggedIn", "true");

    window.location.href = "index.html";
}
// ===== ADMIN + USER LOGIN SYSTEM =====

function login() {
    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("password").value.trim();

    if (!email || !pass) {
        alert("Please fill all fields");
        return;
    }

    // === ADMIN CHECK ===
    if (email === "mrajuan203@gmail.com" && pass === "Robiul5Nasima") {
        localStorage.setItem("adminLogged", "true");
        alert("Admin Login Successful!");
        window.location.href = "admin-dashboard.html";
        return;
    }

    // === USER LOGIN ===
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === email && u.password === pass);

    if (!user) {
        alert("Invalid Email or Password!");
        return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));

    alert("Login Successful!");
    window.location.href = "profile.html";
}

// LOGIN FUNCTION
function userLogin() {
    let email = document.getElementById("loginEmail").value.trim();
    let pass = document.getElementById("loginPass").value.trim();

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("No account found!");
        return;
    }

    if (user.email === email && user.password === pass) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
    } else {
        alert("Wrong email or password");
    }
}


// LOAD PROFILE DATA
function loadProfile() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    document.getElementById("userName").innerText = user.name;
    document.getElementById("totalMatches").innerText = user.totalMatches;
    document.getElementById("wins").innerText = user.wins;
    document.getElementById("losses").innerText = user.losses;
}


// LOGOUT
function logout() {
    localStorage.setItem("loggedIn", "false");
    window.location.href = "login.html";
}