const api_key = "api_key=95efee1e5cec02671e7e3c3d11b4065c"
const baseURL = "https://api.themoviedb.org/3/movie";
var api_url = baseURL + "/popular?" + api_key;
const searchURL = 'https://api.themoviedb.org/3/search/movie?' + api_key;
// const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');

getMovies(api_url);

function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(data.results);
        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        } 
    })
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(item => {
        const {title, poster_path, id} = item;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        var posterFullUrl = "https://image.tmdb.org/t/p/w185//" + poster_path;
        movieEl.innerHTML = `<img src="${posterFullUrl}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
            </div>
                <button class="know-more" id="${id}" onclick="location.href='/${id}' ">Know More</button>`
        main.appendChild(movieEl);
        document.getElementById(id).addEventListener('click', () => {
          console.log(id);
          openNav(item);
        });
    })
}


//movie info
const overlayContent = document.getElementById('overlay-content');
function openNav(item) {
  let id = item.id;
  fetch(baseURL + '/' + id+'/videos?'+api_key).then(res => res.json()).then(videoData => {
    console.log(videoData);
    if(videoData){
      document.getElementById("myNav").style.width = "100%";
      if(videoData.results.length > 0){
        var content = `<p>Movie Title: ${item.original_title}</p>
        <p>Description</p>
        <p>${item.overview}</p>
        <br/>`
        overlayContent.innerHTML = content;
      }else{
        overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
      }
    }
  })
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(api_url);
    }
});