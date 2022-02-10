let movie_id = location.pathname;
console.log(movie_id);

const imgPoster =  document.querySelector('.movie-poster');
const movieTitle =  document.querySelector('.movie-name');
const movieGenres =  document.querySelector('.genres');
const desc =  document.querySelector('.movie-desc');
const rating = document.querySelector('.rating');

const api_key = "api_key=95efee1e5cec02671e7e3c3d11b4065c"
const baseURL = "https://api.themoviedb.org/3/movie";
const basePosterUrl = "https://image.tmdb.org/t/p/w185//";

//Fetch movie details from movie ID 
fetch(baseURL +movie_id+'?'+api_key).then(res => res.json()).then(videoData => {
    console.log(videoData);
    if(videoData){
        const {original_title, poster_path, id, release_date, genres, overview, vote_average} = videoData;
        var posterFullUrl = basePosterUrl + poster_path;

        //Display movie details from API URL
        movieTitle.innerHTML = original_title;
        desc.innerHTML = overview;
        imgPoster.innerHTML = `<img src="${posterFullUrl}" alt="${original_title}">`;
        //Display each genre
        for (var i=0; i<genres.length; i++) {
            movieGenres.innerHTML += genres[i].name + "  "; 
        }
        rating.innerHTML = vote_average + " / 10";
    }
  })
