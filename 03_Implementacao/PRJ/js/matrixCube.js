class MatrixCube{

    constructor(){
        //["white","green","orange","red","yellow","blue"];

        this.reset()
    }

    convertColortoChar(char, face, index){
        this.colors_dictionary={'white':["w",], 'green':["g",], 'orange':["o",], 'red':["r",], 'yellow':["y",], 'blue':["b",]};

        if(face === 0)
            this.u[index] = this.colors_dictionary[char][0];
        else if(face === 1)
            this.f[index] = this.colors_dictionary[char][0];
        else if(face === 2)
            this.l[index] = this.colors_dictionary[char][0];
        else if(face === 3)
            this.r[index] = this.colors_dictionary[char][0];
        else if(face === 4)
            this.d[index] = this.colors_dictionary[char][0];
        else if(face === 5)
            this.b[index] = this.colors_dictionary[char][0];
    }

    reset(){
        this.u = ['w','w','w','w','w','w','w','w','w']
        this.f = ['g','g','g','g','g','g','g','g','g']
        this.d = ['y','y','y','y','y','y','y','y','y']
        this.l = ['o','o','o','o','o','o','o','o','o']
        this.r = ['r','r','r','r','r','r','r','r','r']
        this.b = ['b','b','b','b','b','b','b','b','b']
    }


    getStates(){
        return [this.u,this.f,this.l,this.r,this.d,this.b]
    }

    getStateInText(){
        let faces = [this.u,this.f,this.l,this.r,this.d,this.b]
        let string = ""

        for(let i = 0; i < faces.length; i++){
            for(let x = 0; x < faces[i].length; x++){
                string += faces[i][x]
            }
        }

        return string;
    }

    setStateInText(stringOfStates){
        let faces = [this.u,this.f,this.l,this.r,this.d,this.b]


        for(let i = 0; i < faces.length; i++){
            for(let x = 0; x < faces[i].length; x++){
                faces[i][x] = stringOfStates[(i * 9) + x]
            }
        }
    }



    setState(newState){

        this.u=newState[0];
        this.f=newState[1];
        this.l=newState[2];
        this.r=newState[3];
        this.d=newState[4];
        this.b=newState[5];
    }


    print(){
        console.log(this.u.length);
        console.log(this.f.length);
        console.log(this.d.length);
        console.log(this.l.length);
        console.log(this.r.length);
        console.log(this.b.length);
    }

    printFaces(string){
        console.log("Title " + string);
        console.log("UPPER -> " + this.u);
        console.log("FRONT -> " + this.f);
        console.log("DOWN -> " + this.d);
        console.log("LEFT -> " + this.l);
        console.log("RIGHT -> " + this.r);
        console.log("BACK -> " + this.b);
        console.log("----------------");
    }

    checkRotation(type){
        if("LF" === type)
            this.setState(this.moveLIn(this.getStates()))
        else if("LB" === type)
            this.setState(this.moveLBackIn(this.getStates()))
        else if("RF" === type)
            this.setState(this.moveRBackIn(this.getStates()))
        else if("RB" === type)
            this.setState(this.moveRIn(this.getStates()))
        else if("BL" === type)
            this.setState(this.moveBIn(this.getStates()))
        else if("BR" === type)
            this.setState(this.moveBBackIn(this.getStates()))
        else if("FL" === type)
            this.setState(this.moveFBackIn(this.getStates()))
        else if("FR" === type)
            this.setState(this.moveFIn(this.getStates()))
        else if("DL" === type)
            this.setState(this.moveDBackIn(this.getStates()))
        else if("DR" === type)
            this.setState(this.moveDIn(this.getStates()))
        else if("TL" === type)
            this.setState(this.moveUIn(this.getStates()))
        else if("TR" === type)
            this.setState(this.moveUBackIn(this.getStates()))
        else if("F1" === type)
            this.setState(this.setTopMainFaceIn(this.getStates()))
        else if("B1" === type)
            this.setState(this.setDownMainFaceIn(this.getStates()))
        else if("L1" === type)
            this.setState(this.setRightMainFaceIn(this.getStates()))
        else if("L2" === type)
            this.setState(this.setLeftMainFaceIn(this.getStates()))
        else if("S1" === type)
            this.setState(this.setRotateMainFaceLeftIn(this.getStates()))
        else if("S2" === type)
            this.setState(this.setRotateMainFaceRightIn(this.getStates()))
    }



    moveRIn(newState){
        let u=newState[0];
        let f=newState[1];
        let l=newState[2];
        let r=newState[3];
        let d=newState[4];
        let b=newState[5];

        let upper = u.slice()
        let front = f.slice()
        let down = d.slice()
        let back = b.slice()

        r=this.rotateClockWise(r.slice())

        u[2]=front[2];u[5]=front[5];u[8]=front[8];
        f[2]=down[2];f[5]=down[5];f[8]=down[8];
        d[2]=back[6];d[5]=back[3];d[8]=back[0];
        b[0]=upper[8];b[3]=upper[5];b[6]=upper[2];

        return [u,f,l,r,d,b]
    }
    moveRBackIn(newState){
        let u=newState[0];
        let f=newState[1];
        let l=newState[2];
        let r=newState[3];
        let d=newState[4];
        let b=newState[5];

        let upper = u.slice()
        let front = f.slice()
        let down = d.slice()
        let back = b.slice()

        r=this.rotateAntiClockWise(r.slice())

        u[2]=back[6];u[5]=back[3];u[8]=back[0];
        f[2]=upper[2];f[5]=upper[5];f[8]=upper[8];
        d[2]=front[2];d[5]=front[5];d[8]=front[8];
        b[0]=down[8];b[3]=down[5];b[6]=down[2];

        return [u,f,l,r,d,b]
    }
    moveUIn(newState){
        let u=newState[0];
        let f=newState[1];
        let l=newState[2];
        let r=newState[3];
        let d=newState[4];
        let b=newState[5];

        let front = f.slice()
        let left = l.slice()
        let right = r.slice()
        let back = b.slice()

        u=this.rotateClockWise(u.slice())

        l[0]=front[0];l[1]=front[1];l[2]=front[2];
        f[0]=right[0];f[1]=right[1];f[2]=right[2];
        r[0]=back[0];r[1]=back[1];r[2]=back[2];
        b[0]=left[0];b[1]=left[1];b[2]=left[2];

        return [u,f,l,r,d,b]
    }
    moveUBackIn(newState){
        let u=newState[0];
        let f=newState[1];
        let l=newState[2];
        let r=newState[3];
        let d=newState[4];
        let b=newState[5];
        let front = f.slice()
        let left = l.slice()
        let right = r.slice()
        let back = b.slice()

        u=this.rotateAntiClockWise(u.slice())

        l[0]=back[0];l[1]=back[1];l[2]=back[2];
        f[0]=left[0];f[1]=left[1];f[2]=left[2];
        r[0]=front[0];r[1]=front[1];r[2]=front[2];
        b[0]=right[0];b[1]=right[1];b[2]=right[2];

        return [u,f,l,r,d,b]
    }
    moveDIn(newState){
        let u=newState[0];
        let f=newState[1];
        let l=newState[2];
        let r=newState[3];
        let d=newState[4];
        let b=newState[5];

        let front = f.slice()
        let left = l.slice()
        let right = r.slice()
        let back = b.slice()

        d=this.rotateClockWise(d.slice())

        l[6]=back[6];l[7]=back[7];l[8]=back[8];
        f[6]=left[6];f[7]=left[7];f[8]=left[8];
        r[6]=front[6];r[7]=front[7];r[8]=front[8];
        b[6]=right[6];b[7]=right[7];b[8]=right[8];

        return [u,f,l,r,d,b]
    }

    moveDBackIn(newState){
        let u=newState[0];
        let f=newState[1];
        let l=newState[2];
        let r=newState[3];
        let d=newState[4];
        let b=newState[5];

        let front = f.slice()
        let left = l.slice()
        let right = r.slice()
        let back = b.slice()

        d=this.rotateAntiClockWise(d.slice())

        l[6]=front[6];l[7]=front[7];l[8]=front[8];
        f[6]=right[6];f[7]=right[7];f[8]=right[8];
        r[6]=back[6];r[7]=back[7];r[8]=back[8];
        b[6]=left[6];b[7]=left[7];b[8]=left[8];

        return [u,f,l,r,d,b]
    }
    moveBIn(newState){
        let u=newState[0];
        let f=newState[1];
        let l=newState[2];
        let r=newState[3];
        let d=newState[4];
        let b=newState[5];

        let upper = u.slice()
        let left = l.slice()
        let right = r.slice()
        let down = d.slice()

        b=this.rotateClockWise(b.slice())

        u[0]=right[2];u[1]=right[5];u[2]=right[8];
        l[0]=upper[2];l[3]=upper[1];l[6]=upper[0];
        r[2]=down[8];r[5]=down[7];r[8]=down[6];
        d[6]=left[0];d[7]=left[3];d[8]=left[6];

        return [u,f,l,r,d,b]
    }
    moveBBackIn(newState){
        let u=newState[0];
        let f=newState[1];
        let l=newState[2];
        let r=newState[3];
        let d=newState[4];
        let b=newState[5];

        let upper = u.slice()
        let left = l.slice()
        let right = r.slice()
        let down = d.slice()

        b=this.rotateAntiClockWise(b.slice())


        u[0]=left[6];u[1]=left[3];u[2]=left[0];
        l[0]=down[6];l[3]=down[7];l[6]=down[8];
        r[2]=upper[0];r[5]=upper[1];r[8]=upper[2];
        d[6]=right[8];d[7]=right[5];d[8]=right[2];

        return [u,f,l,r,d,b]
    }
    moveFIn(newState){
        let u=newState[0];
        let f=newState[1];
        let l=newState[2];
        let r=newState[3];
        let d=newState[4];
        let b=newState[5];

        let upper = u.slice()
        let left = l.slice()
        let right = r.slice()
        let down = d.slice()

        f=this.rotateClockWise(f.slice())

        u[6]=left[8];u[7]=left[5];u[8]=left[2];
        l[2]=down[0];l[5]=down[1];l[8]=down[2];
        r[0]=upper[6];r[3]=upper[7];r[6]=upper[8];
        d[0]=right[6];d[1]=right[3];d[2]=right[0];

        return [u,f,l,r,d,b]
    }
    moveFBackIn(newState){
        let u=newState[0];
        let f=newState[1];
        let l=newState[2];
        let r=newState[3];
        let d=newState[4];
        let b=newState[5];

        let upper = u.slice()
        let left = l.slice()
        let right = r.slice()
        let down = d.slice()

        f=this.rotateAntiClockWise(f.slice())

        u[6]=right[0];u[7]=right[3];u[8]=right[6];
        l[2]=upper[8];l[5]=upper[7];l[8]=upper[6];
        r[0]=down[2];r[3]=down[1];r[6]=down[0];
        d[0]=left[2];d[1]=left[5];d[2]=left[8];

        return [u,f,l,r,d,b]
    }

    moveLIn(newState){
        let u=newState[0];
        let f=newState[1];
        let l=newState[2];
        let r=newState[3];
        let d=newState[4];
        let b=newState[5];

        let upper = u.slice()
        let front = f.slice()
        let down = d.slice()
        let back = b.slice()

        l=this.rotateClockWise(l.slice())

        u[0]=back[8];u[3]=back[5];u[6]=back[2];
        f[0]=upper[0];f[3]=upper[3];f[6]=upper[6];
        d[0]=front[0];d[3]=front[3];d[6]=front[6];
        b[2]=down[6];b[5]=down[3];b[8]=down[0];

        return [u,f,l,r,d,b]
    }
    moveLBackIn(newState){
        let u=newState[0];
        let f=newState[1];
        let l=newState[2];
        let r=newState[3];
        let d=newState[4];
        let b=newState[5];

        let upper = newState[0].slice()
        let front = newState[1].slice()
        let down = newState[4].slice()
        let back = newState[5].slice()

        l=this.rotateAntiClockWise(l.slice())

        u[0]=front[0];u[3]=front[3];u[6]=front[6];
        f[0]=down[0];f[3]=down[3];f[6]=down[6];
        d[0]=back[8];d[3]=back[5];d[6]=back[2];
        b[2]=upper[6];b[5]=upper[3];b[8]=upper[0];

        return [u,f,l,r,d,b]
    }
    rotateClockWise(face){
        let returnFace= face.slice()

        returnFace[0]=face[6];
        returnFace[1]=face[3];
        returnFace[2]=face[0];

        returnFace[3]=face[7];
        returnFace[5]=face[1];

        returnFace[6]=face[8];
        returnFace[7]=face[5];
        returnFace[8]=face[2];

        return returnFace;
    }
    rotateAntiClockWise(face){
        var returnFace= face.slice()

        returnFace[0]=face[2];
        returnFace[1]=face[5];
        returnFace[2]=face[8];

        returnFace[3]=face[1];
        returnFace[5]=face[7];

        returnFace[6]=face[0];
        returnFace[7]=face[3];
        returnFace[8]=face[6];

        return returnFace;
    }

    faceUpsideDown(face){
        var returnFace= face.slice()

        returnFace[0]=face[8];
        returnFace[1]=face[7];
        returnFace[2]=face[6];

        returnFace[3]=face[5];
        returnFace[5]=face[3];

        returnFace[6]=face[2];
        returnFace[7]=face[1];
        returnFace[8]=face[0];

        return returnFace;
    }

    setTopMainFaceIn(newState){
        let u=newState[0].slice();
        let f=newState[1].slice();
        let l=newState[2].slice();
        let r=newState[3].slice();
        let d=newState[4].slice();
        let b=newState[5].slice();
        return([this.faceUpsideDown(b),u,this.rotateClockWise(l),this.rotateAntiClockWise(r),f,this.faceUpsideDown(d)])
    }
    setDownMainFaceIn(newState){
        let u=newState[0].slice();
        let f=newState[1].slice();
        let l=newState[2].slice();
        let r=newState[3].slice();
        let d=newState[4].slice();
        let b=newState[5].slice();
        return([f,d,this.rotateAntiClockWise(l),this.rotateClockWise(r),this.faceUpsideDown(b),this.faceUpsideDown(u)])
    }
    setLeftMainFaceIn(newState){
        let u=newState[0].slice();
        let f=newState[1].slice();
        let l=newState[2].slice();
        let r=newState[3].slice();
        let d=newState[4].slice();
        let b=newState[5].slice();
        return([this.rotateAntiClockWise(u),l,b,f,this.rotateClockWise(d),r])
    }
    setRightMainFaceIn(newState){
        let u=newState[0].slice();
        let f=newState[1].slice();
        let l=newState[2].slice();
        let r=newState[3].slice();
        let d=newState[4].slice();
        let b=newState[5].slice();
        return([this.rotateClockWise(u),r,f,b,this.rotateAntiClockWise(d),l])
    }
    setRotateMainFaceRightIn(newState){
        let u=newState[0].slice();
        let f=newState[1].slice();
        let l=newState[2].slice();
        let r=newState[3].slice();
        let d=newState[4].slice();
        let b=newState[5].slice();
        return([this.rotateClockWise(l),this.rotateClockWise(f),this.rotateClockWise(d),this.rotateClockWise(u),this.rotateClockWise(r),this.rotateAntiClockWise(b)])
    }
    setRotateMainFaceLeftIn(newState){
        let u=newState[0].slice();
        let f=newState[1].slice();
        let l=newState[2].slice();
        let r=newState[3].slice();
        let d=newState[4].slice();
        let b=newState[5].slice();
        return([this.rotateAntiClockWise(r),this.rotateAntiClockWise(f),this.rotateAntiClockWise(u),this.rotateAntiClockWise(d),this.rotateAntiClockWise(l),this.rotateClockWise(b)])
    }

}