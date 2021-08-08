// get the form
const registerForm  = document.getElementById("registerForm");
// set the onsubmit function callback
registerForm.onsubmit = function(e) {
    //prevent reload
    e.preventDefault();
    e.stopPropagation();
    // get the firstName input value
    const firstNameInput = document.getElementById("firstName").value;
    //print
    alert(firstNameInput)
};
