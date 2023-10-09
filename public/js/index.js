const firebaseConfig = {
  apiKey: "AIzaSyAn9lRd9JO3kLc2vXAljeRmncae337qCUY",
  authDomain: "cpeg470-tournament.firebaseapp.com",
  projectId: "cpeg470-tournament",
  storageBucket: "cpeg470-tournament.appspot.com",
  messagingSenderId: "795525484702",
  appId: "1:795525484702:web:4773cfa317f9993a22ab8f",
  databaseURL: "https://cpeg470-tournament-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

function showContactPopup() {
    hideLoginPopup();
    hideSignupPopup();
    hideResetPassPopup();
    document.getElementById("contact-popup").style.display = "block";
    console.log("contact popup shown");
}

function hideContactPopup() {
    document.getElementById("contact-popup").style.display = "none";
    console.log("contact popup hidden");
}

function showLoginPopup() {
    hideContactPopup();
    hideSignupPopup();
    hideResetPassPopup();
    document.getElementById("login-popup").style.display = "block";
    console.log("login popup shown");
}

function hideLoginPopup() {
    document.getElementById("login-popup").style.display = "none";
    console.log("login popup hidden");
}

function showSignupPopup() {
    hideLoginPopup();
    hideContactPopup();
    hideResetPassPopup();
    document.getElementById("signup-popup").style.display = "block";
    console.log("signup popup shown");
}

function hideSignupPopup() {
    document.getElementById("signup-popup").style.display = "none";
    console.log("signup popup hidden");
}

function showResetPassPopup() {
    hideLoginPopup();
    hideSignupPopup();
    hideContactPopup();
    document.getElementById("resetPass-popup").style.display = "block";
    console.log("reset pass popup shown");
}

function hideResetPassPopup() {
    document.getElementById("resetPass-popup").style.display = "none";
    console.log("reset pass popup hidden");
}

function showLogoutButton() {
    document.getElementById("header-button-3").innerHTML = "";
    document.getElementById("header-button-2").innerHTML = "<button id='logout-button' class='header-button' onClick='logout()'>Log Out</button>";
    console.log("logout button shown");
}

function showLoginButton() {
    document.getElementById("header-button-2").innerHTML = "<button id='<button id='signup-button' class='header-button' onClick='showSignupPopup()'>Sign Up</button>";
    document.getElementById("header-button-3").innerHTML = "<button id='login-button' class='header-button' onClick='showLoginPopup()'>Log In</button>";
    console.log("login button shown");
}

function validateContactForm() {
    var passed = false;
    let user_fname = document.getElementById("user_fname").value;
    let user_lname = document.getElementById("user_lname").value;
    let user_email = document.getElementById("user_email").value;
    let user_phone = document.getElementById("user_phone").value;
    let user_message = document.getElementById("user_message").value;
    var phoneRegex = /^([0-9]{3})-([0-9]{3})-([0-9]{4})$/;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var errorMessage = "";
    if (user_fname == "") {
        errorMessage = "Please enter your first name";
    } else if (user_lname == "") {
        errorMessage = "Please enter your last name";
    } else if (user_email == "") {
        errorMessage = "Please enter your email";
    } else if (user_phone == "") {
        errorMessage = "Please enter your phone";
    } else if (user_message == "") {
        errorMessage = "Please enter a message";
    } else if (phoneRegex.test(user_phone) == false) {
        errorMessage = "Invalid phone number";
    } else if (!(emailRegex.test(user_email))) {
        errorMessage = "Invalid email";
    } else {
        passed = true;
        hideContactPopup();
    }
    setContactError(errorMessage);
    console.log("passed " + passed);
    console.log("validate user_email: " + user_email);
    return passed;
}

function validateSignupForm() {
    var passed = false;
    let user_fname = document.getElementById("signup_fname").value;
    let user_lname = document.getElementById("signup_lname").value;
    let user_email = document.getElementById("signup_email").value;
    let user_phone = document.getElementById("signup_phone").value;
    let user_password = document.getElementById("signup_password").value;
    let user_password_con = document.getElementById("signup_password_con").value;
    var phoneRegex = /^([0-9]{3})-([0-9]{3})-([0-9]{4})$/;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var errorMessage = "";
    if (user_fname == "") {
        errorMessage = "Please enter your first name";
    } else if (user_lname == "") {
        errorMessage = "Please enter your last name";
    } else if (user_email == "") {
        errorMessage = "Please enter your email";
    } else if (user_phone == "") {
        errorMessage = "Please enter your phone";
    } else if (!(phoneRegex.test(user_phone))) {
        errorMessage = "Invalid phone number";
    } else if (!(emailRegex.test(user_email))) {
        errorMessage = "Invalid email";
    } else if (!(user_password == user_password_con)) {
        errorMessage = "Passwords do not match";
    } else {
        passed = true;
        hideSignupPopup();
    }
    setSignupError(errorMessage);
    console.log("passed " + passed);
    return passed;
}

function validateLoginForm() {
    var passed = false;
    let user_email = document.getElementById("login-email").value;
    let user_password = document.getElementById("login-password").value;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var errorMessage = "";
    if (user_email == "") {
        errorMessage = "Please enter your email";
    } else if(!(emailRegex.test(user_email))) {
        errorMessage = "Invalid email";
    } else {
        passed = true;
        hideLoginPopup();
    }
    setLoginError(errorMessage);
    console.log("passed " + passed);
    return passed;
}

function validateResetPassForm() {
    var passed = false;
    let user_email = document.getElementById("resetPass-email").value;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var errorMessage = "";
    if (user_email == "") {
        errorMessage = "Please enter your email";
    } else if(!(emailRegex.test(user_email))) {
        errorMessage = "Invalid email";
    } else {
        passed = true;
        hideResetPassPopup();
    }
    setResetPassError(errorMessage);
    console.log("passed " + passed);
    return passed;
}

function setContactError(errorMessage) {
    document.getElementById("contactFormError").innerHTML = errorMessage;
}

function setSignupError(errorMessage) {
    document.getElementById("signupFormError").innerHTML = errorMessage;
}

function setLoginError(errorMessage) {
    document.getElementById("loginFormError").innerHTML = errorMessage;
}

function setResetPassError(errorMessage) {
    document.getElementById("resetPassError").innerHTML = errorMessage;
}

emailjs.init('oI9cSzYQi-CbJD0OE');

window.onload = function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        if(validateContactForm()) {
            event.preventDefault();
            emailjs.sendForm('service_o0joyin', 'template_3pgmocg', this)
                .then(function() {
                        console.log('SUCCESS!');
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
            document.getElementById("user_message").value = "";
            hideContactPopup();
        }
    });
}
//Listening on a forever callback, if the title updates this runs again (the GET request++)
firebase.database().ref("/title").on("value", ss=>{
  document.querySelector("#title").innerHTML = ss.val() || "...";
});

