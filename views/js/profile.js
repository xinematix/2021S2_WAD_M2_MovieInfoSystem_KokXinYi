
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
