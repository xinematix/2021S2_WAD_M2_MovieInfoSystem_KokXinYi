$(function() {
    var urlParams = new URLSearchParams(window.location.search);
    eventId = urlParams.get('id');

    $.ajax({
        url: "/favourites/"+userId+"?token="+sessionStorage.authToken,
        method: "get"
    }).done(
        function (data) {
            data.forEach(function(event) {
                $(".events").append(`
                    <article>
                    <h2><a href="/edit?id=${event._id}">${event.name}</a></h2>
                    <div>
                        ${event.description}<br>
                        Start: ${event.start.date} ${event.start.time}<br>
                        End: ${event.end.date} ${event.end.time}<br>
                        Organized by: ${event.organizer.name} from ${event.organizer.company}<br>
                    </div>
                    </article>
                `);
            });
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );


});