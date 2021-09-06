class CameraAnimation {

    animation(path){
        document.getElementById("animationCube").src = path;
    }

    playAnimation(number){
        switch(number){
            case 1:
                this.animation("images/Animations/up.gif");
                break;
            case 2:
                this.animation("images/Animations/down.gif");
                break;
            case 3:
                this.animation("images/Animations/right.gif");
                break;
            case 4:
                this.animation("images/Animations/left.gif");
                break;
            case 5:
                this.animation("images/Animations/testeLef.gif");
                break;
            case 6:
                this.animation("images/Animations/testRigth.gif");
                break;
        }
        
    }

}

