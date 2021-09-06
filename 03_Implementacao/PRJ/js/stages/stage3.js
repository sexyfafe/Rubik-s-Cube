class Stage3 {
    constructor(MatrixCubeState) {

        this.newMatrix = new MatrixCube()
        this.estado = [MatrixCubeState[0].slice(), MatrixCubeState[1].slice(), MatrixCubeState[2].slice(), MatrixCubeState[3].slice(), MatrixCubeState[4].slice(), MatrixCubeState[5].slice()]
    }

    Complete(MatrixCubeState) {
        this.estado = [MatrixCubeState[0].slice(), MatrixCubeState[1].slice(), MatrixCubeState[2].slice(), MatrixCubeState[3].slice(), MatrixCubeState[4].slice(), MatrixCubeState[5].slice()]
        var stringText = ""
        //this.debugHelper()
        stringText += this.cruz(this.estado)
        stringText += this.alinharCruz(this.estado)
        stringText += this.cantoCorreto(this.estado)
        stringText += this.rotateCorners(this.estado)

        return stringText
    }

    getEstado() {
        return this.estado.slice()
    }
    rotateCorners(MatrixCubeState) {
        this.estado = [MatrixCubeState[0].slice(), MatrixCubeState[1].slice(), MatrixCubeState[2].slice(), MatrixCubeState[3].slice(), MatrixCubeState[4].slice(), MatrixCubeState[5].slice()]

        if(!(this.estado[4][4]===this.estado[4][0]&&this.estado[4][4]===this.estado[4][1]&&this.estado[4][4]===this.estado[4][2]&&
            this.estado[4][4]===this.estado[4][3]&&this.estado[4][4]===this.estado[4][4]&&this.estado[4][4]===this.estado[4][5]&&
            this.estado[4][4]===this.estado[4][6]&&this.estado[4][4]===this.estado[4][7]&&this.estado[4][4]===this.estado[4][8]&&

            this.estado[1][4]===this.estado[1][3]&&this.estado[1][4]===this.estado[1][5]&&this.estado[1][4]===this.estado[1][6]&&
            this.estado[1][4]===this.estado[1][7]&&this.estado[1][4]===this.estado[1][8]&&this.estado[1][4]===this.estado[1][1]&&

            this.estado[2][4]===this.estado[2][3]&&this.estado[2][4]===this.estado[2][5]&&this.estado[2][4]===this.estado[2][6]&&
            this.estado[2][4]===this.estado[2][7]&&this.estado[2][4]===this.estado[2][8]&&this.estado[2][4]===this.estado[2][1]&&

            this.estado[3][4]===this.estado[3][3]&&this.estado[3][4]===this.estado[3][5]&&this.estado[3][4]===this.estado[3][6]&&
            this.estado[3][4]===this.estado[3][7]&&this.estado[3][4]===this.estado[3][8]&&this.estado[3][4]===this.estado[3][1]&&

            this.estado[5][4]===this.estado[5][3]&&this.estado[5][4]===this.estado[5][5]&&this.estado[5][4]===this.estado[5][6]&&
            this.estado[5][4]===this.estado[5][7]&&this.estado[5][4]===this.estado[5][8]&&this.estado[5][4]===this.estado[5][1])){

            return ""
        }

        var stringText = ""
        stringText+="F1"
        this.estado = this.newMatrix.setTopMainFaceIn(this.estado)
        if(this.estado[0][4]===this.estado[0][0]&&this.estado[0][4]===this.estado[0][2]&&this.estado[0][4]===this.estado[0][6]&&this.estado[0][4]===this.estado[0][8]&&
            this.estado[1][4]===this.estado[1][0]&&this.estado[1][4]===this.estado[1][2]&&this.estado[1][4]===this.estado[1][6]&&this.estado[1][4]===this.estado[1][8]&&
            this.estado[2][4]===this.estado[2][0]&&this.estado[2][4]===this.estado[2][2]&&this.estado[2][4]===this.estado[2][6]&&this.estado[2][4]===this.estado[2][8]&&
            this.estado[3][4]===this.estado[3][0]&&this.estado[3][4]===this.estado[3][2]&&this.estado[3][4]===this.estado[3][6]&&this.estado[3][4]===this.estado[3][8]&&
            this.estado[4][4]===this.estado[4][0]&&this.estado[4][4]===this.estado[4][2]&&this.estado[4][4]===this.estado[4][6]&&this.estado[4][4]===this.estado[4][8]&&
            this.estado[5][4]===this.estado[5][0]&&this.estado[5][4]===this.estado[5][2]&&this.estado[5][4]===this.estado[5][6]&&this.estado[5][4]===this.estado[5][8]){
            return ""
        }
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 30; i++) {
                if(!(this.estado[1][4] === this.estado[1][2])){
                    stringText+=this.formula4();
                }else{
                    stringText += "FR"
                    this.estado = this.newMatrix.moveFIn(this.estado)
                    break
                }
            }
        }
        return stringText
    }
    cantoCorreto(MatrixCubeState) {
        this.estado = [MatrixCubeState[0].slice(), MatrixCubeState[1].slice(), MatrixCubeState[2].slice(), MatrixCubeState[3].slice(), MatrixCubeState[4].slice(), MatrixCubeState[5].slice()]

        var stringText = ""

        for (var j = 0; j < 30; j++) {
            if(!((((this.estado[0][4] === this.estado[0][8]) || (this.estado[0][4] === this.estado[1][2]) || (this.estado[0][4] === this.estado[3][0]))
                    && ((this.estado[1][4] === this.estado[0][8]) || (this.estado[1][4] === this.estado[1][2]) || (this.estado[1][4] === this.estado[3][0]))
                    && ((this.estado[3][4] === this.estado[0][8]) || (this.estado[3][4] === this.estado[1][2]) || (this.estado[3][4] === this.estado[3][0])))
                &&(((this.estado[0][4] === this.estado[0][6]) || (this.estado[0][4] === this.estado[1][0]) || (this.estado[0][4] === this.estado[2][2]))
                    && ((this.estado[1][4] === this.estado[0][6]) || (this.estado[1][4] === this.estado[1][0]) || (this.estado[1][4] === this.estado[2][2]))
                    && ((this.estado[2][4] === this.estado[0][6]) || (this.estado[2][4] === this.estado[1][0]) || (this.estado[2][4] === this.estado[2][2])))
                &&(((this.estado[0][4] === this.estado[0][0]) || (this.estado[0][4] === this.estado[2][0]) || (this.estado[0][4] === this.estado[5][2]))
                    && ((this.estado[2][4] === this.estado[0][0]) || (this.estado[2][4] === this.estado[2][0]) || (this.estado[2][4] === this.estado[5][2]))
                    && ((this.estado[5][4] === this.estado[0][0]) || (this.estado[5][4] === this.estado[2][0]) || (this.estado[5][4] === this.estado[5][2])))
                &&(((this.estado[0][4] === this.estado[0][2]) || (this.estado[0][4] === this.estado[3][2]) || (this.estado[0][4] === this.estado[5][0]))
                    && ((this.estado[3][4] === this.estado[0][2]) || (this.estado[3][4] === this.estado[3][2]) || (this.estado[3][4] === this.estado[5][0]))
                    && ((this.estado[5][4] === this.estado[0][2]) || (this.estado[5][4] === this.estado[3][2]) || (this.estado[5][4] === this.estado[5][0]))))){

                //bottom Right
                if (((this.estado[0][4] === this.estado[0][8]) || (this.estado[0][4] === this.estado[1][2]) || (this.estado[0][4] === this.estado[3][0]))
                    && ((this.estado[1][4] === this.estado[0][8]) || (this.estado[1][4] === this.estado[1][2]) || (this.estado[1][4] === this.estado[3][0]))
                    && ((this.estado[3][4] === this.estado[0][8]) || (this.estado[3][4] === this.estado[1][2]) || (this.estado[3][4] === this.estado[3][0]))) {
                }
                //bottom Left
                else if (((this.estado[0][4] === this.estado[0][6]) || (this.estado[0][4] === this.estado[1][0]) || (this.estado[0][4] === this.estado[2][2]))
                    && ((this.estado[1][4] === this.estado[0][6]) || (this.estado[1][4] === this.estado[1][0]) || (this.estado[1][4] === this.estado[2][2]))
                    && ((this.estado[2][4] === this.estado[0][6]) || (this.estado[2][4] === this.estado[1][0]) || (this.estado[2][4] === this.estado[2][2]))) {
                    this.estado = this.newMatrix.setLeftMainFaceIn(this.estado)
                    stringText += "L2"

                }
                //top Left
                else if (((this.estado[0][4] === this.estado[0][0]) || (this.estado[0][4] === this.estado[2][0]) || (this.estado[0][4] === this.estado[5][2]))
                    && ((this.estado[2][4] === this.estado[0][0]) || (this.estado[2][4] === this.estado[2][0]) || (this.estado[2][4] === this.estado[5][2]))
                    && ((this.estado[5][4] === this.estado[0][0]) || (this.estado[5][4] === this.estado[2][0]) || (this.estado[5][4] === this.estado[5][2]))) {
                    this.estado = this.newMatrix.setRightMainFaceIn(this.estado)
                    this.estado = this.newMatrix.setRightMainFaceIn(this.estado)
                    stringText += "L1L1"
                }
                //top Right
                else if (((this.estado[0][4] === this.estado[0][2]) || (this.estado[0][4] === this.estado[3][2]) || (this.estado[0][4] === this.estado[5][0]))
                    && ((this.estado[3][4] === this.estado[0][2]) || (this.estado[3][4] === this.estado[3][2]) || (this.estado[3][4] === this.estado[5][0]))
                    && ((this.estado[5][4] === this.estado[0][2]) || (this.estado[5][4] === this.estado[3][2]) || (this.estado[5][4] === this.estado[5][0]))) {
                    this.estado = this.newMatrix.setRightMainFaceIn(this.estado)
                    stringText += "L1"
                }
                stringText +=this.formula3();
            }else{
                return stringText
            }
        }
        return "erro"
    }



    alinharCruz(MatrixCubeState) {
        this.estado = [MatrixCubeState[0].slice(), MatrixCubeState[1].slice(), MatrixCubeState[2].slice(), MatrixCubeState[3].slice(), MatrixCubeState[4].slice(), MatrixCubeState[5].slice()]

        var stringText = ""

        for (var j = 0; j < 30; j++) {
            if(!((this.estado[2][1] === this.estado[2][4]) && (this.estado[3][1] === this.estado[3][4]) && (this.estado[5][1] === this.estado[5][4]) && (this.estado[1][1] === this.estado[1][4]))) {
                if (this.estado[2][1] === this.estado[2][4]) {
                    this.estado = this.newMatrix.moveUIn(this.estado)
                    this.estado = this.newMatrix.moveUIn(this.estado)
                    stringText += "TLTL"
                } else {
                    this.estado = this.newMatrix.moveUIn(this.estado)
                    stringText += "TL"
                }
                stringText += this.formula2();

                for (var i = 0; i < 30; i++) {
                    if(!(this.estado[1][1] === this.estado[1][4])){
                        this.estado = this.newMatrix.moveUIn(this.estado)
                        stringText += "TL"
                    }else{
                        break
                    }
                }
            }else{
                return stringText
            }
        }
        return "erro"
    }

    cruz(MatrixCubeState) {
        this.estado = [MatrixCubeState[0].slice(), MatrixCubeState[1].slice(), MatrixCubeState[2].slice(), MatrixCubeState[3].slice(), MatrixCubeState[4].slice(), MatrixCubeState[5].slice()]

        if(!(this.estado[4][4]===this.estado[4][0]&&this.estado[4][4]===this.estado[4][1]&&this.estado[4][4]===this.estado[4][2]&&
            this.estado[4][4]===this.estado[4][3]&&this.estado[4][4]===this.estado[4][4]&&this.estado[4][4]===this.estado[4][5]&&
            this.estado[4][4]===this.estado[4][6]&&this.estado[4][4]===this.estado[4][7]&&this.estado[4][4]===this.estado[4][8]&&

            this.estado[1][4]===this.estado[1][3]&&this.estado[1][4]===this.estado[1][5]&&this.estado[1][4]===this.estado[1][6]&&
            this.estado[1][4]===this.estado[1][7]&&this.estado[1][4]===this.estado[1][8]&&

            this.estado[2][4]===this.estado[2][3]&&this.estado[2][4]===this.estado[2][5]&&this.estado[2][4]===this.estado[2][6]&&
            this.estado[2][4]===this.estado[2][7]&&this.estado[2][4]===this.estado[2][8]&&

            this.estado[3][4]===this.estado[3][3]&&this.estado[3][4]===this.estado[3][5]&&this.estado[3][4]===this.estado[3][6]&&
            this.estado[3][4]===this.estado[3][7]&&this.estado[3][4]===this.estado[3][8]&&

            this.estado[5][4]===this.estado[5][3]&&this.estado[5][4]===this.estado[5][5]&&this.estado[5][4]===this.estado[5][6]&&
            this.estado[5][4]===this.estado[5][7]&&this.estado[5][4]===this.estado[5][8])){

            return ""
        }

        var stringText = ""

        for (var j = 0; j < 30; j++) {
            if(!(this.estado[0][4] === this.estado[0][1] && this.estado[0][4] === this.estado[0][3]
                && this.estado[0][4] === this.estado[0][5] && this.estado[0][4] === this.estado[0][7])) {
                if (this.estado[0][4] === this.estado[0][3] && this.estado[0][4] === this.estado[0][5]) {
                } else if (this.estado[0][4] === this.estado[0][1] && this.estado[0][4] === this.estado[0][7]) {
                    this.estado = this.newMatrix.moveUIn(this.estado)
                    stringText += "TL"
                } else if (this.estado[0][4] === this.estado[0][1] && this.estado[0][4] === this.estado[0][3]) {
                } else if (this.estado[0][4] === this.estado[0][1] && this.estado[0][4] === this.estado[0][5]) {
                    this.estado = this.newMatrix.moveUBackIn(this.estado)
                    stringText += "TR"
                } else if (this.estado[0][4] === this.estado[0][5] && this.estado[0][4] === this.estado[0][7]) {
                    this.estado = this.newMatrix.moveUBackIn(this.estado)
                    this.estado = this.newMatrix.moveUBackIn(this.estado)
                    stringText += "TRTR"
                } else if (this.estado[0][4] === this.estado[0][7] && this.estado[0][4] === this.estado[0][3]) {
                    this.estado = this.newMatrix.moveUIn(this.estado)
                    stringText += "TL"
                }
                stringText += this.formula1();
            }else{
                break
            }
        }

        for (var j = 0; j < 30; j++) {
            if(!(this.estado[1][1] === this.estado[1][4])) {
                this.estado = this.newMatrix.moveUIn(this.estado)
                stringText += "TL"
            }else{
                return stringText
            }
        }
        return "erro"
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

    formula1() {
        this.estado = this.newMatrix.moveFIn(this.estado)
        this.estado = this.newMatrix.moveRIn(this.estado)
        this.estado = this.newMatrix.moveUIn(this.estado)
        this.estado = this.newMatrix.moveRBackIn(this.estado)
        this.estado = this.newMatrix.moveUBackIn(this.estado)
        this.estado = this.newMatrix.moveFBackIn(this.estado)
        return "FRRBTLRFTRFL"
    }

    formula2() {
        this.estado = this.newMatrix.moveRIn(this.estado)
        this.estado = this.newMatrix.moveUIn(this.estado)
        this.estado = this.newMatrix.moveRBackIn(this.estado)
        this.estado = this.newMatrix.moveUIn(this.estado)
        this.estado = this.newMatrix.moveRIn(this.estado)
        this.estado = this.newMatrix.moveUBackIn(this.estado)
        this.estado = this.newMatrix.moveUBackIn(this.estado)
        this.estado = this.newMatrix.moveRBackIn(this.estado)
        return "RBTLRFTLRBTRTRRF"
    }

    formula3() {
        this.estado = this.newMatrix.moveUIn(this.estado)
        this.estado = this.newMatrix.moveRIn(this.estado)
        this.estado = this.newMatrix.moveUBackIn(this.estado)
        this.estado = this.newMatrix.moveLBackIn(this.estado)
        this.estado = this.newMatrix.moveUIn(this.estado)
        this.estado = this.newMatrix.moveRBackIn(this.estado)
        this.estado = this.newMatrix.moveUBackIn(this.estado)
        this.estado = this.newMatrix.moveLIn(this.estado)
        return "TLRBTRLBTLRFTRLF"
    }

    formula4() {
        this.estado = this.newMatrix.moveUIn(this.estado)
        this.estado = this.newMatrix.moveRBackIn(this.estado)
        this.estado = this.newMatrix.moveUBackIn(this.estado)
        this.estado = this.newMatrix.moveRIn(this.estado)
        return "TLRFTRRB"
    }

    GetTip1(MatrixCubeState,stepByStep) {

        if(!(MatrixCubeState[0][4]===MatrixCubeState[0][1]&&MatrixCubeState[0][4]===MatrixCubeState[0][3]&&
            MatrixCubeState[0][4]===MatrixCubeState[0][5]&&MatrixCubeState[0][4]===MatrixCubeState[0][7])){

            if(stepByStep){
                return "Solve the third layer cross part 1 (Step 4)"
            }else{
                return "Solve the third layer"
            }
        }


        return ""

    }
    GetTip2(MatrixCubeState,stepByStep) {


        if(!(MatrixCubeState[1][4]===MatrixCubeState[1][1]&&MatrixCubeState[2][4]===MatrixCubeState[2][1]&&
            MatrixCubeState[3][4]===MatrixCubeState[3][1]&&MatrixCubeState[5][4]===MatrixCubeState[5][1])){

            if(stepByStep){
                return "Solve the third layer cross part 2 (Step 5)"
            }else{
                return "Solve the third layer"
            }
        }

        return ""

    }
    GetTip3(MatrixCubeState,stepByStep) {


        if(!((((this.estado[0][4] === this.estado[0][8]) || (this.estado[0][4] === this.estado[1][2]) || (this.estado[0][4] === this.estado[3][0]))
                && ((this.estado[1][4] === this.estado[0][8]) || (this.estado[1][4] === this.estado[1][2]) || (this.estado[1][4] === this.estado[3][0]))
                && ((this.estado[3][4] === this.estado[0][8]) || (this.estado[3][4] === this.estado[1][2]) || (this.estado[3][4] === this.estado[3][0])))
            &&(((this.estado[0][4] === this.estado[0][6]) || (this.estado[0][4] === this.estado[1][0]) || (this.estado[0][4] === this.estado[2][2]))
                && ((this.estado[1][4] === this.estado[0][6]) || (this.estado[1][4] === this.estado[1][0]) || (this.estado[1][4] === this.estado[2][2]))
                && ((this.estado[2][4] === this.estado[0][6]) || (this.estado[2][4] === this.estado[1][0]) || (this.estado[2][4] === this.estado[2][2])))
            &&(((this.estado[0][4] === this.estado[0][0]) || (this.estado[0][4] === this.estado[2][0]) || (this.estado[0][4] === this.estado[5][2]))
                && ((this.estado[2][4] === this.estado[0][0]) || (this.estado[2][4] === this.estado[2][0]) || (this.estado[2][4] === this.estado[5][2]))
                && ((this.estado[5][4] === this.estado[0][0]) || (this.estado[5][4] === this.estado[2][0]) || (this.estado[5][4] === this.estado[5][2])))
            &&(((this.estado[0][4] === this.estado[0][2]) || (this.estado[0][4] === this.estado[3][2]) || (this.estado[0][4] === this.estado[5][0]))
                && ((this.estado[3][4] === this.estado[0][2]) || (this.estado[3][4] === this.estado[3][2]) || (this.estado[3][4] === this.estado[5][0]))
                && ((this.estado[5][4] === this.estado[0][2]) || (this.estado[5][4] === this.estado[3][2]) || (this.estado[5][4] === this.estado[5][0]))))){

            if(stepByStep){
                return "Solve the corners of the third layer part 1 (Step 6)"
            }else{
                return "Solve the third layer"
            }

        }

        return ""

    }
    GetTip4(MatrixCubeState,stepByStep) {

        if(!(MatrixCubeState[0][4]===MatrixCubeState[0][0]&&MatrixCubeState[0][4]===MatrixCubeState[0][2]&&
            MatrixCubeState[0][4]===MatrixCubeState[0][6]&&MatrixCubeState[0][4]===MatrixCubeState[0][8])){

            if(stepByStep){
                return "Solve the corners of the third layer part 2 (Step 7)"
            }else{
                return "Solve the third layer"
            }
        }

        return ""

    }
    isSolved(MatrixCubeState){
        for (var j = 0; j < 6; j++) {
            for (var i = 0; i < 9; i++){
                if(MatrixCubeState[j][i]!==MatrixCubeState[j][5]){
                    return false
                }
            }
        }
        return true


    }
}