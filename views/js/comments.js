$(function() {
    $.ajax({
        url: "/comments",
        method: "get"
    })
        .done(
            function (data) {
                data.forEach(function(comment) {
                    $(".comments").append(`
                        <article>
                    
                        <div>
                          ${comment.comment}<br> <br>
                        </div>
                        </article>
                    `);
                })
            }
        )
        .fail(
            function (err) {
                console.log(err.responseText);
            }
        )
  })