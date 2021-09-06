
//Square
//Saves all the necessary information the square needs
var context = document.getElementById('canvas2DCube').getContext("2d");
var canvas = document.getElementById('canvas2DCube');

class Square{
    constructor(x, y, size, color, strokeValue){
        this.color = color;
        this.x = x;
        this.y = y;
        this.size = size;
        this.strokeValue = strokeValue;
        this.nextsColors = ["red", "white", "green", "blue", "yellow", "orange"];

        this.display();
    }

    setColor(color){
        this.color = color;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getColor(){
        return this.color;
    }

    display(){
        var cornerRadius = canvas.width * this.strokeValue;

        context.beginPath();
        
        // Set faux rounded corners
        context.lineJoin = "round";
        context.lineWidth = cornerRadius;

        // Change origin and dimensions to match true size (a stroke makes the shape a bit larger)
        context.fillStyle = this.color;
        context.strokeRect(this.x+(cornerRadius/2), this.y+(cornerRadius/2), this.size-cornerRadius , this.size-cornerRadius);
        context.fillRect(this.x+(cornerRadius/2), this.y+(cornerRadius/2), this.size-cornerRadius , this.size-cornerRadius);

        context.closePath();
    }

    isClickInside(x, y){
        if((x >= this.x  && x <= this.x + this.size) && (y >= this.y  && y <= this.y + this.size ))
            return true;
            
        return false;    
    }

    nextColor(){
        for(let i = 0; i < this.nextsColors.length; i++){
            if(this.color == this.nextsColors[i]){
                this.color = this.nextsColors[(i + 1) % this.nextsColors.length];
                return this.color;
            }
        }
    }
}

//Face
class Face{
    constructor(x, y, size, color, strokeValue){
        this.colors_dictionary={'w':["white",], 'g':["green",], 'o':["orange",], 'r':["red",], 'y':["yellow",], 'b':["blue",], };
        this.squares = [];
        let cont = 0;

        //This method creates a 3 x 3 grid
        for(let lin = 1; lin <= 3; lin++){
            for(let col = 1; col <= 3; col++){
                this.squares[cont] =  new Square((col * size) + x, (lin * size) + y, size, this.colors_dictionary[color[cont]], strokeValue);
                cont ++;
            }
        }
    }

    setState(state){
        for(let i = 0; i < this.squares.length; i++)
            this.squares[i].setColor(this.colors_dictionary[state[i]]);
    }

    setFace(face){
        this.squares = face;
    }

    getFace(){
        return this.squares;
    }

    getSquare(i){
        return this.squares[i];
    }

    display(){
        for(let i = 0; i < this.squares.length; i++)
            this.squares[i].display();
    }
}

class CreatedImage{
    constructor(x, y, sizeX, sizeY, path, operation){
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.operation = operation;

        this.base_image = new Image();
        this.base_image.src = path;
    }

    getOperation(){
        return this.operation;
    }

    draw(){
        context.drawImage(this.base_image, this.x, this.y, this.sizeX, this.sizeY);
    }

    checkIfIsInside(posX, posY){
        if((posX >= this.x  && posX <= this.x + this.sizeX) && (posY >= this.y  && posY <= this.y + this.sizeY ))
            return true;
            
        return false;
    }
}


//Cube
class Cube2D{

    createCube(x, y, size, state, strokeValue){
        let distance = 5;
        this.size = size;
        this.faces = [];
        //Position of each face of the 2D cube

        this.positionSquares = [[x,y - distance],           //Top - 0
        [x, y + (size * 3)],                                //Front - 1
        [x - (size * 3) - distance, y + (size * 3) ],       //Left - 2
        [x + (size * 3) + distance, y + (size * 3) ],       //Right - 3
        [x, y + (size * 6) + distance],                     //Down - 4
        [x + (size * 6) + distance * 2, y + (size * 3) ]];  //Back - 5

        //Add the faces in there position and state to the cube
        for(let i = 0; i < this.positionSquares.length ; i++)
            this.faces[i] = new Face(this.positionSquares[i][0], this.positionSquares[i][1], this.size, state[i], strokeValue);

        this.createArrows()
    }

