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

document.addEventListener("DOMContentLoaded", function(){
    if (
        "IntersectionObserver" in window &&
        "IntersectionObserverEntry" in window &&
        "intersectionRatio" in window.IntersectionObserverEntry.prototype
    ) {
        let observer = new IntersectionObserver(entries => {
            if (entries[0].boundingClientRect.y < 0) {
                document.getElementById('big-text-container').style.position = 'fixed';
                document.getElementById('big-text-container').style.top = '90px';
                document.getElementById('floating-card').style.position = 'fixed';
                document.getElementById('floating-card').style.top = '75px';
            } else {
            }
        });
        observer.observe(document.querySelector("#top-of-site-pixel-anchor"));
    }
});
function getFname(uid) {
    return new Promise((resolve) => {
        firebase.database().ref("/users/" + uid + "/fname").once('value', snapshot => {
            let fname = snapshot.val();
            resolve(fname);
        });
    });
}

function getLname(uid) {
    return new Promise((resolve) => {
        firebase.database().ref("/users/" + uid + "/lname").once('value', snapshot => {
            let lname = snapshot.val();
            resolve(lname);
        });
    });
}

function getEmail(uid) {
    return new Promise((resolve) => {
        firebase.database().ref("/users/" + uid + "/email").once('value', snapshot => {
            let email = snapshot.val();
            resolve(email);
        });
    });
}

function getPhone(uid) {
    return new Promise((resolve) => {
        firebase.database().ref("/users/" + uid + "/phone").once('value', snapshot => {
            let phone = snapshot.val();
            resolve(phone);
        });
    });
}

async function renderProfile() {
    console.log("hit renderProfile");
    let htmlStr = "";
    if(firebase.auth().currentUser) {
        let uid = firebase.auth().currentUser.uid;
//        let username = '';
        const fname = await getFname(uid);
        const lname = await getLname(uid);
        const email = await getEmail(uid);
        const phone = await getPhone(uid);
        htmlStr += `<div class="profile-content">
                        <h1 class="profile-text">Your Profile<h1>
                        <p class="profile-small-text">First Name: ${fname}</p>
                        <p class="profile-small-text">Last Name: ${lname}</p>
                        <p class="profile-small-text">Email: ${email}</p>
                        <p class="profile-small-text">Phone: ${phone}</p>
                        <button class="profile-button" onClick="logout()">Logout</button>
                    </div>`;
    } else {
        htmlStr += `<div class="profile-content">
                        <form class="profile-login" id="loginForm" name="loginForm" onsubmit="return false;">
                            <div class="form-group">
                                <input name="login-email" type="email" class="form-control" id="login-email" placeholder="Enter Email">
                                <br>
                                <input class="form-control" id="login-password" name="login-password" type="text" placeholder="Password">
                                <p class="button-as-hyperlink" onclick="showResetPassPopup()">Forgot your password?</p>
                            </div>
                        </form>
                        <p class="formError" id="loginFormError"></p>
                        <button class="profile-button" onClick="login()">Log in</button>
                        <h1 class="profile-text">or</h1>
                            <form class="profile-login" id="signupForm" name="signupForm" onsubmit="return false;">
                                <div class="form-group">
                                    <input class="form-control" id="signup_fname" name="signup_fname" type="text" placeholder="Enter First Name">
                                    <br>
                                    <input class="form-control" id="signup_lname" name="signup_lname" type="text" placeholder="Enter Last Name">
                                    <br>
                                    <input name="signup_email" type="email" class="form-control" id="signup_email" placeholder="Enter Email">
                                    <br>
                                    <input class="form-control" id="signup_phone" name="signup_phone" type="text" placeholder="123-456-7890">
                                    <br>
                                    <input class="form-control" id="signup_password" name="signup_password" type="text" placeholder="Password">
                                    <br>
                                    <input class="form-control" id="signup_password_con" name="signup_password_con" type="text" placeholder="Password">
                                </div>
                            </form>
                            <p class="formError" id="signupFormError"></p>
                        <button class="profile-button" onClick="signup()">Sign up</button>
                    </div>`;
    }
    htmlStr += "<div id='contact-button' class='header-bottom-profile'><i class='fa-solid fa-user'></i></div>";
    document.getElementById('profile-window').innerHTML = htmlStr;
}
function showContactPopup() {
    hideResetPassPopup();
    document.getElementById("contact-popup").style.display = "block";
    console.log("contact popup shown");
}

