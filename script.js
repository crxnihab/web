// IMDb API কনফিগ
const apiKey = 'YOUR_IMDB_API_KEY'; // এখানে তোমার IMDb RapidAPI Key বসাও
const imdbId = 'tt4154796'; // উদাহরণ: Avengers Endgame (ডাইনামিক করার ব্যবস্থা পরে হবে)

// সার্ভার সোর্স গুলো
const servers = {
  server1: "https://example.com/embed1",
  server2: "https://example.com/embed2",
  server3: "https://example.com/embed3"
};

// প্লেয়ার সোর্স চেঞ্জ
function changeServer(src) {
  document.getElementById("mainPlayer").src = src;
}

// IMDb Movie Data Load
async function loadMovieDetails() {
  try {
    const res = await fetch(`https://imdb-api.projects.thetuhin.com/title/${imdbId}`);
    const data = await res.json();

    if (data && data.title) {
      const detailsBox = document.getElementById("movieDetails");
      detailsBox.innerHTML = `
        <h2>${data.title}</h2>
        <p><strong>Release:</strong> ${data.releaseDate}</p>
        <p><strong>Genres:</strong> ${data.genres}</p>
        <p><strong>Rating:</strong> ${data.imDbRating} / 10</p>
        <p><strong>Runtime:</strong> ${data.runtimeStr}</p>
        <p><strong>Director:</strong> ${data.directors}</p>
        <p><strong>Plot:</strong> ${data.plot}</p>
      `;
    } else {
      document.getElementById("movieDetails").innerText = "Details not found.";
    }
  } catch (err) {
    console.error("Failed to load movie info", err);
  }
}

// শুরুতেই সার্ভার ও ডেটা লোড
window.onload = () => {
  changeServer(servers.server1);
  loadMovieDetails();
};