    createArrows(){
        this.images = []
        let size = canvas.width / 22;
        let increment = 29;

        let squares = this.faces[0].getFace();
        this.images[0] = new CreatedImage(squares[0].getX(), squares[0].getY() - increment, size, size, "images/arrowDown.png", "LF");
        this.images[1] = new CreatedImage(squares[2].getX(), squares[2].getY() - increment, size, size, "images/arrowDown.png", "RF");
    
        squares = this.faces[2].getFace();
        this.images[2] = new CreatedImage(squares[0].getX() - increment,squares[0].getY(), size, size, "images/arrowRight.png", "TR");
        this.images[3] = new CreatedImage(squares[6].getX() - increment, squares[6].getY(), size, size, "images/arrowRight.png", "DR");
    
        squares = this.faces[4].getFace();
        this.images[4] = new CreatedImage(squares[6].getX(), squares[6].getY() + increment * 1.3, size, size, "images/arrowUp.png", "LB");
        this.images[5] = new CreatedImage(squares[8].getX(), squares[8].getY() + increment * 1.3, size, size, "images/arrowUp.png", "RB");
    
        squares = this.faces[5].getFace();
        this.images[6] = new CreatedImage(squares[2].getX() + increment * 1.3, squares[2].getY(),size, size, "images/arrowLeft.png", "TL");
        this.images[7] = new CreatedImage(squares[8].getX()  + increment * 1.3, squares[8].getY(), size, size, "images/arrowLeft.png", "DL");
        this.images[10] = new CreatedImage(squares[0].getX(), squares[0].getY() - increment, size, size, "images/arrowCurveRL.png", "BL");
        this.images[11] = new CreatedImage(squares[2].getX(), squares[2].getY() - increment, size, size, "images/arrowCurveLR.png", "BR");
   

        squares = this.faces[3].getFace();
        this.images[8] = new CreatedImage(squares[0].getX(), squares[0].getY() - increment, size, size, "images/arrowCurveLR.png", "FR");
        this.images[12] = new CreatedImage(squares[0].getX() + increment * 1.3, squares[0].getY() - increment * 1.3 * 2, size, size, "images/arrowCurveLR.png", "S2");
        squares = this.faces[2].getFace();
        this.images[9] = new CreatedImage(squares[2].getX() , squares[2].getY() - increment, size, size, "images/arrowCurveRL.png", "FL");
        this.images[13] = new CreatedImage(squares[2].getX() - increment * 1.3, squares[2].getY() - increment * 1.3 * 2, size, size, "images/arrowCurveRL.png", "S1");
   
    }

    drawCube(state){
        var r_a = 1; 
        context.fillStyle = "rgba(35, 35, 35, " + r_a + ")";
        context.fillRect(0, 0, canvas.width, canvas.height);

        for(let i = 0 ; i < this.faces.length; i++){
            this.faces[i].setState(state[i]);
            this.faces[i].display();
        }  

        for(let i = 0; i < this.images.length; i++)
            this.images[i].draw();
    }

    mousePressedImage(event){
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        for(let i = 0; i < this.images.length; i++)
            if(this.images[i].checkIfIsInside(x, y))
                return this.images[i].getOperation();

    }

    mousePressedSquare(event){
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        for(let i = 0; i < this.faces.length; i++){
            for(let j = 0; j < this.faces[i].getFace().length; j++){
                let squares = this.faces[i].getFace();
                if(squares[j].isClickInside(x, y))
                    return [squares[j].nextColor(), i, j];
            }
        }

        return null
    }

    mousePressCenterPiece(event){
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        for(let i = 0; i < this.faces.length; i++){
            let squares = this.faces[i].getFace();
            if(squares[4].isClickInside(x, y))
                return i;
        }

        return null
    }

}





