class Stage1 {
    constructor(MatrixCubeState) {
        this.newMatrix = new MatrixCube()
        this.estado = [MatrixCubeState[0].slice(), MatrixCubeState[1].slice(), MatrixCubeState[2].slice(), MatrixCubeState[3].slice(), MatrixCubeState[4].slice(), MatrixCubeState[5].slice()]
    }

    Complete(MatrixCubeState){

        this.estado = [MatrixCubeState[0].slice(), MatrixCubeState[1].slice(), MatrixCubeState[2].slice(), MatrixCubeState[3].slice(), MatrixCubeState[4].slice(), MatrixCubeState[5].slice()]

        var stringText = ""
        var cruz = this.AutoCruz(this.estado)
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        console.log(cruz[0])
        console.log(cruz[1])
        var corners = this.AutoCorners(this.estado)
        console.log(corners[0])
        console.log(corners[1])
        if(cruz[0]!=="erro" && corners[0]!=="erro"){
            stringText+=cruz[0]
            stringText+=corners[0]
        }else{
            stringText="erro"
        }
        if(stringText===""){
            this.estado = [MatrixCubeState[0].slice(), MatrixCubeState[1].slice(), MatrixCubeState[2].slice(), MatrixCubeState[3].slice(), MatrixCubeState[4].slice(), MatrixCubeState[5].slice()]
        }

        return stringText
    }
    getEstado(){
        return this.estado.slice()
    }

    formula1() {
        this.estado = this.newMatrix.moveRIn(this.estado)
        this.estado = this.newMatrix.moveUIn(this.estado)
        this.estado = this.newMatrix.moveRBackIn(this.estado)
        this.estado = this.newMatrix.moveUBackIn(this.estado)

        return "RBTLRFTR"
    }
    AutoCruz(MatrixCubeState) {
        this.estado = [MatrixCubeState[0].slice(), MatrixCubeState[1].slice(), MatrixCubeState[2].slice(), MatrixCubeState[3].slice(), MatrixCubeState[4].slice(), MatrixCubeState[5].slice()]

        if((this.estado[1][4]===this.estado[1][1]&&this.estado[1][4]===this.estado[1][3]&&this.estado[1][4]===this.estado[1][5]&&this.estado[1][4]===this.estado[1][7])||
            (this.estado[4][4]===this.estado[4][1]&&this.estado[4][4]===this.estado[4][3]&&this.estado[4][4]===this.estado[4][5]&&this.estado[4][4]===this.estado[4][7])){
            return ""
        }
        var arrayState =[]
        var stringText = ""
        var calcPointsCross =this.CalcPointsCross()
        var removeWrongCross = this.RemoveWrongCross()
        if(calcPointsCross!==""){arrayState.push([calcPointsCross,0])}
        if(removeWrongCross!==""){arrayState.push([removeWrongCross,0])}

        stringText += calcPointsCross
        stringText += removeWrongCross

        var completed= false
        for (var j = 0; j < 30; j++) {
            if (!((this.estado[1][1] === this.estado[1][4]) && (this.estado[1][3] === this.estado[1][4])
                && (this.estado[1][5] === this.estado[1][4]) && (this.estado[1][7] === this.estado[1][4]))) {
                var getPiceFromUnder =this.getPiceFromUnder()
                var getPiceFromSide =this.getPiceFromSide()
                if(getPiceFromUnder!==""){arrayState.push([getPiceFromUnder,0])}
                if(getPiceFromSide!==""){arrayState.push([getPiceFromSide,0])}
                stringText += getPiceFromUnder
                stringText += getPiceFromSide
            }else{
                completed=true
                break
            }
        }
        //this.debugHelper()
        if(completed)
            return [stringText,arrayState]
        else
            return ["erro"]
    }

