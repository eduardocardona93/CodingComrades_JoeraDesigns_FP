/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}
  
/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
function logOutCurrentUser() {
    localStorage.removeItem('currentUser');
    location.href="index.html";
}

if(localStorage && localStorage.getItem('currentUser')){
    document.getElementById("loggedUserControls").style.display = "block";
    document.getElementById("notLoggedControls").style.display = "none";
}else{
    document.getElementById("loggedUserControls").style.display = "none";
    document.getElementById("notLoggedControls").style.display = "block";
}