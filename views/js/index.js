$(function() {

    const api_key = "api_key=95efee1e5cec02671e7e3c3d11b4065c"
    const baseURL = "https://api.themoviedb.org/3/movie/";
    var api_url = baseURL + "popular?" + api_key;

    $.getJSON( api_url, function( data ) {

        $.each( data.results, function( i, item ) {
            var posterFullUrl = "https://image.tmdb.org/t/p/w185//" + item.poster_path;
            $("<div class='movie-card'><img src='" + posterFullUrl + "'><h3>" + item.title + "</h3></div>").appendTo(".movies");
        });
    });


})