    AutoCorners(MatrixCubeState) {

        this.estado = [MatrixCubeState[0].slice(), MatrixCubeState[1].slice(), MatrixCubeState[2].slice(), MatrixCubeState[3].slice(), MatrixCubeState[4].slice(), MatrixCubeState[5].slice()]
        var arrayState =[]


        var stringText = ""
        var rotation=""
        if((this.estado[4][4]===this.estado[4][1]&&this.estado[4][4]===this.estado[4][3]&&this.estado[4][4]===this.estado[4][5]&&this.estado[4][4]===this.estado[4][7])){
            //valid
        }
        else if (((this.estado[1][1] === this.estado[1][4]) && (this.estado[1][3] === this.estado[1][4])
            && (this.estado[1][5] === this.estado[1][4]) && (this.estado[1][7] === this.estado[1][4]))) {
            stringText += "F1"
            this.estado = this.newMatrix.setTopMainFaceIn(this.estado)
        }else{
            return ""
        }
        if(stringText!==""){arrayState.push([stringText,0])}
        //this.debugHelper()
        var completed= false
        for (var j = 0; j < 30; j++) {
            if(!(this.estado[4][4] === this.estado[4][1] && this.estado[4][4] === this.estado[4][3] &&
                this.estado[4][4] === this.estado[4][5] && this.estado[4][4] === this.estado[4][7] &&
                this.estado[1][4] === this.estado[1][8] && this.estado[1][4] === this.estado[1][6] &&
                this.estado[2][4] === this.estado[2][8] && this.estado[2][4] === this.estado[2][6] &&
                this.estado[3][4] === this.estado[3][8] && this.estado[3][4] === this.estado[3][6] &&
                this.estado[5][4] === this.estado[5][8] && this.estado[5][4] === this.estado[5][6])){
                var cornerString=this.SolveCorners()
                stringText +=rotation
                if(rotation!==""){arrayState.push([rotation,0])}
                if(cornerString[0]!==""){
                    stringText +=cornerString[0]
                    console.log(cornerString[0])
                    Array.prototype.push.apply(arrayState, cornerString[1]);


                }
                rotation="L1"

                this.estado=this.newMatrix.setRightMainFaceIn(this.estado)
            }else{
                this.estado=this.newMatrix.setLeftMainFaceIn(this.estado)
                completed=true
                break
            }
        }
        if(completed)
            return [stringText,arrayState]
        else
            return ["erro"]
    }

    debugHelper() {
        console.log("newRotation")
        console.log(this.estado[0])
        console.log(this.estado[1])
        console.log(this.estado[2])
        console.log(this.estado[3])
        console.log(this.estado[4])
        console.log(this.estado[5])
    }

    SolveCorners() {
        var arrayState =[]
        var selected = ""
        if (this.estado[4][4] === this.estado[1][8] || this.estado[4][4] === this.estado[3][6] || this.estado[4][4] === this.estado[4][2]) {
            if (this.estado[1][4] === this.estado[1][8] || this.estado[1][4] === this.estado[3][6] || this.estado[1][4] === this.estado[4][2]) {
                if (this.estado[3][4] === this.estado[1][8] || this.estado[3][4] === this.estado[3][6] || this.estado[3][4] === this.estado[4][2]) {
                    for (var j = 0; j < 30; j++) {
                        if(!(this.estado[4][4] === this.estado[4][2] && this.estado[1][4] === this.estado[1][8] && this.estado[3][4] === this.estado[3][6])){
                            var formula = this.formula1()
                            selected += formula
                            if(formula!==""){arrayState.push([formula,0])}
                        }else{
                            return [selected,arrayState]
                        }
                    }
                }
            }
        }

        for (var j = 0; j < 4; j++) {
            //Top Corner
            if (this.estado[4][4] === this.estado[0][8] || this.estado[4][4] === this.estado[1][2] || this.estado[4][4] === this.estado[3][0]) {
                if (this.estado[1][4] === this.estado[0][8] || this.estado[1][4] === this.estado[1][2] || this.estado[1][4] === this.estado[3][0]) {
                    if (this.estado[3][4] === this.estado[0][8] || this.estado[3][4] === this.estado[1][2] || this.estado[3][4] === this.estado[3][0]) {
                        for (var j = 0; j < 30; j++) {
                            if(!(this.estado[4][4] === this.estado[4][2] && this.estado[1][4] === this.estado[1][8] && this.estado[3][4] === this.estado[3][6])){
                                var formula = this.formula1()
                                selected += formula
                                if(formula!==""){arrayState.push([formula,0])}
                            }else{
                                return [selected,arrayState]
                            }
                        }
                    }
                }
            }
            selected += "TR"
            arrayState.push(["TR",0])
            this.estado = this.newMatrix.moveUBackIn(this.estado)
        }
        selected = ""
        var arrayState =[]
        if (this.estado[4][4] === this.estado[4][2] || this.estado[4][4] === this.estado[1][8] || this.estado[4][4] === this.estado[3][6]) {
            for (var j = 0; j < 4; j++) {
                if (!(this.estado[4][4] === this.estado[0][8] || this.estado[4][4] === this.estado[1][2] || this.estado[4][4] === this.estado[3][0])) {
                    var formula = this.formula1()
                    selected += formula
                    if(formula!==""){arrayState.push([formula,0])}
                    return [selected,arrayState]
                }
            }
        }
        return [""]
    }


