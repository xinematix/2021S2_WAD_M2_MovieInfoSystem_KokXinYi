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

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("ratingBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function addUserRating() {

    var rating = $("#rating").val() + "/10";
    console.log(rating);
    var userRating = {
        movieid: movie_id.slice(1),
        rating: rating,

    };

    $.ajax({
        url: "/rating?token="+sessionStorage.authToken,
        method:"POST",
        data: userRating
    })
    .done(function(data){
        $(".statusMessage").text(data);
        setTimeout(function(){
            location.reload();
        },3000);
    })
    .fail(function(err){
        $(".statusMessage").text("Unable to add this rating");
        
    })
    return false;
}


function addToFavourites() {

    var userFavourites = {
        movieid: movie_id.slice(1),

    };

    $.ajax({
        url: "/favourites?token="+sessionStorage.authToken,
        method:"POST",
        data: userFavourites
    })
    .done(function(data){
        alert(data);
        setTimeout(function(){
            location.reload();
        },3000);
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        // $(".statusMessage").text("Unable to add this rating");
        console.log("Unable to add this rating. Error: " + errorThrown);
    })
    return false;
}

