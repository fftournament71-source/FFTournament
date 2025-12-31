// যদি ম্যাচ সংখ্যা সংরক্ষিত না থাকে তাহলে শূন্য দিয়ে শুরু করো
let data = JSON.parse(localStorage.getItem("matchCount"));
if (!data) {
    data = { br: 0, cs: 0, lone: 0, vs: 0 };
    localStorage.setItem("matchCount", JSON.stringify(data));
}

// HTML এ সংখ্যা দেখানো
if (document.getElementById("br-count")) {
    document.getElementById("br-count").innerText = data.br + " matches found";
}

if (document.getElementById("cs-count")) {
    document.getElementById("cs-count").innerText = data.cs + " matches found";
}

if (document.getElementById("lone-count")) {
    document.getElementById("lone-count").innerText = data.lone + " matches found";
}

if (document.getElementById("vs-count")) {
    document.getElementById("vs-count").innerText = data.vs + " matches found";
}