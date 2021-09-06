

function firebaseCheckIfUserIsLoggedIn(auth, redirect){
    auth.onAuthStateChanged(function(user) {
        if (!user) {
            window.location.replace(redirect);
        } 
        else
            checkUserRole()
      });
}

function checkUserRole(){
    let uid = window.localStorage.getItem("uid")
    var starCountRef = firebase.database().ref('users/').child(uid);
    
    starCountRef.once('value', (snapshot) => {
        if(snapshot.val().permission == "admin"){
            document.getElementById("validateVideosBtn").style.display = "block";
        }
    });
}

function firebaseCreateUserEmailAndPassword(){

    if(!registerFormValidator())
        return false;

    var usernameValue = document.getElementById("username").value ;
    var email = document.getElementById("email").value ;
    var password = document.getElementById("password").value ;

    var auth = firebase.auth();
    var database = firebase.database();

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            createUser(usernameValue, database);
          })
        .catch(e => console.log(e.message));

    return true;
}

function firebaseSingIn(emailValue, passwordValue){

    auth.signInWithEmailAndPassword(emailValue, passwordValue)
        .then((userCredential) => {
            window.localStorage.setItem('uid', userCredential.user.uid);
            window.location.href = "index.html";
        })
        .catch((error) => {
            document.getElementById("loginAlert").innerHTML = "Invalid username or password!";
        });  

}


function firebaseIsUserLoggedIn(){
    var emailValue = document.getElementById("email").value ;
    var passwordValue = document.getElementById("password").value ;

    var auth = firebase.auth();

    auth.signInWithEmailAndPassword(emailValue, passwordValue)
        .then((userCredential) => {
            window.localStorage.setItem('uid', userCredential.user.uid);
            window.location.href = "index.html";
        })
        .catch((error) => {
            document.getElementById("loginAlert").innerHTML = "Invalid username or password!";
        });   
}

function createUser(username, databaseRef){
    let uid = firebase.auth().currentUser.uid;

    databaseRef.ref('users/' + uid).set({
        username: username,
        UID : uid
    }).then(function() {
        window.localStorage.setItem('uid', uid);
        window.location.href = "index.html";
    })
}

function firebaseLogout(){
    //Clearing local storage
    window.localStorage.clear();

    firebase.auth().signOut();
}