function hideContactPopup() {
    document.getElementById("contact-popup").style.display = "none";
    console.log("contact popup hidden");
}

function showResetPassPopup() {
    hideContactPopup();
    document.getElementById("resetPass-popup").style.display = "block";
    console.log("reset pass popup shown");
}

function hideResetPassPopup() {
    document.getElementById("resetPass-popup").style.display = "none";
    console.log("reset pass popup hidden");
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

firebase.auth().onAuthStateChanged((user) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('type')=='view'){
        renderPage('viewTour', urlParams.get('tour_name'), urlParams.get('uid'));
    } else if (urlParams.get('type')=='join') {
        renderPage('joinTour', urlParams.get('tour_name'), urlParams.get('uid'));
    } else {
        if (user) {
            renderPage('logged-in-home', '');
        } else {
            renderPage('logged-out-home', '');
        }
    }
    renderProfile();
});

function generateViewLink(uid, tour_name) {
    const myUrl = new URL('https://cpeg470-tournament.web.app/');
    myUrl.searchParams.append("type", "view");
    myUrl.searchParams.append('uid', uid);
    myUrl.searchParams.append('tour_name', tour_name);
    return myUrl.href;
}

async function copyViewLink(tour_name, uid) {
    await navigator.clipboard.writeText(generateViewLink(uid, tour_name));
}

function generateJoinLink(uid, tour_name) {
    const myUrl = new URL('https://cpeg470-tournament.web.app/');
    myUrl.searchParams.append("type", "join");
    myUrl.searchParams.append('uid', uid);
    myUrl.searchParams.append('tour_name', tour_name);
    return myUrl.href;
}

async function copyJoinLink(tour_name, uid) {
    await navigator.clipboard.writeText(generateJoinLink(uid, tour_name));
}

function renderPage(pageId, tour_name, uid) {
    console.log("rendering page: " + pageId);
    if(pageId == 'logged-in-home') {
        renderLoggedInHome();
    } else if (pageId == 'logged-out-home') {
        renderLoggedOutHome();
    } else if (pageId == 'tour') {
        renderTour(tour_name);
    } else if (pageId == 'home') {
        if(firebase.auth().currentUser) {
            renderLoggedInHome();
        } else {
            renderLoggedOutHome();
        }
    } else if (pageId == 'viewTour') {
        renderTourView(tour_name, uid);
    } else if (pageId == 'joinTour') {
        renderTourJoin(tour_name, uid);
    }
}

function alreadyHere(uid, tour_name, new_uid) {
    console.log("inside already here");
    return new Promise((resolve) => {
        var here = false;
        firebase.database().ref("/tournaments/" + uid + "/" + tour_name + "/round1/" + new_uid).once('value', snapshot => {
            if(snapshot.val()) {
                here = true;
            }
            console.log("already here: " + here);
            resolve(here);
        });
    });
}

async function renderTourJoin(tour_name, uid) {
    if(firebase.auth().currentUser) {
        //insert username into uid
        let new_uid = firebase.auth().currentUser.uid;
        const here = await alreadyHere(uid, tour_name, new_uid);
        if(!here) {
            const fname = await getFname(new_uid);
            const numParts = await helperGetNumParticipants(tour_name, uid);
            let newNum = parseInt(numParts)+1;
            firebase.database().ref("/tournaments/" + uid + "/" + tour_name + "/numParticipants").set(newNum);
            firebase.database().ref("/tournaments/" + uid + "/" + tour_name + "/round1/" + new_uid + "/name").set(fname);
            firebase.database().ref("/tournaments/" + uid + "/" + tour_name + "/round1/" + new_uid + "/win").set('false');
        } else {
            console.log("you are already in this bracket");
        }
        renderPage('viewTour', tour_name, uid);
    } else {
        //force log in then call renderTourJoin
        document.getElementById('page').innerHTML = "<h1 class='floating-card-text'>Please log in to join.</h1>";
        renderTourJoin(tour_name, uid);
    }
}

