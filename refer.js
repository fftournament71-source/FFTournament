let user = JSON.parse(localStorage.getItem("loggedUser"));

if (!user) {
    window.location.href = "login.html";
}

// যদি রেফার কোড না থাকে তাহলে বানানো হবে
if (!user.referCode) {
    user.referCode = "REF" + Math.floor(Math.random() * 1000000);
    localStorage.setItem("loggedUser", JSON.stringify(user));
}

document.getElementById("myCode").value = user.referCode;

function copyCode() {
    let copyText = document.getElementById("myCode");
    copyText.select();
    copyText.setSelectionRange(0, 9999);
    document.execCommand("copy");
    alert("Copied!");
}

function applyCode() {
    let code = document.getElementById("friendCode").value.trim();

    if (code === "") {
        alert("Enter a code!");
        return;
    }

    if (code === user.referCode) {
        alert("You can't use your own code!");
        return;
    }

    if (user.referUsed) {
        alert("You already used a refer code.");
        return;
    }

    user.referUsed = true;
    user.balance = (user.balance || 0) + 50; // বোনাস
    localStorage.setItem("loggedUser", JSON.stringify(user));

    alert("Refer applied! You earned 50 coins.");
}

function goBack() {
    window.location.href = "profile.html";
}