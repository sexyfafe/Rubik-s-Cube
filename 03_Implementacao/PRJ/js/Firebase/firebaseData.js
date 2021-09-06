function getBestClassifications(limit, tableName){
    var starCountRef = firebase.database().ref('classifications/Validated/').orderByKey();
    let uid = window.localStorage.getItem("uid")

    starCountRef.on('value', (snapshot) => {
        let cont = 1;

        resetTable(tableName);
        snapshot.forEach((childSnapshot) => {
          if(cont <= limit){
            var time = childSnapshot.val().time;
            var username = childSnapshot.val().username;
            var videoName = "video" + cont
            var videoURL = childSnapshot.val().videoRef

            let isUser = (childSnapshot.val().UID == uid)? true : false;

            addToTable(tableName, cont, time, username, isUser, videoName, videoURL);
            cont++;
          }
        });
      });
}

function getClassificationsFromUser(){
  var starCountRef = firebase.database().ref('classifications/Validated/').orderByKey();
  let uid = window.localStorage.getItem("uid")

  starCountRef.on('value', (snapshot) => {
      let cont = 1;

      resetTable("rankingTable");
      snapshot.forEach((childSnapshot) => {

          if(childSnapshot.val().UID == uid){
              var time = childSnapshot.val().time;
              var username = childSnapshot.val().username;
              var videoName = "video" + cont
            var videoURL = childSnapshot.val().videoRef
              addToTable("rankingTable", cont, time, username, false, videoName, videoURL);   
          }
          cont++;
      });
    });
}

function getUsernameFromUID(database, documentIdToSet){
  if(window.localStorage.getItem("username") == null){
    let uid = window.localStorage.getItem("uid")
    if(uid != null){
      var starCountRef = database.ref('users/' + uid);
      starCountRef.once('value', (snapshot) => {  
        window.localStorage.setItem("username", snapshot.val().username)
  
          document.getElementById(documentIdToSet).innerHTML = snapshot.val().username;
        });
      }
  }
  else{
    document.getElementById(documentIdToSet).innerHTML = window.localStorage.getItem("username");  
  }
  
}
  
function resetTable(topNode){
    const myNode = document.getElementById(topNode);

    while (myNode.firstChild) 
        myNode.removeChild(myNode.lastChild);
}

function submitResult(){
    var timeValue = document.getElementById("cronometer_value").innerHTML;

    let resultValue = timeToMilli(timeValue);

    var starCountRef = firebase.database().ref('users/');
 
    starCountRef.once('value', (snapshot) => {
      
        snapshot.forEach((childSnapshot) => {
          if(childSnapshot.val().UID == firebase.auth().currentUser.uid){
              let videoReference = firebase.auth().currentUser.uid + new Date().getTime();
              uploadVideo(videoReference)
              firebase.database().ref('classifications/notValidated/' + resultValue).set({
                UID: firebase.auth().currentUser.uid,
                username: childSnapshot.val().username,
                time: timeValue,
                videoRef: videoReference
              });
              resetTimer();
          }
        });
      });  
}

function timeToMilli(timeValue){
    let values = timeValue.split(":");

    let min = values[0];
    let sec = values[1];
    let mili = values[2];

    let resultValue = (min * 60000) + (sec * 1000) + mili;
    
    return resultValue;
}

function getUnvalidatedVideos(){
  var starCountRef = firebase.database().ref('classifications/notValidated/');
  let cont = 1;
  starCountRef.on('value', (snapshot) => {

      resetTable("videoValidationTable");
      snapshot.forEach((childSnapshot) => {

        var time = childSnapshot.val().time;
        var username = childSnapshot.val().username;
        var videoURL = childSnapshot.val().videoRef;
        addToTableVideo("videoValidationTable", time, username, "video" + cont, videoURL); 
        cont++;
      });
    });
}


function submitColors(red, blue, white, green, yellow, orange, sliderRight, sliderLeft){
  let uid = window.localStorage.getItem("uid")

  firebase.database().ref('users/' + uid + "/colors").set({
    RED : red,
    BLUE : blue,
    WHITE : white,
    GREEN : green,
    ORANGE : orange,
    YELLOW : yellow,
    SLIDERRIGHT : sliderRight,
    SLIDERLEFT : sliderLeft
  });
}