async function renderTourView(tour_name, uid) {
    console.log("inside tour view");
    const numParts = await helperGetNumParticipants(tour_name, uid);
    const public = await helperGetPublic(tour_name, uid);
    const canView = await helperGetCanView(tour_name, uid);
    let htmlStr = `<div class='floating-card-top'>
                       <div class="tour-header-container">
                           <h1 class="tour-header">${tour_name}</h1>
                       </div>
                       <button class="tour-button-right" onclick="copyViewLink('${tour_name}', '${uid}')">Share Tournament</button>
                       <div id='tournament-bracket' class='tournament-bracket'>`;
    for(let i=1; i<(Math.ceil(Math.sqrt(numParts+1)) + 2); i++) {
        console.log("inside out for loop");
        htmlStr += "<div class='bracket-column' id='bracket-column-" + i + "'><ul>";
        const round = await helperGetRound(tour_name, uid, i);
        if(round[0]) {
            console.log("round: " + round);
            const keys = await helperGetKeys(tour_name, uid, i);
            let participants = [];
            let wins = [];
            for(let j=0; j<round.length; j++) {
                if(round[j] == "true" || round[j] == "false") {
                    wins.push(round[j]);
                } else {
                    participants.push(round[j]);
                }
            }
            let matchIdNum = 1;
            for(let j=0; j<participants.length-2; j=j+2) {
                htmlStr = htmlStr + `<li class='bracket-item'>
                                         <div class='bracket-match' id='bracket-match-${matchIdNum}'>
                                             <div class='match-left' id='match-${matchIdNum}-left'>
                                                 <h1 class='match-text' id='match-${matchIdNum}-left-text'>${participants[j]}</h1>
                                             </div>
                                             <div class='match-right' id='match-${matchIdNum}-right'>
                                                 <h1 class='match-text' id='match-${matchIdNum}-right-text'>${participants[j+1]}</h1>
                                             </div>
                                         </div>
                                     </li>`;
                matchIdNum++;
            }
            if(participants.length % 2 == 0) {
                htmlStr = htmlStr + `<li class='bracket-item'>
                                         <div class='bracket-match' id='bracket-match-" + matchIdNum + "'>
                                             <div class='match-left' id='match-${matchIdNum}-left'>
                                                 <h1 class='match-text' id='match-${matchIdNum}-left-text'>${participants[participants.length-2]}</h1>
                                             </div>
                                             <div class='match-right' id='match-${matchIdNum}-right'>
                                                 <h1 class='match-text' id='match-${matchIdNum}-right-text'>${participants[participants.length-1]}</h1>
                                             </div>
                                         </div>
                                     </li>`;
            } else if(participants.length == 1) {
                console.log("hit length = 1");
                    htmlStr = htmlStr + `<li class='bracket-item'>
                                             <div class='bracket-match' id='bracket-match-" + matchIdNum + "'>
                                                 <div class='match-solo' id='match-${matchIdNum}-solo'>
                                                     <h1 class='match-text-solo'>${participants[participants.length-1]}</h1>
                                                 </div>
                                             </div>
                                         </li>`;
            } else {
                if(wins[participants.length-1] == "true") {
                    htmlStr = htmlStr + `<li class='bracket-item'>
                                             <div class='bracket-match' id='bracket-match-" + matchIdNum + "'>
                                                 <div class='match-solo' id='match-${matchIdNum}-solo'>
                                                     <h1 class='match-text-solo'>${participants[participants.length-1]}</h1>
                                                 </div>
                                             </div>
                                         </li>`;
                }
            }
            matchIdNum++;
            htmlStr = htmlStr + "</ul></div>";
        }
    }
    htmlStr = htmlStr + "</div></div></div>";
    document.getElementById('page').innerHTML = htmlStr;
}

function helperGetCanView(tour_name, uid) {
    return new Promise((resolve) => {
        firebase.database().ref("/tournaments/" + uid + "/" + tour_name + "/canView").once('value', snapshot => {
            let canView = [];
            snapshot.forEach(function(childSnapshot) {
                canView.push(childSnapshot.val());
            });
            resolve(canView);
        });
    });
}

function helperGetNumParticipants(tour_name, uid) {
    console.log("inside getNumParts");
    return new Promise((resolve) => {
        firebase.database().ref("/tournaments/" + uid + "/" + tour_name + "/numParticipants").once('value', snapshot => {
            resolve(snapshot.val());
        });
    });
}

function helperGetPublic(tour_name, uid) {
    return new Promise((resolve) => {
        firebase.database().ref("/tournaments/" + uid + "/" + tour_name + "/public").once('value', snapshot => {
            resolve(snapshot.val());
        });
    });
}


