class Stage2{
    constructor(MatrixCubeState){

        this.newMatrix = new MatrixCube()
        this.estado = [MatrixCubeState[0].slice(), MatrixCubeState[1].slice(), MatrixCubeState[2].slice(), MatrixCubeState[3].slice(), MatrixCubeState[4].slice(), MatrixCubeState[5].slice()]
    }
    Complete(MatrixCubeState){
        this.estado = [MatrixCubeState[0].slice(), MatrixCubeState[1].slice(), MatrixCubeState[2].slice(), MatrixCubeState[3].slice(), MatrixCubeState[4].slice(), MatrixCubeState[5].slice()]

        var stringText = ""
        stringText+=this.segundaCamadaV2()
        return stringText
    }
    getEstado(){
        return this.estado.slice()
    }

    segundaCamadaV2(){
        var stringText = ""
        if(!(this.estado[4][4]===this.estado[4][0]&&this.estado[4][4]===this.estado[4][1]&&this.estado[4][4]===this.estado[4][2]&&
            this.estado[4][4]===this.estado[4][3]&&this.estado[4][4]===this.estado[4][4]&&this.estado[4][4]===this.estado[4][5]&&
            this.estado[4][4]===this.estado[4][6]&&this.estado[4][4]===this.estado[4][7]&&this.estado[4][4]===this.estado[4][8]&&

            this.estado[1][4]===this.estado[1][6]&&
            this.estado[1][4]===this.estado[1][7]&&this.estado[1][4]===this.estado[1][8]&&

            this.estado[2][4]===this.estado[2][6]&&
            this.estado[2][4]===this.estado[2][7]&&this.estado[2][4]===this.estado[2][8]&&

            this.estado[3][4]===this.estado[3][6]&&
            this.estado[3][4]===this.estado[3][7]&&this.estado[3][4]===this.estado[3][8]&&

            this.estado[5][4]===this.estado[5][6]&&
            this.estado[5][4]===this.estado[5][7]&&this.estado[5][4]===this.estado[5][8])){
            return ""
        }
        for (var j = 0; j < 30; j++) {
            if(!((this.estado[1][4] === this.estado[1][5]&&this.estado[1][4] === this.estado[1][3])&&
                (this.estado[2][4] === this.estado[2][5]&&this.estado[2][4] === this.estado[2][3])&&
                (this.estado[3][4] === this.estado[3][5]&&this.estado[3][4] === this.estado[3][3])&&
                (this.estado[5][4] === this.estado[5][5]&&this.estado[5][4] === this.estado[5][3]))){
                if(((this.estado[0][4] === this.estado[0][1]||this.estado[0][4] === this.estado[5][1])
                    &&(this.estado[0][4] === this.estado[0][3]||this.estado[0][4] === this.estado[2][1])
                    &&(this.estado[0][4] === this.estado[0][5]||this.estado[0][4] === this.estado[3][1])
                    &&(this.estado[0][4] === this.estado[0][7]||this.estado[0][4] === this.estado[1][1]))){
                    stringText+=this.segundaCamadaRemove()
                }
                stringText+=this.segundaCamadaAdd()
            }else{
                return stringText
            }
        }
        return "erro"


    }
    segundaCamadaAdd(){
        var stringText = ""
        for (var j = 0; j < 4; j++) {
            //Insert Left
            if((this.estado[1][4] === this.estado[1][1]&&(this.estado[2][4] === this.estado[0][7]))){
                stringText+=this.formula2()
                break
            }
            //Insert Right
            if((this.estado[1][4] === this.estado[1][1]&&(this.estado[3][4] === this.estado[0][7]))){
                stringText+=this.formula1()
                break
            }
            this.estado = this.newMatrix.moveUBackIn(this.estado)
            stringText+="TR"
            if(j===3){
                this.estado=this.newMatrix.setRightMainFaceIn(this.estado)
                stringText+="L1"
            }
        }
        return stringText
    }
    segundaCamadaRemove(){
        var stringText = ""
        for (var j = 0; j < 4; j++) {
            //Remove Left
            if((!(this.estado[0][4] === this.estado[1][3]||this.estado[0][4] === this.estado[2][5])&&
                (this.estado[0][4] === this.estado[0][7]||this.estado[0][4] === this.estado[1][1]))&&
                !(this.estado[1][4] === this.estado[1][3]&&this.estado[2][4] === this.estado[2][5])){
                stringText+=this.formula2()
                break
            }
            //Remove RIGHT
            if((!(this.estado[0][4] === this.estado[1][5]||this.estado[0][4] === this.estado[3][3])&&
                (this.estado[0][4] === this.estado[0][7]||this.estado[0][4] === this.estado[1][1]))&&
                !(this.estado[1][4] === this.estado[1][3]&&this.estado[3][4] === this.estado[3][3])){
                stringText+=this.formula1()
                break
            }
            this.estado = this.newMatrix.moveUBackIn(this.estado)
            stringText+="TR"
            if(j===3){
                this.estado=this.newMatrix.setRightMainFaceIn(this.estado)
                stringText+="L1"
            }
        }
        return stringText
    }
    segundaCamadaV1(){
        var stringText = ""
        for (var j = 0; j < 4; j++) {
            if(!((this.estado[1][4] === this.estado[1][5]&&this.estado[1][4] === this.estado[1][3])&&
                (this.estado[2][4] === this.estado[2][5]&&this.estado[2][4] === this.estado[2][3])&&
                (this.estado[3][4] === this.estado[3][5]&&this.estado[3][4] === this.estado[3][3])&&
                (this.estado[5][4] === this.estado[5][5]&&this.estado[5][4] === this.estado[5][3]))){
                for (var j = 0; j < 4; j++) {
                    //Insert Left
                    if((this.estado[1][4] === this.estado[1][1]&&(this.estado[2][4] === this.estado[0][7]))){
                        stringText+=this.formula2()
                        break
                    }
                    //Insert Right
                    if((this.estado[1][4] === this.estado[1][1]&&(this.estado[3][4] === this.estado[0][7]))){
                        stringText+=this.formula1()
                        break
                    }

                    //Remove Left
                    if((!(this.estado[0][4] === this.estado[1][3]||this.estado[0][4] === this.estado[2][5])&&
                            (this.estado[0][4] === this.estado[0][7]||this.estado[0][4] === this.estado[1][1]))&&
                        !(this.estado[1][4] === this.estado[1][3]&&this.estado[2][4] === this.estado[2][5])){
                        stringText+=this.formula2()
                        break
                    }
                    //Remove RIGHT
                    if((!(this.estado[0][4] === this.estado[1][5]||this.estado[0][4] === this.estado[3][3])&&
                            (this.estado[0][4] === this.estado[0][7]||this.estado[0][4] === this.estado[1][1]))&&
                        !(this.estado[1][4] === this.estado[1][3]&&this.estado[3][4] === this.estado[3][3])){
                        stringText+=this.formula1()
                        break
                    }

                    this.estado = this.newMatrix.moveUBackIn(this.estado)
                    stringText+="TR"
                    if(j===3){
                        this.estado=this.newMatrix.setRightMainFaceIn(this.estado)
                        stringText+="L1"
                    }
                }
            }else{
                return stringText
            }
        }
        return "erro"

    }