//Updating the title directly in code the PUT request
function setTitle(title) {
    firebase.database().ref("/title").set(title);
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      firebase.database().ref("/users/" + user.uid + "/fname").on('value', snapshot => {
          let fname = snapshot.val();
          setTitle("Hello " + fname + "!");
          console.log("title set");
      });
      showLogoutButton();
  } else {
      // User is signed out
      showLoginButton();
      setTitle("Hello, please log in or sign up!");
  }
});

document.getElementById('resetPassForm').addEventListener('submit', function(event) {
    resetPass();
    hideResetPassPopup();
});

function resetPass() {
    let userEmail = document.getElementById("resetPass-email").value;
    firebase.auth().sendPasswordResetEmail(userEmail);
/*
    firebase.auth().generatePasswordResetLink(userEmail)
        .then((link) => {
            // Construct password reset email template, embed the link and send
            // using custom SMTP server.
            return sendCustomPasswordResetEmail(userEmail, userEmail, link);
        })
        .catch((error) => {
            // Some error occurred.
    });
*/
}

function logout() {
    firebase.auth().signOut();
    showLoginButton();
}

document.getElementById('signupForm').addEventListener('submit', function(event) {
    signup();
});

function signup() {
    if(validateSignupForm()) {
        var email = document.getElementById("signup_email").value;
        var password = document.getElementById("signup_password").value;
        var fname = document.getElementById("signup_fname").value;
        var lname = document.getElementById("signup_lname").value;
        var phone = document.getElementById("signup_phone").value;
        console.log("email: " + email + " pass: " + password);
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log("signed up");
                firebase.database().ref("/users/" + user.uid).set({"email": email, "fname": fname, "lname": lname, "phone": phone});    
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    login();
});

function login() {
    if(validateLoginForm()) {
        var email = document.getElementById("login-email").value;
        var password = document.getElementById("login-password").value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                console.log("signed in");
                var user = userCredential.user;
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
}
/*
function loginGoogle () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        });
}
*/
//pushing data into the DB like a POST request
//firebase.database().ref("/collectionorsomething").push({"hi":"there"});

//deleting data
//firebase.database().ref("/killthis").remove();
