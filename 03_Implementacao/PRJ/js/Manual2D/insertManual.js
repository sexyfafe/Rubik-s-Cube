main()
function main(){
    self.matrix = new MatrixCube();
    self.cube2d = new Cube2D();
    let cubeValidator = new CubeValidator();

    let buttonApply = document.getElementById("applyButton")
    let configAlert = document.getElementById("alertConfig")

    let stage1Config = new Stage1(self.matrix.getStates().slice())
    let stage2Config = new Stage2(self.matrix.getStates().slice())
    let stage3Config = new Stage3(self.matrix.getStates().slice())


    var context = document.getElementById('canvas2DCube').getContext("2d");
    canvas.addEventListener('click', function(e){

        let newColor = self.cube2d.mousePressedSquare(e)
        if(newColor != null){
            self.matrix.convertColortoChar(newColor[0], newColor[1], newColor[2])

            if(cubeValidator.validation(self.matrix.getStates(),stage1Config,stage2Config,stage3Config) ){
                buttonApply.style.display = "block"
                configAlert.style.display = "none"
            }
            else{
                buttonApply.style.display = "none"
                configAlert.style.display = "block"
            }
        }
    }, false)

    document.getElementById("applyButton").addEventListener("click", function(){
        sessionStorage.setItem("matrixState", self.matrix.getStateInText())
        document.location.href = "index.html";
    });

    animate();
}
function animate() {
    requestAnimationFrame(animate);
    
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.8;

    self.cube2d.createCube(canvas.width * 0.4 , canvas.height * -0.04, canvas.height * 0.09, self.matrix.getStates(), 0.014);
}

