const accesskey = "qameLVKcBvSLhDXzbF5_M87FpoQJ2Hz8bXcvwYRmnd0";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });

  console.log(data);

  if (data.total_pages > page) {
    showMoreBtn.style.display = "block";
  } else {
    showMoreBtn.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchResult.innerHTML = ""; // Clear previous results
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
