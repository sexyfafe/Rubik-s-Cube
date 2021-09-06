import {Cube3D} from './Graphics3D/cube3D.js'
main()
function main(){
    //Draw 2D Cube
    self.context = document.getElementById('canvas2DCube').getContext("2d");
    self.stepByStep = true
    self.shuffle=false
    self.play = true
    self.oneMove = false
    self.oneMoveBack = false
    self.matrixCube = new MatrixCube();

    if(sessionStorage.getItem("matrixState") != null){
        self.matrixCube.setStateInText(sessionStorage.getItem("matrixState"));
        sessionStorage.removeItem("matrixState")
    }


    self.stage1Config = new Stage1(self.matrixCube.getStates().slice())
    self.stage2Config = new Stage2(self.matrixCube.getStates().slice())
    self.stage3Config = new Stage3(self.matrixCube.getStates().slice())
    self.cube = new Cube3D(0, 0, 0, self.matrixCube);
    self.cube2d = new Cube2D();

    self.canvas = document.getElementById('canvas2DCube');
    self.canvas.addEventListener('click', function(e){
        if(self.cube.currentRotation === "") {
            self.cube.currentRotation += self.cube2d.mousePressedImage(e)

            let rotation = self.cube2d.mousePressCenterPiece(e);
            rotateAllCube(rotation)
        }
    }, false)

    animate();
    document.getElementById("ResolucaoAutomaticaTerceiraCamada").addEventListener("click", function(){
        if(self.cube.currentRotation === ""){
            self.cube.currentRotation = self.stage3Config.Complete(self.matrixCube.getStates().slice())
        }
    });
    document.getElementById("ResolucaoAutomaticaSegundaCamada").addEventListener("click", function(){
        if(self.cube.currentRotation === "") {
            self.cube.currentRotation = self.stage2Config.Complete(self.matrixCube.getStates().slice())
        }
    });

    document.getElementById("ResolucaoAutomaticaPrimeiraCamada").addEventListener("click", function(){
        if(self.cube.currentRotation === "") {
            self.cube.currentRotation = self.stage1Config.Complete(self.matrixCube.getStates().slice())
        }
    });

    document.getElementById("generateRandomRotation").addEventListener("click", function(){
        if(self.cube.currentRotation !== ""){
            self.cube.currentRotation = self.cube.currentRotation.slice(0, 2);
            self.cube.currentRotation += getRandomRotation(15)
        }else{
            self.cube.currentRotation = getRandomRotation(15)
        }
        self.shuffle = true
    });
    document.getElementById("SolveBack").addEventListener("click", function(){
        self.oneMoveBack=true
    });
    document.getElementById("SolveFront").addEventListener("click", function(){
        self.oneMove=true
    });
    document.getElementById("PlayStop").addEventListener("click", function(){
        self.play=!self.play
        if(self.play){
            document.getElementById("PlayStop").innerHTML  = "Stop"
            document.getElementById("SolveBack").style.display = "none";
            document.getElementById("SolveFront").style.display = "none";

        }else{
            document.getElementById("PlayStop").innerHTML  = "Play"
            document.getElementById("SolveBack").style.display = "";
            document.getElementById("SolveFront").style.display = "";


        }
    });
    document.getElementById("ResolucaoAutomaticaFase1").addEventListener("click", function(){
        if(self.cube.currentRotation === "") {
            self.cube.currentRotation = self.stage1Config.AutoCruz(self.matrixCube.getStates().slice())
        }
    });
    document.getElementById("ResolucaoAutomaticaFase2").addEventListener("click", function(){
        if(self.cube.currentRotation === "") {
            self.cube.currentRotation = self.stage1Config.AutoCorners(self.matrixCube.getStates().slice())
        }
    });
    document.getElementById("ResolucaoAutomaticaFase3").addEventListener("click", function(){
        if(self.cube.currentRotation === "") {
            self.cube.currentRotation = self.stage2Config.Complete(self.matrixCube.getStates().slice())
        }
    });
    document.getElementById("ResolucaoAutomaticaFase4").addEventListener("click", function(){
        if(self.cube.currentRotation === "") {
            self.cube.currentRotation = self.stage3Config.cruz(self.matrixCube.getStates().slice())
        }
    });
    document.getElementById("ResolucaoAutomaticaFase5").addEventListener("click", function(){
        if(self.cube.currentRotation === "") {
            self.cube.currentRotation = self.stage3Config.alinharCruz(self.matrixCube.getStates().slice())
        }
    });
    document.getElementById("ResolucaoAutomaticaFase6").addEventListener("click", function(){
        if(self.cube.currentRotation === "") {
            self.cube.currentRotation = self.stage3Config.cantoCorreto(self.matrixCube.getStates().slice())
        }
    });
    document.getElementById("ResolucaoAutomaticaFase7").addEventListener("click", function(){
        if(self.cube.currentRotation === "") {
            self.cube.currentRotation = self.stage3Config.rotateCorners(self.matrixCube.getStates().slice())
        }
    });
    document.getElementById("ResolucaoAutomatica").addEventListener("click", function(){
        if(self.cube.currentRotation === "") {
            self.cube.currentRotation = self.stage1Config.Complete(self.matrixCube.getStates().slice())
            self.cube.currentRotation += self.stage2Config.Complete(self.stage1Config.getEstado().slice())
            self.cube.currentRotation += self.stage3Config.Complete(self.stage2Config.getEstado().slice())
        }
    });
    document.getElementById("SolvingByStepOrLayer").addEventListener("click", function(){
        self.stepByStep=!self.stepByStep
        editSuggestion()
        if(self.stepByStep){
            document.getElementById("stepsButtons").style.display = "flex";
            document.getElementById("layersButtons").style.display = "none";


            document.getElementById("SolvingByStepOrLayer").innerHTML  = "Solving by Step"
        }else{
            document.getElementById("stepsButtons").style.display = "none";
            document.getElementById("layersButtons").style.display = "flex";

            document.getElementById("SolvingByStepOrLayer").innerHTML  = "Solving by Layer"

            //disableButton("ResolucaoAutomaticaFase1", "imageStep1", true)
        }
    });
}

