// সব ম্যাচ লোড করা
function loadMatches() {
    let matches = JSON.parse(localStorage.getItem("matches")) || [];

    // category অনুযায়ী match গুলো ফিল্টার
    showMatchesByType("BR MATCH", "brList");
    showMatchesByType("CS SQUAD", "csList");
    showMatchesByType("LONE WOLF", "loneList");
    showMatchesByType("CS 2 VS 2", "vsList");

    function showMatchesByType(type, elementId) {
        let box = document.getElementById(elementId);
        box.innerHTML = ""; 

        let filtered = matches.filter(m => m.matchType === type);

        if (filtered.length === 0) {
            box.innerHTML = `<p class="empty">0 matches found</p>`;
            return;
        }

        filtered.forEach(m => {
            box.innerHTML += `
                <div class="match-card">
                    <h3>${m.title}</h3>
                    <p>Entry: ${m.entryFee}</p>
                    <p>Time: ${m.time}</p>
                    <button onclick="openMatch(${m.id})">View</button>
                </div>
            `;
        });
    }
}

// ম্যাচ ডিটেইলসে যাওয়া
function openMatch(id) {
    localStorage.setItem("selectedMatch", id);
    location.href = "match-details.html";
}

loadMatches();