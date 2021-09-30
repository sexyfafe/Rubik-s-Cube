import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';

export class Cube3D {
    constructor(x, y, z, state) {
        this.currentCube = [];
        this.distance = 2.38;

        this.currentRotation = "";
        this.currentRotationBack = "";
        this.amountAlreadyRotated = 0;
        this.rotationPerFrame = 5;
        this.scale = 2;

        this.renderCountToFinnish = 0;
        this.isFinnishRendering = false;

        this.matrixCube = state;

        this.cube = [];
        this.realPositions = [];
        for(let i = 0; i < 27; i++){
            this.cube.push(new THREE.Group());
            this.realPositions.push(i);
        }

        this.numberCubeRender = 0;
        this.createCube(x, y, z)
    }

    loadGLTFCube(path, x, y, z, isLast) {
        var loader = new GLTFLoader();

        loader.load(path, (gltf) => {
            let Mesh = gltf.scene;
            Mesh.scale.set(this.scale, this.scale, this.scale);
            Mesh.position.x = x;
            Mesh.position.y = y;
            Mesh.position.z = z;

            this.currentCube.push(Mesh);   

            this.numberCubeRender++;

            if(this.numberCubeRender == 27)
                this.runAll();
        });
    }

    getIsFinnishRendering(){
        return this.isFinnishRendering;
    }
    
    loadGLTFFaces(path, x, y, z, index, isLast) {
        var loader = new GLTFLoader();

        loader.load(path, (gltf) => {
            let Mesh = gltf.scene;
            Mesh.scale.set(this.scale, this.scale, this.scale);
            Mesh.position.x = x;
            Mesh.position.y = y;
            Mesh.position.z = z;
            this.cube[index].add(Mesh);
 
            if(isLast){
                this.renderCountToFinnish++;
                this.cube[index].add(this.currentCube[index]);
                scene.add(this.cube[index]);

                if(this.renderCountToFinnish === 26)
                    this.isFinnishRendering = true;
            }
        });
    }

