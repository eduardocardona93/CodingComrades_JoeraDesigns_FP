
// wait for the DOM to be loaded
$(document).ready(function() {
    // bind 'myForm' and provide a simple callback function
    $('#registerForm').submit(function(e) {
        e.preventDefault();
        e.stopPropagation();
        alert("Thank you for your comment!");
        const firstNameInput = $('#firstName');
        const lastNameInput = $('#lastName');
        
    });
});