
class Camera {
    constructor() {
        this.cap = new cv.VideoCapture(cam_input);
        this.videoProcessing = new VideoProcessing()
        this.animation;
        this.phase = 0

        this.matrix = new MatrixCube();
        this.cubeValidator = new CubeValidator();
        this.stage1Config = new Stage1(this.matrix.getStates().slice())
        this.stage2Config = new Stage2(this.matrix.getStates().slice())
        this.stage3Config = new Stage3(this.matrix.getStates().slice())

        this.cube2d;
        this.canvas;
        this.context;

        this.contrast = 1;
        this.brightness = 0;

        this.currentFace = 0;

        this.state = [
            ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
            ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
            ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
            ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
            ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
            ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']];

        this.inicialize_Camera()
    }

    inicialize_Camera() {
        cv['onRuntimeInitialized'] = () => {
            this.video = document.getElementById("cam_input");

            this.canvas = document.getElementById('canvas2DCube');
            this.context = this.canvas.getContext("2d");

            this.cube2d = new Cube2D();

            this.start_Camera();
        }
    }

    start_Camera() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(_stream => {
                this.stream = _stream;
                this.video.srcObject = this.stream;
                this.video.play();
                this.streaming = true;
                this.src = new cv.Mat(this.video.height, this.video.width, cv.CV_8UC4);
                this.dst = new cv.Mat();
                this.trsf = new cv.Mat();
                this.videoProcessing.createMat();
                this.animation = new CameraAnimation(this.video.width, this.video.height);

                changeTheMessage(this.videoProcessing.getMessage());
                setTimeout(this.processVideo_Camera.bind(this), 0);
            })
            .catch(err => {
                console.log(`An error occurred: ${err}`)
                resetCamera();
            });
    }

    stop_Camera() {
        if (this.video) {
            this.video.pause();
            this.video.srcObject = null;
        }
        if (this.stream)
            this.stream.getVideoTracks()[0].stop();

        this.streaming = false;
        this.phase = 0
    }

    checkColorIsSaved() {
        let uid = window.localStorage.getItem("uid")

        var starCountRef = firebase.database().ref('users/' + uid + "/colors");

        starCountRef.on('value', (snapshot) => {
            let red = snapshot.val().RED;
            let blue = snapshot.val().BLUE;
            let white = snapshot.val().WHITE;
            let green = snapshot.val().GREEN;
            let orange = snapshot.val().ORANGE;
            let yellow = snapshot.val().YELLOW;
            let sliderLeft = snapshot.val().SLIDERLEFT;
            let sliderRight = snapshot.val().SLIDERRIGHT;

            if (red.length > 0) {
                this.phase = 1;

                document.getElementById("saveBtn").textContent = 'Save Face';
                document.getElementById("showFaces").style.display = "block";
                document.getElementById("showColor").style.display = "none";
                document.getElementById("sliderA").style.display = "none";
                document.getElementById("sliderB").style.display = "none";
                document.getElementById('undoBtn').style.display = "none";
                if(this.currentFace > 0) document.getElementById('deleteBtn').style.display = "block";
                else document.getElementById('deleteBtn').style.display = "none";

                this.videoProcessing.setColors(red, blue, white, green, orange, yellow)
                this.videoProcessing.setAllColors(red, blue, white, green, orange, yellow)

                this.contrast = parseInt(sliderRight)
                this.brightness = parseInt(sliderLeft)
            }
        });
    }

    saveFace() {
        if (this.phase == 0) {
            this.videoProcessing.adquireColor();

            changeTheMessage(this.videoProcessing.getMessage());

            if (this.videoProcessing.areColorsAdquired()) {
                document.getElementById("saveBtn").style.display = "none";
                document.getElementById("finalizeBtn").style.display = "block";
            }
        }
        else if (this.currentFace <= 5) {
            this.currentFace++;
            this.playAnimation(true);
        }
    }


    deleteFace() {
        if (this.phase == 0) {
            this.videoProcessing.resetColors();
            document.getElementById("saveBtn").style.display = "block";
            document.getElementById("finalizeBtn").style.display = "none";
            changeTheMessage(this.videoProcessing.getMessage());
        }
        else {
            switch (this.currentFace) {
                case 0:
                    this.state[this.currentFace] = ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'];
                    break;
                case 1:
                    this.state[this.currentFace] = ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'];
                    break;
                case 2:
                    this.state[3] = ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'];
                    break;
                case 3:
                    this.state[5] = ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'];
                    break;
                case 4:
                    this.state[2] = ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'];
                    break;
                case 5:
                    this.state[4] = ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'];
                    break;
            }

            if (this.currentFace > 0) {
                this.currentFace--;
                this.playAnimation(false);
            }

            if (this.currentFace == 0)
                document.getElementById('deleteBtn').style.display = "none";
        }
    }