    formula1(){
        this.estado = this.newMatrix.moveUBackIn(this.estado)
        this.estado = this.newMatrix.moveRIn(this.estado)
        this.estado = this.newMatrix.moveUBackIn(this.estado)
        this.estado = this.newMatrix.moveUBackIn(this.estado)
        this.estado = this.newMatrix.moveRBackIn(this.estado)
        this.estado = this.newMatrix.moveUBackIn(this.estado)
        this.estado = this.newMatrix.moveUBackIn(this.estado)
        this.estado = this.newMatrix.moveFBackIn(this.estado)
        this.estado = this.newMatrix.moveUBackIn(this.estado)
        this.estado = this.newMatrix.moveFIn(this.estado)
        return "TRRBTRTRRFTRTRFLTRFR"
    }
    formula2(){
        this.estado = this.newMatrix.moveUIn(this.estado)
        this.estado = this.newMatrix.moveLBackIn(this.estado)
        this.estado = this.newMatrix.moveUIn(this.estado)
        this.estado = this.newMatrix.moveUIn(this.estado)
        this.estado = this.newMatrix.moveLIn(this.estado)
        this.estado = this.newMatrix.moveUIn(this.estado)
        this.estado = this.newMatrix.moveUIn(this.estado)
        this.estado = this.newMatrix.moveFIn(this.estado)
        this.estado = this.newMatrix.moveUIn(this.estado)
        this.estado = this.newMatrix.moveFBackIn(this.estado)
        return "TLLBTLTLLFTLTLFRTLFL"
    }

    GetTip(MatrixCubeState,stepByStep) {


        if(!(MatrixCubeState[4][4]===MatrixCubeState[4][0]&&MatrixCubeState[4][4]===MatrixCubeState[4][1]&&MatrixCubeState[4][4]===MatrixCubeState[4][2]&&
            MatrixCubeState[4][4]===MatrixCubeState[4][3]&&MatrixCubeState[4][4]===MatrixCubeState[4][4]&&MatrixCubeState[4][4]===MatrixCubeState[4][5]&&
            MatrixCubeState[4][4]===MatrixCubeState[4][6]&&MatrixCubeState[4][4]===MatrixCubeState[4][7]&&MatrixCubeState[4][4]===MatrixCubeState[4][8]&&

            MatrixCubeState[1][4]===MatrixCubeState[1][3]&&MatrixCubeState[1][4]===MatrixCubeState[1][5]&&MatrixCubeState[1][4]===MatrixCubeState[1][6]&&
            MatrixCubeState[1][4]===MatrixCubeState[1][7]&&MatrixCubeState[1][4]===MatrixCubeState[1][8]&&

            MatrixCubeState[2][4]===MatrixCubeState[2][3]&&MatrixCubeState[2][4]===MatrixCubeState[2][5]&&MatrixCubeState[2][4]===MatrixCubeState[2][6]&&
            MatrixCubeState[2][4]===MatrixCubeState[2][7]&&MatrixCubeState[2][4]===MatrixCubeState[2][8]&&

            MatrixCubeState[3][4]===MatrixCubeState[3][3]&&MatrixCubeState[3][4]===MatrixCubeState[3][5]&&MatrixCubeState[3][4]===MatrixCubeState[3][6]&&
            MatrixCubeState[3][4]===MatrixCubeState[3][7]&&MatrixCubeState[3][4]===MatrixCubeState[3][8]&&

            MatrixCubeState[5][4]===MatrixCubeState[5][3]&&MatrixCubeState[5][4]===MatrixCubeState[5][5]&&MatrixCubeState[5][4]===MatrixCubeState[5][6]&&
            MatrixCubeState[5][4]===MatrixCubeState[5][7]&&MatrixCubeState[5][4]===MatrixCubeState[5][8])){


            if(stepByStep){
                return "Solve the second layer (Step 3)"
            }else{
                return "Solve the second layer"
            }
        }
        return ""

    }
}