
$(function() {
    const api_key = "api_key=95efee1e5cec02671e7e3c3d11b4065c"
    const baseURL = "https://api.themoviedb.org/3/movie/";
    var api_url = baseURL + "popular?" + api_key;
    const searchURL = 'https://api.themoviedb.org/3/search/movie?'+api_key;

    const form =  document.getElementById('form');
    const search = document.getElementById('search');
    
    $.getJSON( api_url, function( data ) {
        $.each( data.results, function( i, item ) {
            var posterFullUrl = "https://image.tmdb.org/t/p/w185//" + item.poster_path;
            $("<div class='movie-card'><img src='" + posterFullUrl + "'><h3>" + item.title + "</h3></div>").appendTo(".movies");
            
        });
        
    });
    
    
    getMovies(api_url);

function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);       
        
    })

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
  
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(api_url);
    }

})

})