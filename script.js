// Replace with your own NewsAPI key if available
const API_KEY = "YOUR_NEWS_API_KEY"; // get one free from https://newsapi.org/
const container = document.getElementById("newsContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// Fetch news articles
async function fetchNews(query = "technology") {
  container.innerHTML = "<p>Loading news...</p>";

  try {
    const url = `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=9&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      displayNews(data.articles);
    } else {
      container.innerHTML = "<p>No news found.</p>";
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    container.innerHTML = "<p>Failed to load news. Please check your connection.</p>";
  }
}

// Display news in cards
function displayNews(articles) {
  container.innerHTML = "";
  articles.forEach(article => {
    const card = document.createElement("div");
    card.classList.add("news-card");

    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/300x180?text=No+Image'}" alt="News image">
      <div class="content">
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More →</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Event listener for search
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  fetchNews(query || "latest");
});

// Fetch default news on page load
fetchNews();
