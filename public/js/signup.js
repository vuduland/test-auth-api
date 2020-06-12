$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var nameInput = $("input#name-input");
  var emailInput = $("input#new-email-input");
  var passwordInput = $("input#new-password-input");

  // When the signup button is clicked, we validate the name, email, and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.name || !userData.email || !userData.password) {
      return;
    }
    // If we have a name, email, and password, run the signUpUser function
    signUpUser(userData.name, userData.email, userData.password);
    nameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the intake form page
  // Otherwise we log any errors
  function signUpUser(name, email, password) {
    $.post("/api/signup", {
      name: name,
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace("/intakeform");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

// I'm not sure that after .then we should do window.location.replace("/individualprofile"). We have to hit /api/loginnew and also go through the intake form, THEN go to the profile which will be populated with data. I'm trying it here because this logic file should handle the redirect to that page rather than the /api-routes file or the login.js logic file.

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
