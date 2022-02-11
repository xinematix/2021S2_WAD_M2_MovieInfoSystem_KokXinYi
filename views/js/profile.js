
var editProfile = document.querySelector(".edit-profile");
var changePassword = document.querySelector(".changePassword");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");

option1.addEventListener("click", function(){
  editProfile.style.display = "block";
  changePassword.style.display = "none";
})

option2.addEventListener("click", function(){
  editProfile.style.display = "none";
  changePassword.style.display = "block";
})

function updateProfile() {
    var userProfile = {
        name: $("#name").val(),
        gender: $("#gender").val(),
        birthDate: $("#dob").val(),
        email: $("#email").val(),
    };

    $.ajax({
        url:"/profile?token="+sessionStorage.authToken,
        method:"PUT",
        data: userProfile
    })
    .done(function(data){
        $(".statusMessage").text(data);
        setTimeout(function(){
            location.reload();
        },3000);
    })
    .fail(function(err){
        $(".statusMessage").text("Unable to add new event");
    })
    return false;
}