    getPiceFromSide() {
        var string = ""
        var extraString = ""
        for (var j = 0; j < 4; j++) {
            if (j !== 0) {
                extraString += "S1"
                this.estado = this.newMatrix.setRotateMainFaceLeftIn(this.estado)
            }
            if ((this.estado[4][1] === this.estado[1][4])) {
                this.estado = this.newMatrix.moveDIn(this.estado)
                string += extraString + "DR"
                extraString = ""
                if (this.estado[3][7] === this.estado[0][4]) {
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    string += "FRRBFL"
                } else if (this.estado[3][7] === this.estado[2][4]) {
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    string += "FRFRRBFLFL"
                } else if (this.estado[3][7] === this.estado[3][4]) {
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    string += "RB"
                } else if (this.estado[3][7] === this.estado[4][4]) {
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    string += "FLRBFR"
                }
            }
            if ((this.estado[4][3] === this.estado[1][4])) {
                string += extraString
                extraString = ""
                if (this.estado[2][7] === this.estado[0][4]) {
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    this.estado = this.newMatrix.moveLBackIn(this.estado)
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    string += "FLLBFR"
                } else if (this.estado[2][7] === this.estado[2][4]) {
                    this.estado = this.newMatrix.moveLBackIn(this.estado)
                    string += "LB"
                } else if (this.estado[2][7] === this.estado[3][4]) {
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    this.estado = this.newMatrix.moveLBackIn(this.estado)
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    string += "FRFRLBFLFL"
                } else if (this.estado[2][7] === this.estado[4][4]) {
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    this.estado = this.newMatrix.moveLBackIn(this.estado)
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    string += "FRLBFL"
                }
            }
            if ((this.estado[4][5] === this.estado[1][4])) {

                string += extraString
                extraString = ""
                if (this.estado[3][7] === this.estado[0][4]) {
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    string += "FRRBFL"
                } else if (this.estado[3][7] === this.estado[2][4]) {
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    string += "FRFRRBFLFL"
                } else if (this.estado[3][7] === this.estado[3][4]) {
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    string += "RB"
                } else if (this.estado[3][7] === this.estado[4][4]) {
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    string += "FLRBFR"
                }
            }
            if ((this.estado[4][7] === this.estado[1][4])) {


                string += extraString
                extraString = ""
                if (this.estado[5][7] === this.estado[0][4]) {
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    this.estado = this.newMatrix.moveDBackIn(this.estado)
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    string += "FRDLRBFL"
                } else if (this.estado[5][7] === this.estado[2][4]) {
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    this.estado = this.newMatrix.moveDBackIn(this.estado)
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    this.estado = this.newMatrix.moveDIn(this.estado)
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    string += "FRFRDLRBDRFLFL"
                } else if (this.estado[5][7] === this.estado[3][4]) {
                    this.estado = this.newMatrix.moveDBackIn(this.estado)
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    this.estado = this.newMatrix.moveDIn(this.estado)
                    string += "DLRBDR"
                } else if (this.estado[5][7] === this.estado[4][4]) {
                    this.estado = this.newMatrix.moveFBackIn(this.estado)
                    this.estado = this.newMatrix.moveDBackIn(this.estado)
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    this.estado = this.newMatrix.moveDIn(this.estado)
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    string += "FLDLRBDRFR"
                }

            }

        }
        for (var j = 0; j < 30; j++) {
            if(extraString !== ""){
                this.estado = this.newMatrix.setRotateMainFaceRightIn(this.estado)
                extraString = extraString.slice(2)
            }else{
                return string
            }
        }
        return "erro"

    }


    RemoveWrongCross() {
        var string = ""

        if ((this.estado[0][4] !== this.estado[0][7]) && this.estado[1][4] === this.estado[1][1]) {
            this.estado = this.newMatrix.moveUIn(this.estado)
            this.estado = this.newMatrix.moveUIn(this.estado)
            string += "TLTL"
        }
        if ((this.estado[2][4] !== this.estado[2][5]) && this.estado[1][4] === this.estado[1][3]) {
            this.estado = this.newMatrix.moveLIn(this.estado)
            this.estado = this.newMatrix.moveLIn(this.estado)
            string += "LFLF"
        }

        if ((this.estado[3][4] !== this.estado[3][3]) && this.estado[1][4] === this.estado[1][5]) {
            this.estado = this.newMatrix.moveRIn(this.estado)
            this.estado = this.newMatrix.moveRIn(this.estado)
            string += "RBRB"
        }
        if ((this.estado[4][4] !== this.estado[4][1]) && this.estado[1][4] === this.estado[1][7]) {
            this.estado = this.newMatrix.moveDIn(this.estado)
            this.estado = this.newMatrix.moveDIn(this.estado)
            string += "DRDR"
        }
        return string
    }

