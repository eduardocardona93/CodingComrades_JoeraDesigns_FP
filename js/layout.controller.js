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
    document.querySelectorAll(".loggedUserControls").forEach(element => {
        element.style.display = "block";
    });
    document.querySelectorAll(".notLoggedControls").forEach(element => {
        element.style.display = "none";
    });
}else{
    document.querySelectorAll(".loggedUserControls").forEach(element => {
        element.style.display = "none";
    });
    document.querySelectorAll(".notLoggedControls").forEach(element => {
        element.style.display = "block";
    });
}