    resetAllColors() {
        this.phase = 0;

        document.getElementById("showFaces").style.display = "none";
        document.getElementById("showColor").style.display = "block";
        document.getElementById('resetColorsBtn').style.display = "none";
        document.getElementById("sliderA").style.display = "block";
        document.getElementById("sliderB").style.display = "block";
        document.getElementById('undoBtn').style.display = "block";
        document.getElementById('deleteBtn').textContent = 'Reset';
        document.getElementById("saveBtn").textContent = 'Save Color';

        this.videoProcessing.resetColors();

        this.contrast = 1;
        this.brightness = 1;
        changeTheMessage(this.videoProcessing.getMessage());
    }

    finalize(){
        if(this.phase == 0){
            this.phase = 1;

            document.getElementById("saveBtn").style.display = "block";
            document.getElementById("showFaces").style.display = "block";
            document.getElementById("showColor").style.display = "none";
            document.getElementById("sliderA").style.display = "none";
            document.getElementById("sliderB").style.display = "none";
            document.getElementById('resetColorsBtn').style.display = "block";
            document.getElementById('undoBtn').style.display = "none";
            document.getElementById("finalizeBtn").style.display = "none";
            document.getElementById('deleteBtn').textContent = 'Delete Face'

            this.videoProcessing.submitColors()
        }
        else{
            this.matrix.setState(this.state);
            if(this.cubeValidator.validation(this.matrix.getStates(),this.stage1Config,this.stage2Config,this.stage3Config)){
                sessionStorage.setItem("matrixState", this.matrix.getStateInText())
                document.location.href = "index.html";
            }
            else changeTheMessage("The cube is not valid! Check if the faces are correctly implemented.");
        }
    }

    draw2D() {
        this.context.strokeStyle = "#000000";

        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight / 1.7;

        this.cube2d.createCube(100, 0, this.context.canvas.height * 0.075, this.state, 0.02);
    }

    clearLastColor() {
        this.videoProcessing.clearLastColor();
        changeTheMessage(this.videoProcessing.getMessage());

        document.getElementById("saveBtn").style.display = "block";
        document.getElementById("finalizeBtn").style.display = "none";
    }


    processVideo_Camera() {
        try {
            if (!this.streaming) {
                this.src.delete();
                this.dst.delete();
                this.trsf.delete();
                this.videoProcessing.delete();
                return;
            }

            let begin = Date.now();
            this.cap.read(this.src);
            cv.flip(this.src, this.src, 1);

            cv.cvtColor(this.src, this.dst, cv.COLOR_RGBA2RGB);
            cv.cvtColor(this.src, this.trsf, cv.COLOR_RGBA2RGB);

            this.videoProcessing.changeBrightness(this.dst, this.contrast, this.brightness)

            if (this.phase == 0) {
                this.videoProcessing.adquireColorInstante(this.dst, 300, 220, 3);
            }

            if (this.phase == 0)
                cv.rectangle(this.dst, new cv.Point(300, 220), new cv.Point(303, 223),
                    new cv.Scalar(0, 0, 0), 2);
            else {
                this.videoProcessing.imageToGray(this.trsf)
                this.videoProcessing.canny(this.trsf)
                this.videoProcessing.operations(this.trsf)
                this.videoProcessing.findContours(this.trsf, this.dst)
                switch (this.currentFace) {
                    case 0:
                        this.state[this.currentFace] = this.videoProcessing.getState()
                        break;
                    case 1:
                        this.state[this.currentFace] = this.videoProcessing.getState()
                        break;
                    case 2:
                        this.state[3] = this.videoProcessing.getState()
                        break;
                    case 3:
                        this.state[5] = this.videoProcessing.getState()
                        break;
                    case 4:
                        this.state[2] = this.videoProcessing.getState()
                        break;
                    case 5:
                        this.state[4] = this.videoProcessing.getState()
                        break;
                }
                this.draw2D()
            }

            cv.imshow("canvas_output", this.dst);
            let delay = 1000 / this.FPS - (Date.now() - begin);

            setTimeout(this.processVideo_Camera.bind(this), delay);
        } catch (e) {
            console.log(e);
            resetCamera();
        }
    }

