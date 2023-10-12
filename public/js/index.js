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

function renderTitle(user) {
    if(user) {
        firebase.database().ref("/users/" + user.uid + "/fname").on('value', snapshot => {
            let fname = snapshot.val();
            document.getElementById('title').innerHTML = "Hello " + fname + "!";
        });
    } else {
        document.getElementById('title').innerHTML = "Hello, please log in or sign up!";
    }
    console.log("title set");
}

function renderLoggedInHome(user) {
    console.log("render logged in home");
    let htmlStr = "<button id='createPresetTour' onClick='renderPresetTourPopup()'>Create a preset tournament</button>";
    document.getElementById("logged-in-home").innerHTML = htmlStr;
    console.log("render logged in home finished");
}

function hideLoggedInHome() {
    document.getElementById("logged-in-home").innerHTML = "";
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log("logged in");
      showLogoutButton();
      renderLoggedInHome(user);
      renderTour("test");
  } else {
      // User is signed out
      showLoginButton();
      hideLoggedInHome();
  }
    renderTitle(user);
});

document.getElementById('resetPassForm').addEventListener('submit', function(event) {
    resetPass();
    hideResetPassPopup();
});

function resetPass() {
    let userEmail = document.getElementById("resetPass-email").value;
    firebase.auth().sendPasswordResetEmail(userEmail);
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

var numPresetParts = 4;
function addPresetParticipantPopup() {
    numPresetParts += 1;
    renderPresetTourPopup();
}

function removePresetParticipantPopup() {
    numPresetParts -= 1;
    renderPresetTourPopup();
}

function renderPresetTourPopup() {
    htmlStr = "<label for='preset-name'>Tournament Name</label><br><input name='preset-name' type='text' class='form-control' id='preset-name' placeholder='Name'><br><label for='preset-public'>Public</label><br><input name='preset-public' id='preset-public' type='checkbox' class='form-control' checked><br>";
    for(i = 1; i<numPresetParts+1; i++) {
        htmlStr = htmlStr + "<br><label for='preset-part-" + i + "'>Participant " + i + "</label><br><input name='preset-part-" + i + "' id='preset-part-" + i + "' type='text' class='form-control' placeholder='Participant Name'>";
    }
    document.getElementById('presetTour-group').innerHTML = htmlStr;
    document.getElementById('createPresetTour-popup').style.display = 'block';
}

function hidePresetTourPopup() {
    document.getElementById('createPresetTour-popup').style.display = 'none';
}

function createPresetTour() {
    hidePresetTourPopup();
    let uid = firebase.auth().currentUser.uid;
    let tour_name = document.getElementById('preset-name').value;
    let public = document.getElementById('preset-public').value;
    if(firebase.database().ref("/tournaments/" + uid)) {
        firebase.database().ref("/tournaments/"+ uid + "/" + tour_name).set({"public": public, "numParticipants" : numPresetParts});
    } else {
        firebase.database().ref("/tournaments/" + uid).set({tour_name: {"public": public, "numParticipants" : numPresetParts}}); 
    }
    for(i = 1; i<numPresetParts+1; i++) {
        firebase.database().ref("/tournaments/"+ uid + "/" + tour_name + "/round1/" + i).set(document.getElementById('preset-part-' + i).value);
    }
}

function renderTour(tour_name) {
    console.log("rendering tour: " + tour_name);
    let uid = firebase.auth().currentUser.uid;
    var participants = [];
    var htmlStr = "";
    var numParts = 0;
    var matchIdNum = 1;
    firebase.database().ref("/tournaments/" + uid + "/" + tour_name + "/numParticipants").on('value', snapshot => {
        numParts = snapshot.val();
        for(let i=1; i<(Math.ceil(Math.sqrt(numParts+1)) + 1); i++) {
            console.log("round " + i);
            firebase.database().ref("/tournaments/" + uid + "/" + tour_name + "/round" + i).on('value', snapshot => {
                if(snapshot.val()) {
                    htmlStr += "<div class='bracket-column' id='bracket-column-" + i + "'><ul>"
                    console.log("this should not be undefined: " + snapshot.val());
                    var participants = [];
                    snapshot.forEach(function(childSnapshot) {
                        participants.push(childSnapshot.val());
                    });
                    for(let j=0; j<participants.length-2; j=j+2) {
                        htmlStr = htmlStr + `<li class='bracket-item'>
                                                 <div class='bracket-match' id='bracket-match-${matchIdNum}'>
                                                     <div class='match-left' id='match-${matchIdNum}-left' onclick="leftWin('match-${matchIdNum}', '${participants[j]}', ${i}, ${j+1}, '${tour_name}', '${uid}')">
                                                         <h1 class='match-text' id='match-${matchIdNum}-left-text'>${participants[j]}</h1>
                                                     </div>
                                                     <div class='match-right' id='match-${matchIdNum}-right' onclick="rightWin('match-${matchIdNum}', '${participants[j+1]}', ${i}, ${j+2}, '${tour_name}', '${uid}')">
                                                         <h1 class='match-text' id='match-${matchIdNum}-right-text'>${participants[j+1]}</h1>
                                                     </div>
                                                 </div>
                                             </li>`;
                        matchIdNum++;
                    }
                    if(participants.length % 2 == 0) {
                        htmlStr = htmlStr + `<li class='bracket-item'>
                                                 <div class='bracket-match' id='bracket-match-" + matchIdNum + "'>
                                                     <div class='match-left' id='match-${matchIdNum}-left' onclick="leftWin('match-${matchIdNum}', '${participants[participants.length-2]}', ${i}, ${participants.length-2}, '${tour_name}', '${uid}')">
                                                         <h1 class='match-text' id='match-${matchIdNum}-left-text'>${participants[participants.length-2]}</h1>
                                                     </div>
                                                     <div class='match-right' id='match-${matchIdNum}-right' onclick="rightWin('match-${matchIdNum}', '${participants[participants.length-1]}', ${i}, ${participants.length-1}, '${tour_name}', '${uid}')">
                                                         <h1 class='match-text' id='match-${matchIdNum}-right-text'>${participants[participants.length-1]}</h1>
                                                     </div>
                                                 </div>
                                             </li>`;
                    } else {
                        htmlStr = htmlStr + "<li class='bracket-item'><div class='bracket-match' id='bracket-match-" + matchIdNum + "'><div class='match-solo'><h1 class='match-text-solo'>" + participants[participants.length-1] + "</h1></div></div></li>";
                    }
                    matchIdNum++;
                    htmlStr = htmlStr + "</ul></div>";
                    document.getElementById('tournament-bracket').innerHTML = htmlStr;
/*
                    let matchHeight = document.getElementById('bracket-match-1').offsetHeight;
                    console.log("match-height" + matchHeight);
                    let heightStr = Math.ceil(((matchHeight*0.5) + (matchHeight*0.15)) * (i-1)).toString() + "px";
                    console.log("heightStr" + heightStr);
                    document.getElementById("bracket-column-" + i).style.top = heightStr;
*/
                }
            });
            console.log('end of for');
        }
    });
}

function rightWin(id, name, round, key, tour_name, uid) {
    console.log("rightWin: " + id);
    document.getElementById(id + '-right').style.backgroundColor = '#447241';
    document.getElementById(id + '-right-text').style.color = '#ffffff';
    document.getElementById(id + '-left').onclick = "";
    document.getElementById(id + '-right').onclick = "";
    firebase.database().ref("/tournaments/"+ uid + "/" + tour_name + "/round" + (round+1) + "/" + key).set(name);
}

function leftWin(id, name, round, key, tour_name, uid) {
    console.log("leftWin: " + id);
    document.getElementById(id + '-left').style.backgroundColor = '#447241';
    document.getElementById(id + '-left-text').style.color = '#ffffff';
    document.getElementById(id + '-left').onclick = "";
    document.getElementById(id + '-right').onclick = "";
//    firebase.database().ref("/tournaments/"+ uid + "/" + tour_name + "/round" + round + "/" + key + "/win").set("true");
//    firebase.database().ref("/tournaments/"+ uid + "/" + tour_name + "/round" + round + "/" + (key+1) + "/win").set("false");
    firebase.database().ref("/tournaments/"+ uid + "/" + tour_name + "/round" + (round+1) + "/" + key).set(name);
}

function hideTour() {
    document.getElementById('tournament-bracket').innerHTML = "";
}

//pushing data into the DB like a POST request
//firebase.database().ref("/collectionorsomething").push({"hi":"there"});

//deleting data
//firebase.database().ref("/killthis").remove();
