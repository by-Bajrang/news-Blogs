const apiKey = "de62a64e978a4f2d821dfc8f517db802";
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news ", error);
    return [];
  }
}

searchButton.addEventListener('click', async () => {
    const query = searchField.value.trim()
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }catch(error){
            console.error("Error fetching news by query", error);
        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles;
      } catch (error) {
        console.error("Error fetching random news ", error);
        return [];
      }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage || "images/default.jpg";
    img.alt = article.title;
    const title = document.createElement("h2");
    // title.textContent = article.title;
    const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30)+ "..." : article.title; 
    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    // description.textContent = article.description;
    const truncatedDescription = article.description.length > 120 ? article.description.slice(0,120)+ "...." : article.description; 
    description.textContent= truncatedDescription;

    // ab img , title , description ko blogCard me add kro
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener('click',()=>{
        window.open(article.url,"_black");
    })
    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news ", error);
  }
})();