function animate() {
    requestAnimationFrame(animate);
    if(self.cube.isFinnishRendering){
        document.getElementById('loaderContainer').style.display = "none";
        document.getElementById('navigationUser').style.display = "block";
        document.getElementById('navigation').style.display = "block";
        document.getElementById('mainBody').style.display = "flex";
        animate3D();
        draw2D();

    }
    else{
        document.getElementById('loaderContainer').style.display = "flex";
        document.getElementById('mainBody').style.display = "none";
        document.getElementById('navigation').style.display = "none";
        document.getElementById('navigationUser').style.display = "none";
    }
    
}

function animate3D(){
    if(self.cube.currentRotation !== ""&&(self.shuffle||self.play||self.oneMove)||self.oneMoveBack){
        if(self.cube.amountAlreadyRotated !== 90){
            if(self.oneMoveBack){
                checkRotation(self.cube.currentRotationBack.slice((self.cube.currentRotationBack.length-2), (self.cube.currentRotationBack.length)));
            }else {
                checkRotation(self.cube.currentRotation.slice(0, 2));
            }
            self.cube.amountAlreadyRotated += self.cube.rotationPerFrame;
        }
        else{
            if(self.oneMoveBack){
                self.oneMoveBack=false
                self.oneMove=false
                self.matrixCube.checkRotation(self.cube.currentRotationBack.slice((self.cube.currentRotationBack.length-2), (self.cube.currentRotationBack.length)));
                self.cube.currentRotation = invertRotation(self.cube.currentRotationBack.slice((self.cube.currentRotationBack.length-2), (self.cube.currentRotationBack.length)))+self.cube.currentRotation;
                self.cube.currentRotationBack=self.cube.currentRotationBack.slice(0, self.cube.currentRotationBack.length-2)
                self.cube.amountAlreadyRotated = 0;
            }else{
                self.oneMove=false
                self.matrixCube.checkRotation(self.cube.currentRotation.slice(0, 2));
                self.cube.currentRotationBack+=invertRotation(self.cube.currentRotation.slice(0, 2))
                self.cube.currentRotation = self.cube.currentRotation.slice(2);
                self.cube.amountAlreadyRotated = 0;
                if(self.cube.currentRotation === ""){
                    //get suggestion after shuffle
                    editSuggestion()
                    self.shuffle=false
                }
            }
        }
    }
}