    playAnimation(forward) {
        this.animation.playAnimation(this.currentFace)
        if (this.phase != 0 && this.animation) {
            switch (this.currentFace) {
                case 0:
                    if (!forward)
                        this.animation.playAnimation(2);
                    break;
                case 1:
                    forward ? this.animation.playAnimation(1) : this.animation.playAnimation(4);
                    break;
                case 2:
                    forward ? this.animation.playAnimation(3) : this.animation.playAnimation(4);
                    break;
                case 3:
                    forward ? this.animation.playAnimation(3) : this.animation.playAnimation(4);
                    break;
                case 4:
                    forward ? this.animation.playAnimation(3) : this.animation.playAnimation(5);
                    break;
                case 5:
                    if (forward) 
                        this.animation.playAnimation(6)
                    break;
            }
        }
    }
}


function startCamera() {
    let camera = new Camera()

    const actionBtn = document.getElementById('actionBtn');
    const saveBtn = document.getElementById('saveBtn');
    const undoBtn = document.getElementById('undoBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const finalizeBtn = document.getElementById('finalizeBtn');
    const resetColorsBtn = document.getElementById('resetColorsBtn');

    const sliderA = document.getElementById("sliderA");
    const sliderB = document.getElementById("sliderB");

    changeTheMessage("Start the cube detection.");

    sliderA.oninput = function () {
        camera.contrast = parseInt(this.value)
    }

    sliderB.oninput = function () {
        camera.brightness = parseInt(this.value)
    }

    actionBtn.addEventListener('click', () => {

        if (camera.streaming) {
            camera.stop_Camera();
            saveBtn.style = "display: none;";
            sliderA.style = "display: none;";
            sliderB.style = "display: none;";
            deleteBtn.style = "display: none;";
            finalizeBtn.style = "display: none;";
            undoBtn.style = "display: none;";
            resetColorsBtn.style = "display: none;";
            actionBtn.textContent = 'Start';
            changeTheMessage("Start the cube detection.");
        }

        else {
            camera.start_Camera();
            actionBtn.textContent = 'Stop';
            saveBtn.style = "";
            sliderA.style = "";
            sliderB.style = "";
            undoBtn.style = "";
            saveBtn.textContent = 'Save Color';
            deleteBtn.textContent = 'Reset';
        }
    });

    camera.checkColorIsSaved()

    saveBtn.addEventListener('click', () => {
        if (camera.currentFace == 5)
            finalizeBtn.style = "";

        camera.saveFace();

        camera.phase == 0 ? saveBtn.textContent = 'Save Color' : saveBtn.textContent = 'Save Face';
        camera.phase == 0 || camera.currentFace == 0 ? deleteBtn.textContent = 'Reset' : deleteBtn.textContent = 'Delete Face';
        camera.phase != 0 && camera.currentFace == 0 ? deleteBtn.style = "display: none" : deleteBtn.style = "display: block";
    });

    deleteBtn.addEventListener('click', () => {
        if (camera.currentFace == 6) finalizeBtn.style = "display: none;";
        camera.deleteFace();

        camera.phase == 0 ? saveBtn.textContent = 'Save Color' : saveBtn.textContent = 'Save Face';
        camera.phase == 0 || camera.currentFace == 0 ? deleteBtn.textContent = 'Reset' : deleteBtn.textContent = 'Delete Face';
    });

    resetColorsBtn.addEventListener('click', () => {
        camera.resetAllColors()
    });

    undoBtn.addEventListener('click', () => {
        if (camera.phase == 0)
            camera.clearLastColor();

    });

    finalizeBtn.addEventListener('click', () => {
        camera.finalize();
    });
}

function resetCamera() {

    const actionBtn = document.getElementById('actionBtn');
    const saveBtn = document.getElementById('saveBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const finalizeBtn = document.getElementById('finalizeBtn');

    const sliderA = document.getElementById("sliderA");
    const sliderB = document.getElementById("sliderB");

    saveBtn.style = "display: none;";
    sliderA.style = "display: none;";
    sliderB.style = "display: none;";
    deleteBtn.style = "display: none;";
    finalizeBtn.style = "display: none;";
    actionBtn.textContent = 'Stop';

    changeTheMessage("An error has occurred. Please restart the cube detection.");
}

function changeTheMessage(newMessage) {
    const message = document.getElementById("message");
    message.textContent = newMessage;
}

function resetAllColor() {
    document.getElementById("redColorShow").style.backgroundColor = "";

    document.getElementById("blueColorShow").style.backgroundColor = "";

    document.getElementById("whiteColorShow").style.backgroundColor = "";

    document.getElementById("greenColorShow").style.backgroundColor = "";

    document.getElementById("yellowColorShow").style.backgroundColor = "";

    document.getElementById("orangeColorShow").style.backgroundColor = "";
}
