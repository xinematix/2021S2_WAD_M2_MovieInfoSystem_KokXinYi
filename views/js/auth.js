$(function() {
    var token = sessionStorage.authToken;
    var username = sessionStorage.username;
  
    if(token==undefined) {
      $(".login-success").hide();
      $(".beforeLogin").show();
    } else {  // show the protected section
        $(".login-success").show();
        
        $(".beforeLogin").hide();
    }
  
    if(username) {
      $("#loggedIn-user").text(username);
      // $("#loggedIn-user").click(function(){
      //   this.href="/profile/"+username;
      // });

    }
  
    $(".logoutBtn").click(function(){
      $.ajax({
          url: "/logout?token="+sessionStorage.authToken,
          method:"get"
      })
      .done(function(data){
          sessionStorage.removeItem("authToken");
          location.reload();
          // location.href = "/";
      })
      .fail(function(err){
          console.log(err.responseText);
      })
  });
  
});
  
  function login() {  // This function is to be put OUTSIDE the $(document).ready() codes
    var credentials = {
          // get values from the username and password textboxes
        username: $("#username").val(),
        password: $("#password").val()
    }
    $.ajax({  // we make a connection to our login web API to perform a login request
        url:"/login",
        method:"post",
        data:credentials
    })
    .done(function(data){ // if response indicates a successful login
        $(".statusMessage").text(data.message);
  
      //stores the token returned from the server, if successful login
        sessionStorage.authToken=data.token; 
        sessionStorage.username = data.username;
        location.href = "/";
        
  
    })
    .fail(function(err){ // if response indicates an unsuccessful login
        $(".statusMessage").text(err.responseText);
    })
    return false;
  }

  function register() {
    var newUser = {
        email: $("#email").val(),
        username: $("#username").val(),
        password: $("#password").val()
    }
    $.ajax({
        url: "/register",
        method: "post",
        data: newUser
    })
    .done(function(data){
        $(".statusMessage").text(data);
    })
    .fail(function (err){
        $(".statusMessage").text(err);
    })
    return false;
}