const apiKey = "7d5cb1e2d1054d4f9832e6f9d71eacd9";  // Buraya kendi API key'ini eklemeyi unutma
const url = "https://api.football-data.org/v4/matches";

fetch(url, {
    headers: { "X-Auth-Token": apiKey }
})
.then(response => response.json())
.then(data => {
    console.log("API Response:", data);  
    let matchesContainer = document.getElementById("matches");
    matchesContainer.innerHTML = "";  // Önceki maçları temizle

    if (data.matches && data.matches.length > 0) {
        data.matches.forEach(match => {
            let matchTime = match.utcDate ? new Date(match.utcDate).toLocaleString() : "Time not available"; // Maç zamanını göster

            let matchInfo = `
                <div class="match">
                    <p><strong>${match.homeTeam.name}</strong> vs <strong>${match.awayTeam.name}</strong></p>
                    <p>Status: ${match.status}</p>
                    <p>Match Time: ${matchTime}</p>
                </div>
            `;

            matchesContainer.innerHTML += matchInfo;
        });
    } else {
        matchesContainer.innerHTML = "No matches found.";
    }
})
.catch(error => {
    console.error("Hata:", error);
    document.getElementById("matches").innerHTML = "Error fetching data.";
});
