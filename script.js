const KEY = "jnxKRbBeiq9yGsOPXw5y0tFXy85Uf9NVVj9ekuhFjG4";
const COUNT = 15;
const URL =
  "https://api.unsplash.com/photos/random/?client_id=" +
  KEY +
  "&count=" +
  COUNT;

let loaded = false;

const loader = document.querySelector("#loader");
const postsDiv = document.querySelector("#posts");

async function getPhotos() {
  loader.style.display = "block";
  loaded = false;
  const response = await fetch(URL);
  const result = await response.json();
  displayPhotos(result);
}

function displayPhotos(arr) {
  const fragment = document.createDocumentFragment();
  arr.forEach((object) => {
    const anchor = document.createElement("a");
    anchor.href = object.links.self;

    const img = document.createElement("img");
    img.src = object.urls.regular;

    anchor.append(img);
    fragment.append(anchor);
  });

  postsDiv.append(fragment);
  loader.style.display = "none";
  loaded = true;
}

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 100 &&
    loaded
  ) {
    getPhotos();
  }
});

getPhotos();
