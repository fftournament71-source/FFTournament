function signup() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("password").value.trim();

    if (!name || !email || !pass) {
        alert("Please fill all fields");
        return;
    }

    // পুরানো লিস্ট আনো
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ইমেইল আছে কিনা চেক
    let exists = users.find(u => u.email === email);

    if (exists) {
        alert("Email already registered!");
        return;
    }

    // নতুন ইউজার অবজেক্ট
    let newUser = {
        name: name,
        email: email,
        password: pass,
        balance: 0,
        matches: 0,
        wins: 0,
        losses: 0,
        referCode: "REF" + Math.floor(Math.random() * 1000000)
    };

    // অ্যাড করো
    users.push(newUser);

    // লোকাল স্টোরেজ সেভ করো
    localStorage.setItem("users", JSON.stringify(users));

    // Auto login
    localStorage.setItem("loggedUser", JSON.stringify(newUser));

    alert("Signup Successful!");
    window.location.href = "profile.html";
}