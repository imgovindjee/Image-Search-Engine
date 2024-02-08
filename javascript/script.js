// SOURCE:- https://unsplash.com/documentation#search-photos
// Access Key
const accessKey = "2bRJyFHbQzBNuTK5WLvNct7GJdGS17f5mzm-9YpNYs8";


const serach_form = document.getElementById("form-box");
const search_box = document.getElementById("search-box");
const search_result = document.getElementById("search-result");
const more_btn_img = document.getElementById("show-more-btn");


let keyword = "";
let page = 1;
// function that helps in the Search Images
async function searchImages() {
    keyword = search_box.value;

    // API url and data Fetching....
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(url);

    const data = await response.json(); // converting data to an Object through json()
    // console.log(data); // Diplay for the API DATA for response...


    // BUG CASE...
    // if the Page is full don't Diplay more over Their
    if (page === 1) {
        search_result.innerHTML = "";
    }

    const results = data.results;
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        search_result.appendChild(imageLink);
    });


    more_btn_img.style.display = "block";
}



// EVENT-LISTENER on the Page... 
serach_form.addEventListener("submit", (element) => {
    element.preventDefault();
    page = 1;
    searchImages();
})



// EVENT-LISTENR on the more_image_btn...
more_btn_img.addEventListener("click", () => {
    page++;
    searchImages();
})