function helperGetRound(tour_name, uid, round) {
    console.log("getRound: " + round);
    return new Promise((resolve) => {
        firebase.database().ref("/tournaments/" + uid + "/" + tour_name + "/round" + round).once('value', snapshot => {
            let round = [];
            snapshot.forEach(function(childSnapshot) {
                childSnapshot.forEach(function(childSnapshot) {
                    round.push(childSnapshot.val());
                });
            });
            resolve(round);
        });
    });
}

function helperGetKeys(tour_name, uid, round) {
    return new Promise((resolve) => {
        firebase.database().ref("/tournaments/" + uid + "/" + tour_name + "/round" + round).once('value', snapshot => {
            let keys = [];
            snapshot.forEach(function(childSnapshot) {
                keys.push(childSnapshot.key);
            });
            resolve(keys);
        });
    });
}

async function renderLoggedOutHome() {
    var htmlStr = `<div class="big-text-container" id="big-text-container">
                       <h1 class="big-text" id="big-text">Get your bracket on.</h1>
                   </div>
                   <div class="floating-card" id="floating-card">
                       <p class="floating-card-text">Check out these public tournaments, or sign up to create your own</p>
                       <div class="public-tour-menu" id="logged-out-tour-menu">
                           <div class="public-menu-header">
                               <p class="public-menu-name">Tournament Name</p>
                               <p class="public-menu-owner">Owner</p>
                           </div>
                       <div class="public-menu-scrollable">`;
    const allPublicTour = await getAllPublicTour();
    for(let i=0; i<allPublicTour.length; i=i+2) {
        const fname = await getFname(allPublicTour[i]);
        htmlStr += `<div class="public-menu-item" onclick="renderPage('viewTour', '${allPublicTour[i+1]}', '${allPublicTour[i]}')">
                        <p class="public-menu-item-name">${allPublicTour[i+1]}</p>
                        <p class="public-menu-item-owner">${fname}</p>
                    </div>`;
    }
    htmlStr += `</div></div></div>
                <div class="blank-card" id="blank-card"></div>`;
    document.getElementById('page').innerHTML = htmlStr;
    htmlStr = `<img src='https://firebasestorage.googleapis.com/v0/b/cpeg470-tournament.appspot.com/o/gaming.gif?alt=media&token=d6cdba5c-f35a-49d3-b595-4667d43fd8a1' class='gaming-gif'>`;
    document.getElementById('backgroundImg').innerHTML = htmlStr;
}

async function renderLoggedInHome() {
    console.log('renderLoggedInHome()');
    let uid = firebase.auth().currentUser.uid;
    console.log(uid);
    var htmlStr = "";
    const fname = await getFname(uid);
    htmlStr = `<div class="floating-card-top" id="logged-in-home">
                   <div class="big-text-container-top">
                       <h1 id="title" class="big-text">Hello, ${fname}</h1>
                   </div>
                   <div class="public-tour-menu-logged" id="logged-in-tour-menu">
                       <div class="public-menu-header">
                           <p class="public-menu-name">Tournament Name</p>
                           <p class="public-menu-owner">Owner</p>
                       </div>
                       <div class="public-menu-scrollable">`;
    const allMyTour = await returnAllMyTour(uid);
    for(let i=0; i<allMyTour.length; i++) {
        htmlStr += `<div class="public-menu-item" onclick="renderPage('tour', '${allMyTour[i]}')">
                        <p class="public-menu-item-name">${allMyTour[i]}</p>
                        <p class="public-menu-item-owner">${fname}</p>
                    </div>`;
    }
    htmlStr += "<button class='menu-button' id='createPresetTour' onClick='renderPresetTourPopup()'>+</button></div></div></div>";
    console.log(htmlStr);
    document.getElementById("page").innerHTML = htmlStr;
}

function getAllPublicTour() {
    console.log("hit allMyTour");
    return new Promise((resolve) => {
        firebase.database().ref("/tournaments").once('value', snapshot => {
            let allPublicTour = [];
            snapshot.forEach((childSnapshot) => {
                allPublicTour.push(childSnapshot.key);
                childSnapshot.forEach(function(childSnapshot) {
                    allPublicTour.push(childSnapshot.key);
                });
            });
            resolve(allPublicTour);
        });
    });
}