function draw2D(){
    //Set the canvas size to the clientes values
    self.context.strokeStyle = "#000000";

    self.canvas.width = window.innerWidth / 3;
    self.canvas.height = window.innerHeight / 1.7;

    //Position on the screen on X and Y, state -> inicial state of the cube (colors)
    self.cube2d.createCube(100 , 20, self.context.canvas.height * 0.06, self.matrixCube.getStates(), 0.02);
    self.cube2d.drawCube(self.matrixCube.getStates());
}




function rotateAllCube(num){
    switch(num){
        case 0:
            self.cube.currentRotation = "F1"
            break;
        case 2:
            self.cube.currentRotation = "L2"
            break;
        case 3:
            self.cube.currentRotation = "L1"
            break;
        case 4:
            self.cube.currentRotation = "B1"
            break;
        case 5:
            self.cube.currentRotation = "L1L1"
            break;
    }
    self.shuffle = true
}



function disableOrEnableButton(buttonID, imageID, disableButton){
    if(disableButton){
        document.getElementById(buttonID).style.display = "none";
        document.getElementById(imageID).style.opacity = 0.5;
    }
    else{
        document.getElementById(buttonID).style.display = "block";
        document.getElementById(imageID).style.opacity = 1;  
    }
    
}
function disableall(){
    disableOrEnableButton("ResolucaoAutomaticaFase1", "imageStep1", true)
    disableOrEnableButton("ResolucaoAutomaticaFase2", "imageStep2", true)
    disableOrEnableButton("ResolucaoAutomaticaFase3", "imageStep3", true)
    disableOrEnableButton("ResolucaoAutomaticaFase4", "imageStep4", true)
    disableOrEnableButton("ResolucaoAutomaticaFase5", "imageStep5", true)
    disableOrEnableButton("ResolucaoAutomaticaFase6", "imageStep6", true)
    disableOrEnableButton("ResolucaoAutomaticaFase7", "imageStep7", true)
    disableOrEnableButton("ResolucaoAutomaticaPrimeiraCamada", "imageStep8", true)
    disableOrEnableButton("ResolucaoAutomaticaSegundaCamada", "imageStep9", true)
    disableOrEnableButton("ResolucaoAutomaticaTerceiraCamada", "imageStep10", true)
}
function editSuggestion(){

    disableall()
    let Suggestion = self.stage1Config.GetTip1(self.matrixCube.getStates().slice(),self.stepByStep)
    if(Suggestion===""){
        Suggestion = self.stage1Config.GetTip2(self.matrixCube.getStates().slice(),self.stepByStep)
    }else{
        document.getElementById("suggestion").innerHTML  = Suggestion
        disableOrEnableButton("ResolucaoAutomaticaFase1", "imageStep1", false)
        disableOrEnableButton("ResolucaoAutomaticaPrimeiraCamada", "imageStep8", false)
        return
    }
    if(Suggestion===""){
        Suggestion = self.stage2Config.GetTip(self.matrixCube.getStates().slice(),self.stepByStep)
    }else{
        document.getElementById("suggestion").innerHTML  = Suggestion
        disableOrEnableButton("ResolucaoAutomaticaFase2", "imageStep2", false)
        disableOrEnableButton("ResolucaoAutomaticaPrimeiraCamada", "imageStep8", false)
        return
    }
    if(Suggestion===""){
        Suggestion = self.stage3Config.GetTip1(self.matrixCube.getStates().slice(),self.stepByStep)
    }else{
        document.getElementById("suggestion").innerHTML  = Suggestion
        disableOrEnableButton("ResolucaoAutomaticaFase3", "imageStep3", false)
        disableOrEnableButton("ResolucaoAutomaticaSegundaCamada", "imageStep9", false)
        return
    }
    if(Suggestion===""){
        Suggestion = self.stage3Config.GetTip2(self.matrixCube.getStates().slice(),self.stepByStep)
    }else{
        document.getElementById("suggestion").innerHTML  = Suggestion
        disableOrEnableButton("ResolucaoAutomaticaFase4", "imageStep4", false)
        disableOrEnableButton("ResolucaoAutomaticaTerceiraCamada", "imageStep10", false)
        return
    }
    if(Suggestion===""){
        Suggestion = self.stage3Config.GetTip3(self.matrixCube.getStates().slice(),self.stepByStep)
    }else{
        document.getElementById("suggestion").innerHTML  = Suggestion
        disableOrEnableButton("ResolucaoAutomaticaFase5", "imageStep5", false)
        disableOrEnableButton("ResolucaoAutomaticaTerceiraCamada", "imageStep10", false)
        return
    }
    if(Suggestion===""){
        Suggestion = self.stage3Config.GetTip4(self.matrixCube.getStates().slice(),self.stepByStep)
    }else{
        document.getElementById("suggestion").innerHTML  = Suggestion
        disableOrEnableButton("ResolucaoAutomaticaFase6", "imageStep6", false)
        disableOrEnableButton("ResolucaoAutomaticaTerceiraCamada", "imageStep10", false)
        return
    }
    if(Suggestion===""){
        disableall()
    }else{
        document.getElementById("suggestion").innerHTML  = Suggestion
        disableOrEnableButton("ResolucaoAutomaticaFase7", "imageStep7", false)
        disableOrEnableButton("ResolucaoAutomaticaTerceiraCamada", "imageStep10", false)
        return
    }

}
function checkRotation(type){
    if("LF" === type)
        self.cube.rotateLeft(true);
    else if("LB" === type)
        self.cube.rotateLeft(false);
    else if("RF" === type)
        self.cube.rotateRight(true);
    else if("RB" === type)
        self.cube.rotateRight(false);
    else if("BL" === type)
        self.cube.rotateBack(true);
    else if("BR" === type)
        self.cube.rotateBack(false);
    else if("FL" === type)
        self.cube.rotateFront(true);
    else if("FR" === type)
        self.cube.rotateFront(false);
    else if("DL" === type)
        self.cube.rotateBottom(true);
    else if("DR" === type)
        self.cube.rotateBottom(false);
    else if("TL" === type)
        self.cube.rotateTop(true);
    else if("TR" === type)
        self.cube.rotateTop(false);
    else if("F1" === type)
        self.cube.rotateAllFacesVertical(true);
    else if("B1" === type)
        self.cube.rotateAllFacesVertical(false);
    else if("L1" === type)
        self.cube.rotateAllFacesHorizontal(true);
    else if("L2" === type)
        self.cube.rotateAllFacesHorizontal(false);
    else if("S1" === type)
        self.cube.rotateAllFacesSideWays(true);
    else if("S2" === type)
        self.cube.rotateAllFacesSideWays(false);
}
function invertRotation(type){
    if("LF" === type)
        return "LB"
    else if("LB" === type)
        return "LF"
    else if("RF" === type)
        return "RB"
    else if("RB" === type)
        return "RF"
    else if("BL" === type)
        return "BR"
    else if("BR" === type)
        return "BL"
    else if("FL" === type)
        return "FR"
    else if("FR" === type)
        return "FL"
    else if("DL" === type)
        return "DR"
    else if("DR" === type)
        return "DL"
    else if("TL" === type)
        return "TR"
    else if("TR" === type)
        return "TL"
    else if("F1" === type)
        return "B1"
    else if("B1" === type)
        return "F1"
    else if("L1" === type)
        return "L2"
    else if("L2" === type)
        return "L1"
    else if("S1" === type)
        return "S2"
    else if("S2" === type)
        return "S1"
}
function getRandomRotation(numberMoves) {
    var movesPosible = ["LF", "LB", "RF", "RB", "BL", "BR", "FR", "DL", "DR", "TL", "TR", "FL" ]
    var moves=""
    for(var j = 0; j < numberMoves; j++){
        let random = Math.floor(Math.random() * movesPosible.length)
        moves += movesPosible[random]
    }
    return moves
}
