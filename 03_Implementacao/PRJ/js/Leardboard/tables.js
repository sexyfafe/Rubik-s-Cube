function addToTable(topNode, classification, time, username, isUser , videoNameElement, videoURL){
    const table = document.getElementById(topNode);

    var rowNode = document.createElement("tr");

    var colorOfTextIfUserIsSignIn = "red";
    
    var cellNodeClass = document.createElement("td");
    var styleClassification = document.createElement('span');
    styleClassification.style.color = isUser? colorOfTextIfUserIsSignIn : "white";
    styleClassification.style.fontWeight  = isUser? "bold" : "normal";
    var textClassification = document.createTextNode(classification);
    styleClassification.appendChild(textClassification);
    cellNodeClass.appendChild(styleClassification);


    var cellNodeTime = document.createElement("td");
    var styleTime = document.createElement('span');
    styleTime.style.color = isUser? colorOfTextIfUserIsSignIn : "white";
    styleTime.style.fontWeight  = isUser? "bold" : "normal";
    var textTime = document.createTextNode(time);
    styleTime.appendChild(textTime);
    cellNodeTime.appendChild(styleTime);

    var cellNodeUsername = document.createElement("td");
    var styleUsername = document.createElement('span');
    styleUsername.style.color = isUser? colorOfTextIfUserIsSignIn : "white";
    styleUsername.style.fontWeight  = isUser? "bold" : "normal";
    var textUsername = document.createTextNode(username);
    styleUsername.appendChild(textUsername);
    cellNodeUsername.appendChild(styleUsername);

    var cellNodeHideOrShow = document.createElement("td");
    var buttonHideOrShow = document.createElement("button");
    buttonHideOrShow.innerHTML = "Show";
    buttonHideOrShow.className = "btn btn-primary btn-lg"
    buttonHideOrShow.setAttribute("id", videoNameElement + "BTN");
    buttonHideOrShow.setAttribute("onClick", "onClickHideOrShowVideo('" + videoURL + "', '" + videoNameElement + "' )");
    cellNodeHideOrShow.appendChild(buttonHideOrShow);

    rowNode.appendChild(cellNodeClass);
    rowNode.appendChild(cellNodeTime);
    rowNode.appendChild(cellNodeUsername);
    rowNode.appendChild(cellNodeHideOrShow);

    table.appendChild(rowNode);

    var rowVideo = document.createElement("tr");
    rowVideo.setAttribute("id", videoNameElement + "ROW");
    rowVideo.style.display = "none";

    var cellNodeVideo = document.createElement("td");
    cellNodeVideo.setAttribute("colspan", "4");

    var video = document.createElement('video');
    video.setAttribute("controls", "controls");
    video.className = "center"
    video.setAttribute("id", videoNameElement);
    
    
    cellNodeVideo.appendChild(video);
    rowVideo.appendChild(cellNodeVideo);

    table.appendChild(rowVideo);
}


function addToTableVideo(topNode, time, username, videoNameElement, videoURL){
    const table = document.getElementById(topNode);
  
    var rowNode = document.createElement("tr");
  
    var cellNodeTime = document.createElement("td");
    var textTime = document.createTextNode(time);
    var styleTime = document.createElement('span');
    styleTime.style.color = "white";
    styleTime.appendChild(textTime);
    cellNodeTime.appendChild(styleTime);
  
    var cellNodeUsername = document.createElement("td");
    var textUsername = document.createTextNode(username);
    var styleUsername = document.createElement('span');
    styleUsername.style.color = "white";
    styleUsername.appendChild(textUsername);
    cellNodeUsername.appendChild(styleUsername);
  
    var cellNodeVideo = document.createElement("td");
    var video = document.createElement('video');
    video.setAttribute("id", videoNameElement);
    video.setAttribute("controls", "controls");
    video.width = 350;
    video.height = 200;
    cellNodeVideo.appendChild(video);
  
    var cellNodeValidate = document.createElement("td");
    var buttonValidate = document.createElement("button");
    buttonValidate.innerHTML = "Validate";
    buttonValidate.className = "btn btn-primary btn-lg"
    buttonValidate.setAttribute("onClick", "onClickValidate('" + timeToMilli(time) + "')");
    cellNodeValidate.appendChild(buttonValidate);
  
    var cellNodeDelete = document.createElement("td");
    var buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "Delete";
    buttonDelete.className = "btn btn-primary btn-lg"
    buttonDelete.setAttribute("onClick", "onClickDelete('" + timeToMilli(time) + "')");
    cellNodeDelete.appendChild(buttonDelete);
  
    rowNode.appendChild(cellNodeTime);
    rowNode.appendChild(cellNodeUsername);
    rowNode.appendChild(cellNodeVideo);
  
    rowNode.appendChild(cellNodeValidate);
    rowNode.appendChild(cellNodeDelete);
  
    table.appendChild(rowNode);
  
    loadVideo(videoURL, videoNameElement)
  }


  function onClickHideOrShowVideo(videoURL, videoName){
     var state = document.getElementById(videoName + "BTN").innerHTML;

     if(state == "Show")
        showVideo(videoURL, videoName) 
    else
        hideVideo(videoName)    
  }

  function hideVideo(videoName){
      console.log(videoName)
        document.getElementById(videoName + "BTN").innerHTML = "Show";
        document.getElementById(videoName + "ROW").style.display = "none";
  }

  function showVideo(videoURL, videoName){
        document.getElementById(videoName + "BTN").innerHTML = "Hide";
        document.getElementById(videoName + "ROW").style.display = "";

        loadVideo(videoURL, videoName)
  }


  function onClickValidate(keyRef){
    var starCountRef = firebase.database().ref('classifications/notValidated/').child(keyRef);

    starCountRef.once('value', (snapshot) => {
        var uid = snapshot.val().UID;
        var time = snapshot.val().time;
        var username = snapshot.val().username;
        var videoURL = snapshot.val().videoRef;
        var key = timeToMilli(time);

        submitValidated(key, uid, time, username, videoURL)
      });
}

function submitValidated(key, UID, time, username, videoRef){
    firebase.database().ref('classifications/Validated/' + key).set({
      UID: UID,
      username: username,
      time: time,
      videoRef: videoRef
    });
    deleteNotValidated(key);
}

function deleteNotValidated(key){
  firebase.database().ref('classifications/notValidated/').child(key).remove();
}

function onClickDelete(keyRef){
  deleteNotValidated(keyRef)
}

function loadVideo(videoName, videoElementName){
    let storageRef = firebase.storage();
  
    storageRef.ref().child(videoName).getDownloadURL().then(function(url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;
            var url = URL.createObjectURL(blob);
            insertVideoOnElement(url, videoElementName)
        };
  
        xhr.open('GET', url);
        xhr.send();
    }).catch(function(error) {
      // Handle any errors
    });
  
  }
  
  function insertVideoOnElement(url, videoElementName){
    console.log("Aqui -> " + url + " | " + videoElementName)
    var video = document.getElementById(videoElementName);
    video.src = url;
    video.load();
  }