function returnAllMyTour(uid) {
    console.log("hit allMyTour");
    return new Promise((resolve) => {
        firebase.database().ref("/tournaments/" + uid).once('value', snapshot => {
            let allMyTour = [];
            snapshot.forEach(function(childSnapshot) {
                allMyTour.push(childSnapshot.key);
            });
            resolve(allMyTour);
        });
    });
}

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
        firebase.database().ref("/tournaments/"+ uid + "/" + tour_name).set({"public": public, "numParticipants" : numPresetParts, "canView": {0:"ignore"}});
    } else {
        firebase.database().ref("/tournaments/" + uid).set({tour_name: {"public": public, "numParticipants" : numPresetParts, "canView": {0:"ignore"}}}); 
    }
    for(i = 1; i<numPresetParts+1; i++) {
        firebase.database().ref("/tournaments/"+ uid + "/" + tour_name + "/round1/" + i + "/name").set(document.getElementById('preset-part-' + i).value);
        firebase.database().ref("/tournaments/"+ uid + "/" + tour_name + "/round1/" + i + "/win").set("false");
    }
    renderPage('tour', tour_name);
}

function renderTour(tour_name) {
    console.log("rendering tour: " + tour_name);
    let uid = firebase.auth().currentUser.uid;
    var participants = [];
    var wins = [];
    var keys = [];
    var htmlStr = `<div class="floating-card-top">
                       <div class="tour-header-container">
                           <h1 class="tour-header">${tour_name}</h1>
                       </div>
                       <button class="tour-button-right" onclick="copyViewLink('${tour_name}', '${uid}')">Share Tournament</button>
                       <button class="tour-button-left" onclick="copyJoinLink('${tour_name}', '${uid}')">Invite your friends to join!</button>
                       <div id='tournament-bracket' class='tournament-bracket'>`;
    var numParts = 0;
    var matchIdNum = 1;
    firebase.database().ref("/tournaments/" + uid + "/" + tour_name + "/numParticipants").on('value', snapshot => {
        numParts = snapshot.val();
        for(let i=1; i<(Math.ceil(Math.sqrt(numParts+1)) + 2); i++) {
            console.log("round " + i);
            firebase.database().ref("/tournaments/" + uid + "/" + tour_name + "/round" + i).on('value', snapshot => {
                if(snapshot.val()) {
                    htmlStr += "<div class='bracket-column' id='bracket-column-" + i + "'><ul>";
                    participants = [];
                    wins = [];
                    keys = [];
                    snapshot.forEach(function(childSnapshot) {
                        keys.push(childSnapshot.key);
                        childSnapshot.forEach(function(childSnapshot) {
                            if(childSnapshot.val() !== "true" && childSnapshot.val() !== "false") {
                                participants.push(childSnapshot.val());
                            } else {
                                wins.push(childSnapshot.val());
                            }
                        });
                    });
                    console.log("participants: " + participants);
                    console.log("wins: " + wins);
                    console.log("keys: " + keys);
                    for(let j=0; j<participants.length-2; j=j+2) {
                        if(wins[j] == "true" || wins[j+1] == "true") {
                            htmlStr = htmlStr + `<li class='bracket-item'>
                                                     <div class='bracket-match' id='bracket-match-${matchIdNum}'>
                                                         <div class='match-left' id='match-${matchIdNum}-left'>
                                                             <h1 class='match-text' id='match-${matchIdNum}-left-text'>${participants[j]}</h1>
                                                         </div>
                                                         <div class='match-right' id='match-${matchIdNum}-right'>                                        
                                                             <h1 class='match-text' id='match-${matchIdNum}-right-text'>${participants[j+1]}</h1>
                                                         </div>
                                                     </div>
                                                 </li>`;
                        } else {
                            htmlStr = htmlStr + `<li class='bracket-item'>
                                                     <div class='bracket-match' id='bracket-match-${matchIdNum}'>
                                                         <div class='match-left' id='match-${matchIdNum}-left' onclick="win('${participants[j]}', ${i}, '${keys[j]}', '${tour_name}', '${uid}')">
                                                             <h1 class='match-text' id='match-${matchIdNum}-left-text'>${participants[j]}</h1>
                                                         </div>
                                                         <div class='match-right' id='match-${matchIdNum}-right' onclick="win('${participants[j+1]}', ${i}, '${keys[j+1]}', '${tour_name}', '${uid}')">
                                                             <h1 class='match-text' id='match-${matchIdNum}-right-text'>${participants[j+1]}</h1>
                                                         </div>
                                                     </div>
                                                 </li>`;
                        }
                        matchIdNum++;
                    }
                    if(participants.length % 2 == 0) {
                        if(wins[participants.length-2] == "true" || wins[participants.length-1] == "true") {
                            htmlStr = htmlStr + `<li class='bracket-item'>
                                                     <div class='bracket-match' id='bracket-match-" + matchIdNum + "'>
                                                         <div class='match-left' id='match-${matchIdNum}-left'>       
                                                             <h1 class='match-text' id='match-${matchIdNum}-left-text'>${participants[participants.length-2]}</h1>
                                                         </div>
                                                         <div class='match-right' id='match-${matchIdNum}-right'>    
                                                             <h1 class='match-text' id='match-${matchIdNum}-right-text'>${participants[participants.length-1]}</h1>
                                                         </div>
                                                     </div>
                                                 </li>`;
                        } else {
                            htmlStr = htmlStr + `<li class='bracket-item'>
                                                     <div class='bracket-match' id='bracket-match-" + matchIdNum + "'>
                                                         <div class='match-left' id='match-${matchIdNum}-left' onclick="win('${participants[participants.length-2]}', ${i},'${keys[participants.length-2]}', '${tour_name}', '${uid}')">
                                                             <h1 class='match-text' id='match-${matchIdNum}-left-text'>${participants[participants.length-2]}</h1>
                                                         </div>
                                                         <div class='match-right' id='match-${matchIdNum}-right' onclick="win('${participants[participants.length-1]}', ${i}, '${keys[participants.length-1]}', '${tour_name}', '${uid}')">
                                                             <h1 class='match-text' id='match-${matchIdNum}-right-text'>${participants[participants.length-1]}</h1>
                                                         </div>
                                                     </div>
                                                 </li>`;
                        }
                    } else if(participants.length == 1) {
                        console.log("hit length = 1")
                        htmlStr = htmlStr + `<li class='bracket-item'>
                                                     <div class='bracket-match' id='bracket-match-" + matchIdNum + "'>
                                                         <div class='match-solo' id='match-${matchIdNum}-solo'>                                       
                                                             <h1 class='match-text-solo'>${participants[participants.length-1]}</h1>
                                                         </div>
                                                     </div>
                                                 </li>`;
                    } else {
                        if(wins[participants.length-1] == "true") {
                            htmlStr = htmlStr + `<li class='bracket-item'>
                                                     <div class='bracket-match' id='bracket-match-" + matchIdNum + "'>
                                                         <div class='match-solo' id='match-${matchIdNum}-solo'>                                                    
                                                             <h1 class='match-text-solo'>${participants[participants.length-1]}</h1>
                                                         </div>
                                                     </div>
                                                 </li>`;
                        } else {
                            htmlStr = htmlStr + `<li class='bracket-item'>
                                                     <div class='bracket-match' id='bracket-match-" + matchIdNum + "'>
                                                         <div class='match-solo' id='match-${matchIdNum}-solo' onclick="win('${participants[participants.length-1]}', ${i}, '${keys[participants.length-1]}', '${tour_name}', '${uid}')">
                                                             <h1 class='match-text-solo'>${participants[participants.length-1]}</h1>
                                                         </div>
                                                     </div>
                                                 </li>`;
                        }
                    }
                    matchIdNum++;
                    htmlStr = htmlStr + "</ul></div>";
                }
                console.log("i: " + i + " vs. " + (Math.ceil(Math.sqrt(numParts+1))+1));
                if(i == (Math.ceil(Math.sqrt(numParts+1))+1)) {
                    console.log("inside if");
                    htmlStr = htmlStr + "</div></div>";
                    document.getElementById('page').innerHTML = htmlStr;
                }
            });
        }
    });
}

function win(name, round, key, tour_name, uid) {
    firebase.database().ref("/tournaments/"+ uid + "/" + tour_name + "/round" + round + "/" + key + "/win").set("true");
    firebase.database().ref("/tournaments/"+ uid + "/" + tour_name + "/round" + (round+1) + "/" + key + "/name").set(name);
    firebase.database().ref("/tournaments/"+ uid + "/" + tour_name + "/round" + (round+1) + "/" + key + "/win").set("false");
    renderTour(tour_name);
}
