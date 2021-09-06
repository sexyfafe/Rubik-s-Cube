let firebaseDatabase = null;
let isTimeRunning = false;

const timer = document.getElementById('cronometer_value');

var mili = 0;
var min = 0;
var sec = 0;
var timeToIncrement = 10;
var stoptime = true;

function main(){
    setPressListerners()   
    resetTimer()
}


function setPressListerners(){
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 32){
            onSpacePress()
        }
    });
}

function onSpacePress(){
    if(isTimeRunning)
        stopTimer();
    else
        startTimer();
}


function startTimer() {
    isTimeRunning = !isTimeRunning
    startRecording()
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}

function stopTimer() {
    isTimeRunning = !isTimeRunning
    stopRecording()
    document.getElementById("submitResult").style.display = "block";
    document.getElementById("clear").style.display = "block";
    
    if (stoptime == false) {
        stoptime = true;
    }
}

function timerCycle() {
    if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        mili = parseInt(mili);

        mili = mili + timeToIncrement;

        if(mili == 1000){
            sec = sec + 1
            mili = 0
        }

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }

        if (min == 60) {
            min = 0;
            sec = 0;
        }
 
        if (mili < 100) 
            mili = '0' + mili;

        if (sec < 10 || sec == 0) 
            sec = '0' + sec;
        

        if (min < 10 || min == 0) 
            min = '0' + min;
        
        

        timer.innerHTML = min + ':' + sec + ':' + mili;

        setTimeout("timerCycle()", timeToIncrement);
  }
}

function resetTimer() {
    document.getElementById("submitResult").style.display = "none";
    document.getElementById("clear").style.display = "none";
    timer.innerHTML = '00:00:00';
    mili = 0;
    min = 0;
    sec = 0;
    timeToIncrement = 10;
    stoptime = true;
}

main()



