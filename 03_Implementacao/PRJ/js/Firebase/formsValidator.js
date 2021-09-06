

function registerFormValidator(){
    let usernameValue = document.forms["registerForm"]["username"].value;
    let passwordValue = document.forms["registerForm"]["password"].value;
    let passwordRepeatedValue = document.forms["registerForm"]["passwordRepeated"].value;


    if(usernameValue.length < 4){
        document.getElementById("registerWarning").innerHTML = "Username needs to 4 letters!";
        return false;
    }
        

    if(passwordValue.length < 6){
        document.getElementById("registerWarning").innerHTML = "Password needs to 6 letters!";
        return false;
    }

    if(passwordValue != passwordRepeatedValue){
        document.getElementById("registerWarning").innerHTML = "Passwords must match!";
        return false;
    }

    return true;
}