    CalcPointsCross() {
        var bestState = 0
        var bestScore = 0
        var stringSelected = ""
        //var sides = this.getSides(this.f[4])
        var sidesNumber = [1, 3, 5, 7];
        for (var i = 1; i < 5; i++) {
            this.estado = this.newMatrix.moveFIn(this.estado)
            var score = 0
            var string = ""
            for (var j = 0; j < 4; j++) {
                if (this.estado[1][4] === this.estado[1][sidesNumber[j]]) {
                    if (sidesNumber[j] === 1) {
                        if (this.estado[0][4] === this.estado[0][7]) {
                            score++
                        }
                    }
                    if (sidesNumber[j] === 3) {
                        if (this.estado[2][4] === this.estado[2][5]) {
                            score++
                        }
                    }
                    if (sidesNumber[j] === 5) {
                        if (this.estado[3][4] === this.estado[3][3]) {
                            score++
                        }
                    }
                    if (sidesNumber[j] === 7) {
                        if (this.estado[4][4] === this.estado[4][1]) {
                            score++
                        }
                    }
                }
            }
            if (score >= bestScore) {
                bestScore = score
                bestState = i
                stringSelected = string
            }
        }

        switch ((bestState % 4)) {
            case 0:
                return ("" + stringSelected)
            case 1:
                this.estado = this.newMatrix.moveFIn(this.estado)
                return ("FR" + stringSelected)
            case 2:
                this.estado = this.newMatrix.moveFIn(this.estado)
                this.estado = this.newMatrix.moveFIn(this.estado)
                return ("FRFR" + stringSelected)
            case 3:
                this.estado = this.newMatrix.moveFBackIn(this.estado)
                return ("FL" + stringSelected)
        }
    }

    getPiceFromUnder() {
        var stringMovement = ""

        for (var j = 0; j < 30; j++) {
            if(this.estado[5][1] === this.estado[1][4] || this.estado[5][3] === this.estado[1][4]
                || this.estado[5][5] === this.estado[1][4] || this.estado[5][7] === this.estado[1][4]) {
                if (this.estado[5][1] === this.estado[1][4] && this.estado[0][1] === this.estado[0][4]) {
                    this.estado = this.newMatrix.moveUIn(this.estado)
                    this.estado = this.newMatrix.moveUIn(this.estado)
                    stringMovement += "TLTL"
                }
                if (this.estado[5][3] === this.estado[1][4] && this.estado[3][5] === this.estado[3][4]) {
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    this.estado = this.newMatrix.moveRIn(this.estado)
                    stringMovement += "RBRB"
                }
                if (this.estado[5][5] === this.estado[1][4] && this.estado[2][3] === this.estado[2][4]) {
                    this.estado = this.newMatrix.moveLIn(this.estado)
                    this.estado = this.newMatrix.moveLIn(this.estado)
                    stringMovement += "LFLF"
                }
                if (this.estado[5][7] === this.estado[1][4] && this.estado[4][7] === this.estado[4][4]) {
                    this.estado = this.newMatrix.moveDIn(this.estado)
                    this.estado = this.newMatrix.moveDIn(this.estado)
                    stringMovement += "DRDR"
                }

                if (this.estado[5][1] === this.estado[1][4] || this.estado[5][3] === this.estado[1][4]
                    || this.estado[5][5] === this.estado[1][4] || this.estado[5][7] === this.estado[1][4]) {
                    stringMovement += "BL"
                    this.estado = this.newMatrix.moveBIn(this.estado)
                }

            }
            else{
                return (stringMovement)
            }
        }
        return "erro"

    }


    getSides(colorFront) {
        if (colorFront === 'g') {
            return this.green
        } else if (colorFront === 'y') {
            return this.yellow
        } else if (colorFront === 'o') {
            return this.orange
        } else if (colorFront === 'r') {
            return this.red
        } else if (colorFront === 'b') {
            return this.blue
        } else if (colorFront === 'w') {
            return this.white
        }
    }

    GetTip1(MatrixCubeState, stepByStep) {
        if(!((MatrixCubeState[1][4]===MatrixCubeState[1][1]&&MatrixCubeState[1][4]===MatrixCubeState[1][3]&&MatrixCubeState[1][4]===MatrixCubeState[1][5]&&MatrixCubeState[1][4]===MatrixCubeState[1][7])||
            (MatrixCubeState[4][4]===MatrixCubeState[4][1]&&MatrixCubeState[4][4]===MatrixCubeState[4][3]&&MatrixCubeState[4][4]===MatrixCubeState[4][5]&&MatrixCubeState[4][4]===MatrixCubeState[4][7]))){
            if(stepByStep){
                return "Solve the main cross (Step 1)"
            }else{
                return "Solve the first layer"
            }
        }
        return ""

    }
    GetTip2(MatrixCubeState, stepByStep) {

        if(!(MatrixCubeState[4][4]===MatrixCubeState[4][0]&&MatrixCubeState[4][4]===MatrixCubeState[4][2]&&
            MatrixCubeState[4][4]===MatrixCubeState[4][6]&&MatrixCubeState[4][4]===MatrixCubeState[4][8])){
            if(stepByStep){
                return "Solve the corners of the main cross (Step 2)"
            }else{
                return "Solve the first layer"
            }
        }
        return ""

    }

}