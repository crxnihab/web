// MongoDB Database URL (মঙ্গডিবি Atlas URL)
const mongoDBUrl = "YOUR_MONGO_DB_URL_HERE"; // MongoDB URL

// Add Movie Button Click Event
document.getElementById('addMovieBtn').addEventListener('click', async () => {
  const movieUrl = document.getElementById('movieUrl').value;
  
  if (!movieUrl) {
    alert("Please enter a valid movie URL.");
    return;
  }

  // Add Movie to Database
  try {
    const response = await fetch(mongoDBUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: movieUrl }),
    });
    const result = await response.json();

    if (result.success) {
      alert("Movie added successfully!");
      loadMovies();
    } else {
      alert("Failed to add movie.");
    }
  } catch (err) {
    console.error("Error adding movie:", err);
    alert("Error adding movie. Please try again.");
  }
});

// Load All Movies from Database
async function loadMovies() {
  try {
    const response = await fetch(mongoDBUrl);
    const data = await response.json();

    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    data.movies.forEach((movie, index) => {
      const li = document.createElement('li');
      li.textContent = `Movie ${index + 1}: ${movie.url}`;
      movieList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching movies:", err);
  }
}

// Initialize Movie List
loadMovies();