    createCube(posX, posY, posZ) {
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                for (let z = -1; z < 2; z++) {
                    this.loadGLTFCube('./model/CUBE/Cube.gltf', parseFloat(posX + (x * this.distance * this.scale)), parseFloat(posY + (y * this.distance * this.scale)), parseFloat(posZ + (z * this.distance * this.scale)));
                }
            }
        }  
    }

    rotateAllFacesVertical(toFront){
        this.rotateLeft(toFront);
        this.rotateMiddleVertical(toFront);
        this.rotateRight(toFront);
    }

    rotateAllFacesHorizontal(toLeft){
        this.rotateTop(toLeft);
        this.rotateMiddleHorizontal(toLeft);
        this.rotateBottom(toLeft);
    }

    rotateAllFacesSideWays(toLeft){
        this.rotateFront(toLeft);
        this.rotateSideWays(toLeft);
        this.rotateBack(toLeft);
    }

    rotateSideWays(toLeft){
        let array = [1, 4, 7, 10, 13, 16, 19, 22, 25];

        for(let i = 0; i < 9; i++){
            this.cube[this.realPositions[array[i]]].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), THREE.Math.degToRad((toLeft)? this.rotationPerFrame : -this.rotationPerFrame));
        }

        if(this.amountAlreadyRotated+this.rotationPerFrame===90){
            if(toLeft)
                this.adjustTwoArrays([1, 7, 25, 19], [10, 4, 16, 22])
            else
                this.adjustTwoArrays([1, 19, 25, 7], [10, 22, 16, 4])
        }
    }

    rotateMiddleVertical(toFront) {

        for(let i = 9; i < 18; i++){
            this.cube[this.realPositions[i]].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), THREE.Math.degToRad((toFront)? this.rotationPerFrame : -this.rotationPerFrame));
        }
        if(this.amountAlreadyRotated+this.rotationPerFrame===90){
            if(toFront)
                this.adjustTwoArrays([9, 11, 17, 15], [10, 14, 16, 12])
            else
                this.adjustTwoArrays([9, 15, 17, 11], [10, 12, 16, 14])
        }
    }

    rotateMiddleHorizontal(toLeft){
        let array = [3, 4, 5, 12, 13, 14, 21, 22, 23];

        for(let i = 0; i < 9; i++){
            this.cube[this.realPositions[array[i]]].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), THREE.Math.degToRad((toLeft)? -this.rotationPerFrame : this.rotationPerFrame));
        }
        if(this.amountAlreadyRotated+this.rotationPerFrame===90){
            if(toLeft)
                this.adjustTwoArrays([14, 22, 12, 4], [5, 23, 21, 3])
            else
                this.adjustTwoArrays([14, 4, 12, 22], [5, 3, 21, 23])
        }

    }


    rotateLeft(toFront) {
        for(let i = 0; i < 9; i++){
            this.cube[this.realPositions[i]].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), THREE.Math.degToRad((toFront)? this.rotationPerFrame : -this.rotationPerFrame));
        }
        if(this.amountAlreadyRotated+this.rotationPerFrame===90){
            if(toFront)
                this.adjustTwoArrays([0, 2, 8, 6], [1, 5, 7, 3])
            else
                this.adjustTwoArrays([0, 6, 8, 2], [1, 3, 7, 5])
        }

    }

    rotateRight(toFront) {
        for(let i = 18; i < 27; i++){
            this.cube[this.realPositions[i]].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), THREE.Math.degToRad((toFront)? this.rotationPerFrame : -this.rotationPerFrame));
        }
        if(this.amountAlreadyRotated+this.rotationPerFrame===90){
            if(toFront)
                this.adjustTwoArrays([18, 20, 26, 24], [19, 23, 25, 21])
            else
                this.adjustTwoArrays([18, 24, 26, 20], [19, 21, 25, 23])
        }

    }

    rotateBack(toLeft){
        for(let i = 0; i <= 24; i+=3){
            this.cube[this.realPositions[i]].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), THREE.Math.degToRad((toLeft)? this.rotationPerFrame : -this.rotationPerFrame));
        }
        if(this.amountAlreadyRotated+this.rotationPerFrame===90){
            if(toLeft)
                this.adjustTwoArrays([3, 15, 21, 9],[0, 6, 24, 18])
            else
                this.adjustTwoArrays([0, 18, 24, 6],[9, 21, 15, 3])
        }

    }

    rotateFront(toLeft){
        let array = [2, 5, 8, 11, 14, 17, 20, 23, 26];

        for(let i = 0; i < 9; i++){
            this.cube[this.realPositions[array[i]]].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), THREE.Math.degToRad((toLeft)? this.rotationPerFrame : -this.rotationPerFrame));
        }
        if(this.amountAlreadyRotated+this.rotationPerFrame===90){
            if(toLeft)
                this.adjustTwoArrays([2, 8, 26, 20], [11, 5, 17, 23])
            else
                this.adjustTwoArrays([2, 20, 26, 8], [11, 23, 17, 5])
        }

    }

    rotateBottom(toLeft){
        let array = [0, 1, 2, 9, 10, 11, 18, 19, 20];

        for(let i = 0; i < 9; i++){
            this.cube[this.realPositions[array[i]]].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), THREE.Math.degToRad((toLeft)? -this.rotationPerFrame : this.rotationPerFrame));
        }
        if(this.amountAlreadyRotated+this.rotationPerFrame===90){
            if(toLeft)
                this.adjustTwoArrays([2, 20, 18, 0], [11, 19, 9, 1])
            else
                this.adjustTwoArrays([2, 0, 18, 20], [11, 1, 9, 19])
        }

    }

    rotateTop(toLeft){
        let array = [6, 7, 8, 15, 16, 17, 24, 25, 26];

        for(let i = 0; i < 9; i++){
            this.cube[this.realPositions[array[i]]].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), THREE.Math.degToRad((toLeft)? -this.rotationPerFrame : this.rotationPerFrame));
        }
        if(this.amountAlreadyRotated+this.rotationPerFrame===90){
            if(toLeft)
                this.adjustTwoArrays([17, 25, 15, 7], [8, 26, 24, 6])
            else
                this.adjustTwoArrays([17, 7, 15, 25], [8, 6, 24, 26])
        }

    }

    adjustTwoArrays(array, secondArray){
        this.adjustCube(array)
        this.adjustCube(secondArray)  
    }

    adjustCube(array){
        let save = this.realPositions[array[0]];

        for(let i = 0; i < array.length - 1; i++){
            this.realPositions[array[i]] = this.realPositions[array[i + 1]]
        }

        this.realPositions[array[array.length - 1]] = save;
    }

    clearScene(){
        for(let i = 0 ; i < this.cube.length; i++)
            scene.remove(this.cube[i])

        this.numberCubeRender = 0;
        this.createCube(0, 0, 0)   
    }

    createGroupCube(index, arrayChar, arrayString){
        let arr = ["LEFT","RIGHT","FRONT","BACK","TOP","BOTTOM"];

        let x = this.currentCube[index].position.x;
        let y = this.currentCube[index].position.y;
        let z = this.currentCube[index].position.z;

        
        for(let i = 0; i < arrayChar.length; i++){
            this.loadGLTFFaces(this.convertToPath(arrayChar[i], arrayString[i]), x, y, z, index, false);   
            arr = arr.filter(e => e !== arrayString[i]);
        }

        for(let i = 0; i < arr.length; i++){
            this.loadGLTFFaces(this.convertToPath('bl', arr[i]), x, y, z, index, i == arr.length - 1)  
        }
    }

    runAll(){
        let array = this.matrixCube.getStates();
        let u = array[0];
        let f = array[1];
        let l = array[2];
        let r = array[3];
        let d = array[4];
        let b = array[5];

        let index = -1;
        this.createGroupCube(++index, [l[6], d[6], b[8]], ["LEFT", "BOTTOM", "BACK"]);
        this.createGroupCube(++index, [l[7], d[3]], ["LEFT", "BOTTOM"]);
        this.createGroupCube(++index, [l[8], d[0], f[6]], ["LEFT", "BOTTOM","FRONT"]);
        this.createGroupCube(++index, [l[3], b[5]], ["LEFT", "BACK"]);
        this.createGroupCube(++index, [l[4]], ["LEFT"]);
        this.createGroupCube(++index, [l[5], f[3]], ["LEFT", "FRONT"]);
        this.createGroupCube(++index, [l[0], u[0], b[2]], ["LEFT", "TOP","BACK"]);
        this.createGroupCube(++index, [l[1], u[3]], ["LEFT", "TOP"]);
        this.createGroupCube(++index, [l[2], f[0], u[6]], ["LEFT", "FRONT","TOP"]);
        this.createGroupCube(++index, [d[7], b[7]], ["BOTTOM", "BACK"]);
        this.createGroupCube(++index, [d[4]], ["BOTTOM"]);
        this.createGroupCube(++index, [f[7], d[1]], ["FRONT", "BOTTOM"]);
        this.createGroupCube(++index, [b[4]], ["BACK"]);
        //CenterCube
        ++index
        this.createGroupCube(++index, [f[4]], ["FRONT"]);
        this.createGroupCube(++index, [u[1], b[1]], ["TOP", "BACK"]);
        this.createGroupCube(++index, [u[4]], ["TOP"]);
        this.createGroupCube(++index, [u[7], f[1]], ["TOP", "FRONT"]);
        this.createGroupCube(++index, [d[8], r[8], b[6]], ["BOTTOM", "RIGHT","BACK"]);
        this.createGroupCube(++index, [d[5], r[7]], ["BOTTOM", "RIGHT"]);
        this.createGroupCube(++index, [d[2], r[6], f[8]], ["BOTTOM", "RIGHT","FRONT"]);
        this.createGroupCube(++index, [b[3], r[5]], ["BACK", "RIGHT"]);
        this.createGroupCube(++index, [r[4]], ["RIGHT"]);
        this.createGroupCube(++index, [f[5], r[3]], ["FRONT", "RIGHT"]);
        this.createGroupCube(++index, [b[0], u[2], r[2]], ["BACK", "TOP","RIGHT"]);
        this.createGroupCube(++index, [u[5], r[1]], ["TOP", "RIGHT"]);
        this.createGroupCube(++index, [f[2], u[8], r[0]], ["FRONT", "TOP","RIGHT"]);
    }

    convertToPath(character, orientation){
        let path = './model/CUBE/' + orientation + '/' + orientation + "_";

        switch(character){
            case 'w':
                path += 'WHITE'
                break;
             case 'g':
                path += 'GREEN'
                break;
            case 'y':
                path += 'YELLOW'
                break;
            case 'o':
                path += 'ORANGE'
                break;
            case 'r':
                path += 'RED'
                break;
            case 'b':
                path += 'BLUE'
                break;   
            case 'bl':
                path += 'BLACK'
                break;
        }
        path += '.gltf';

        return path;
    }
}

var renderer = new THREE.WebGLRenderer({ antialias : true });
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
var scene = new THREE.Scene();
let light;
let controls;

function setScene() {
    function init() {
        //Setting the basic
        var scene3d = document.getElementById("render3Dcube");
        scene.background = new THREE.Color("rgb(35, 35, 35)");
        camera.position.set(0, 2, 30);
        renderer.setSize(scene3d.clientWidth, scene3d.clientHeight);
        scene3d.appendChild(renderer.domElement)

        // controls
        controls = new OrbitControls(camera, renderer.domElement);
    }

    //Create light source
    function setLight() {
        light = new THREE.AmbientLight(0xffffff); // soft white light
        scene.add(light);
    }

    setLight();
    init();
}
setScene()


//Called every frame
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render()

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth / 2 , window.innerHeight / 2 );

}