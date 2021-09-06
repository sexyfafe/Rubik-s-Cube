let camera_stream = null;
let media_recorder = null;
let blobs_recorded = [];

async function startCamera(){
    camera_stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = camera_stream;
}
startCamera()

function startRecording(){
    // set MIME type of recording as video/webm
    media_recorder = new MediaRecorder(camera_stream, { mimeType: 'video/webm' });

    // event : new recorded video blob available 
    media_recorder.addEventListener('dataavailable', function(e) {
        blobs_recorded.push(e.data);
    });

    // start recording with each recorded blob having 1 second video
    media_recorder.start(1000);
}


function stopRecording(){
    media_recorder.stop(); 
}

function uploadVideo(name){
    firebase.storage().ref(name).put(new Blob(blobs_recorded, { type: 'video/webm' })).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
    })
}

