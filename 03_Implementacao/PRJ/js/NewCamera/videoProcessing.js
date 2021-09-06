class VideoProcessing {

    constructor() {
        this.colors = ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'];
        this.yuv;
        this.c = ['r', 'b', 'w', 'g', 'y', 'o']
        this.detectedColors = [];
    }


    imageToGray(image) {
        this.changeBrightness(image, 2, 50)

        cv.cvtColor(image, image, cv.COLOR_RGBA2GRAY);
    }

    changeBrightness(image, alpha, beta) {
        cv.convertScaleAbs(image, image, alpha, beta)
    }


    operations(image) {
        let ksize = new cv.Size(5, 5);
        let ksize2 = new cv.Size(2, 2);
        let anchor = new cv.Point(-1, -1);
        let M = cv.getStructuringElement(cv.MORPH_CROSS, ksize);
        let M2 = cv.getStructuringElement(cv.MORPH_CROSS, ksize2);

        cv.morphologyEx(image, image, cv.MORPH_CLOSE, M, anchor, 2, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
        cv.dilate(image, image, M2, anchor, 4, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
        cv.morphologyEx(image, image, cv.MORPH_CLOSE, M2, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
        cv.erode(image, image, M2, anchor, 3, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

        M.delete();
        M2.delete();
    }


    canny(image) {
        cv.Canny(image, image, 50, 100, 3, true);
    }

    findContours(imageGray, normalImage) {

        cv.cvtColor(normalImage, this.yuv, cv.COLOR_RGB2YUV);

        let squaresCube = [];

        let medWidth = 0;

        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();

        cv.findContours(imageGray, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

        for (let i = 0; i < contours.size(); ++i) {

            if (squaresCube.length == 9)
                break;

            let ctn = contours.get(i);

            if (this.isSquare(ctn)) {
                let ctn_hrc = hierarchy.intPtr(0, i);

                if (ctn_hrc[3] != -1) {

                    //Find Center of countor
                    let M = cv.moments(ctn);
                    let cX = M["m10"] / M["m00"];
                    let cY = M["m01"] / M["m00"];
                    let area = cv.contourArea(ctn);

                    medWidth += cv.arcLength(ctn, true) / 4;

                    let rotatedRect = cv.minAreaRect(ctn);
                    let vertices = cv.RotatedRect.points(rotatedRect);

                    squaresCube.push([parseInt(cX), parseInt(cY), area, this.getColorsDynamic(ctn), vertices]);
                }

            }
            ctn.delete();
        }

        if (squaresCube != 0) {
            medWidth = medWidth / squaresCube.length;
            this.printCenter(normalImage, squaresCube, squaresCube.length, medWidth)
        }

        contours.delete();
        hierarchy.delete();
    }

    printCenter(image, centers, size, medWidth) {

        if (size >= 7 && size <= 9) {

            let missingSquares = this.estimateMissingSquares(centers)

            if (missingSquares) {

                this.getMissingValues(missingSquares)

                let state = []
                let yuva;

                let color = new cv.Scalar(0, 255, 0);
                let estColor = new cv.Scalar(255, 255, 255);

                for (let i = 0; i < missingSquares.length; i++) {

                    if (missingSquares[i].length == 2) {

                        if (image.cols > missingSquares[i][0] + medWidth / 2 && image.rows > missingSquares[i][1] + medWidth / 2) {
                            cv.rectangle(image, new cv.Point(missingSquares[i][0] - medWidth / 2, missingSquares[i][1] - medWidth / 2),
                                new cv.Point(missingSquares[i][0] + medWidth / 2, missingSquares[i][1] + medWidth / 2), estColor, 0);

                            let rect = new cv.Rect(missingSquares[i][0] - medWidth / 2, missingSquares[i][1] - medWidth / 2,
                                medWidth, medWidth);

                            let cube_face = new cv.Mat();

                            cube_face = this.yuv.roi(rect);
                            yuva = cv.mean(cube_face);

                            state.push(this.colorDetect(yuva[0], yuva[1], yuva[2]));

                            cube_face.delete();
                        }
                        else
                            state.push('w');
                    }
                    else {

                        for (let j = 0; j < 4; j++)
                            cv.line(image, missingSquares[i][4][j], missingSquares[i][4][(j + 1) % 4], color, 2, cv.LINE_AA);

                        state.push(missingSquares[i][3]);
                    }
                }
                this.colors = state;
            }
        }
    }

    estimateMissingSquares(points) {
        let maxX = points.reduce(function (a, b) {
            if (a[0] >= b[0])
                return a
            return b
        })[0]
        let maxY = points.reduce(function (a, b) {
            if (a[1] >= b[1])
                return a
            return b
        })[1]
        let missingSquares = [0, 0, 0, 0, 0, 0, 0, 0, 0]

        let x
        let y
        for (let i = 0; i < points.length; i++) {
            let idx = 0

            y = maxY - points[i][1] 
            x = maxX - points[i][0]

            if (((y > 115 || x > 115) && points[i][2] <= 2000) ||
                ((y > 141 || x > 141) && 2000 < points[i][2] && points[i][2] <= 3000) ||
                ((y > 180 || x > 180) && 3000 < points[i][2] && points[i][2] <= 4000)) {
                missingSquares = null
                break
            }

            if (y < 10) idx += 6
            else if ((y <= 66 && points[i][2] <= 2000) || (y <= 77 && 2000 < points[i][2] && points[i][2] <= 3000) || (y <= 86 && 3000 < points[i][2] && points[i][2] <= 4000)) idx += 3
            else idx += 0

            if (x < 10) idx += 2
            else if ((x <= 66 && points[i][2] <= 2000) || (x <= 77 && 2000 < points[i][2] && points[i][2] <= 3000) || (x <= 86 && 3000 < points[i][2] && points[i][2] <= 4000)) idx += 1
            else idx += 0

            missingSquares[idx] = points[i]
        }

        return missingSquares
    }

    getMissingValues(missingSquares) {
        let missingSquare = missingSquares.indexOf(0)
        while (missingSquare != -1) {
            let xPos
            let yPos
            switch (missingSquare) {
                case 0:
                    if (missingSquares[1] == 0 || missingSquares[2] == 0) {
                        xPos = (missingSquares[3][0] + missingSquares[6][0]) / 2
                        yPos = missingSquares[3][1] - (missingSquares[6][1] - missingSquares[3][1])
                    }
                    else {
                        xPos = missingSquares[1][0] - (missingSquares[2][0] - missingSquares[1][0])
                        yPos = (missingSquares[1][1] + missingSquares[2][1]) / 2
                    }
                    break;
                case 1:
                    if (missingSquares[0] == 0 || missingSquares[2] == 0) {
                        xPos = (missingSquares[4][0] + missingSquares[7][0]) / 2
                        yPos = missingSquares[4][1] - (missingSquares[7][1] - missingSquares[4][1])
                    }
                    else {
                        xPos = (missingSquares[0][0] + missingSquares[2][0]) / 2
                        yPos = (missingSquares[0][1] + missingSquares[2][1]) / 2
                    }
                    break;
                case 2:
                    if (missingSquares[0] == 0 || missingSquares[1] == 0) {
                        xPos = (missingSquares[5][0] + missingSquares[8][0]) / 2
                        yPos = missingSquares[5][1] - (missingSquares[8][1] - missingSquares[5][1])
                    }
                    else {
                        xPos = missingSquares[1][0] + (missingSquares[1][0] - missingSquares[0][0])
                        yPos = (missingSquares[0][1] + missingSquares[1][1]) / 2
                    }
                    break;
                case 3:
                    if (missingSquares[4] == 0 || missingSquares[5] == 0) {
                        xPos = (missingSquares[0][0] + missingSquares[6][0]) / 2
                        yPos = (missingSquares[0][1] + missingSquares[6][1]) / 2
                    }
                    else {
                        xPos = missingSquares[4][0] - (missingSquares[5][0] - missingSquares[4][0])
                        yPos = (missingSquares[4][1] + missingSquares[5][1]) / 2
                    }
                    break;
                case 4:
                    if (missingSquares[3] == 0 || missingSquares[5] == 0) {
                        xPos = (missingSquares[1][0] + missingSquares[7][0]) / 2
                        yPos = (missingSquares[1][1] + missingSquares[7][1]) / 2
                    }
                    else {
                        xPos = (missingSquares[3][0] + missingSquares[5][0]) / 2
                        yPos = (missingSquares[3][1] + missingSquares[5][1]) / 2
                    }
                    break;
                case 5:
                    if (missingSquares[3] == 0 || missingSquares[4] == 0) {
                        xPos = (missingSquares[2][0] + missingSquares[8][0]) / 2
                        yPos = (missingSquares[2][1] + missingSquares[8][1]) / 2
                    }
                    else {
                        xPos = missingSquares[4][0] + (missingSquares[4][0] - missingSquares[3][0])
                        yPos = (missingSquares[3][1] + missingSquares[4][1]) / 2
                    }
                    break;
                case 6:
                    if (missingSquares[7] == 0 || missingSquares[8] == 0) {
                        xPos = (missingSquares[0][0] + missingSquares[3][0]) / 2
                        yPos = missingSquares[3][1] + (missingSquares[3][1] - missingSquares[0][1])
                    }
                    else {
                        xPos = missingSquares[7][0] - (missingSquares[8][0] - missingSquares[7][0])
                        yPos = (missingSquares[7][1] + missingSquares[8][1]) / 2
                    }
                    break;
                case 7:
                    if (missingSquares[6] == 0 || missingSquares[8] == 0) {
                        xPos = (missingSquares[1][0] + missingSquares[4][0]) / 2
                        yPos = missingSquares[4][1] + (missingSquares[4][1] - missingSquares[1][1])
                    }
                    else {
                        xPos = (missingSquares[6][0] + missingSquares[8][0]) / 2
                        yPos = (missingSquares[6][1] + missingSquares[8][1]) / 2
                    }
                    break;
                case 8:
                    if (missingSquares[6] == 0 || missingSquares[7] == 0) {
                        xPos = (missingSquares[2][0] + missingSquares[5][0]) / 2
                        yPos = missingSquares[5][1] + (missingSquares[5][1] - missingSquares[2][1])
                    }
                    else {
                        xPos = missingSquares[7][0] + (missingSquares[7][0] - missingSquares[6][0])
                        yPos = (missingSquares[6][1] + missingSquares[7][1]) / 2
                    }
                    break;
            }
            missingSquares[missingSquare] = [xPos, yPos]
            missingSquare = missingSquares.indexOf(0)
        }
    }

    isSquare(contour) {
        let area = cv.contourArea(contour);
        let perimeter = cv.arcLength(contour, true);
        let areaTeste = Math.pow(perimeter, 2) / 16;

        let increment = 200
        if (areaTeste >= area - increment && areaTeste <= area + increment && area >= 800)
            return true;

        return false;
    }

    colorDetect(y, u, v) {
        let color = -1;
        let minDist = -1;
        for (let i = 0; i < this.detectedColors.length; i++) {
            let dist = Math.sqrt((this.detectedColors[i][0] - y) ** 2 + (this.detectedColors[i][1] - u) ** 2 + (this.detectedColors[i][2] - v) ** 2)
            if (minDist == -1 || dist < minDist) {
                minDist = dist;
                color = this.c[i];
            }
        }

        return color;
    }

    getColorsDynamic(ctn) {
        let yuva;
        let rect;
        let cube_face = new cv.Mat();

        rect = cv.boundingRect(ctn);

        cube_face = this.yuv.roi(rect);
        yuva = cv.mean(cube_face);

        cube_face.delete();

        return this.colorDetect(yuva[0], yuva[1], yuva[2]);
    }

    createMat() {
        this.yuv = new cv.Mat();
    }

    delete() {
        this.yuv.delete();
        this.detectedColors = [];
    }

    getState() {
        return this.colors;
    }

    adquireColorInstante(imagem, x, y, width) {
        let rect = new cv.Rect(x, y, width, width);

        cv.cvtColor(imagem, this.yuv, cv.COLOR_RGB2YUV);

        let save = new cv.Mat();
        save = this.yuv.roi(rect)
        
        let cor = cv.mean(save)
        save.delete();

        let rgbColors = this.yuvTOrgb(cor[0], cor[1], cor[2])

        document.getElementById("circle").style.backgroundColor = 'rgb(' + rgbColors[0] + ',' + rgbColors[1] + ',' + rgbColors[2] + ')';
    }


    adquireColor() {
        if (this.detectedColors.length < 6) {
            var c = document.getElementById("circle").style.backgroundColor;
            var rgb = c.match(/\d+/g);
            
            let yuv = this.YUVfromRGB(rgb[0] , rgb[1], rgb[2]);
            this.detectedColors.push(yuv);

            this.changeBackgroundOfCurrentColor(rgb[0] , rgb[1], rgb[2]);
        }
    }

    setColors(red, blue, white, green, orange, yellow){
        let colorRED = this.YUVfromRGB(red[0], red[1], red[2])
        let colorBLUE = this.YUVfromRGB(blue[0], blue[1], blue[2])
        let colorWHITE = this.YUVfromRGB(white[0], white[1], white[2])
        let colorGREEN = this.YUVfromRGB(green[0], green[1], green[2])
        let colorORANGE = this.YUVfromRGB(orange[0], orange[1], orange[2])
        let colorYELLOW = this.YUVfromRGB(yellow[0], yellow[1], yellow[2])

        this.detectedColors.push(colorRED)
        this.detectedColors.push(colorBLUE)
        this.detectedColors.push(colorWHITE)
        this.detectedColors.push(colorGREEN)
        this.detectedColors.push(colorYELLOW)
        this.detectedColors.push(colorORANGE)
    }

    YUVfromRGB(R, G, B)
    {
        let Y =  0.257 * R + 0.504 * G + 0.098 * B +  16;
        let U = -0.148 * R - 0.291 * G + 0.439 * B + 128;
        let V =  0.439 * R - 0.368 * G - 0.071 * B + 128;

        return [Y, U, V]
    }

    yuvTOrgb(Y, U, V){
        Y -= 16
        U -= 128
        V -= 128

        let R = 1.164 * Y             + 1.596 * V;
        let G = 1.164 * Y - 0.392 * U - 0.813 * V;
        let B = 1.164 * Y + 2.017 * U;

        return [Math.round(R), Math.round(G), Math.round(B)]
    }

    getMessage() {
        switch (this.detectedColors.length) {
            case 0:
                return "Show a red square and click \"Save Color\"";

            case 1:
                return "Show a blue square and click \"Save Color\"";

            case 2:
                return "Show a white square and click \"Save Color\"";

            case 3:
                return "Show a green square and click \"Save Color\"";

            case 4:
                return "Show a yellow square and click \"Save Color\"";

            case 5:
                return "Show a orange square and click \"Save Color\"";

            case 6:
                return "Press the button finalize to save the colors";
        }
    }

    changeBackgroundOfCurrentColor(r, g, b){

        switch (this.detectedColors.length) {
            case 1:
                document.getElementById("redColorShow").style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
                break;
            case 2:
                document.getElementById("blueColorShow").style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
                break;
            case 3:
                document.getElementById("whiteColorShow").style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
                break;
            case 4:
                document.getElementById("greenColorShow").style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
                break;
            case 5:
                document.getElementById("yellowColorShow").style.backgroundColor ='rgb(' + r + ',' + g + ',' + b + ')';
                break;
            case 6:
                document.getElementById("orangeColorShow").style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
                break;
        }
    }

    clearLastColorSquare(){
        switch (this.detectedColors.length ) {
            case 1:
                document.getElementById("redColorShow").style.backgroundColor = '';
                break;
            case 2:
                document.getElementById("blueColorShow").style.backgroundColor = '';
                break;
            case 3:
                document.getElementById("whiteColorShow").style.backgroundColor = '';
                break;
            case 4:
                document.getElementById("greenColorShow").style.backgroundColor = '';
                break;
            case 5:
                document.getElementById("yellowColorShow").style.backgroundColor ='';
                break;
            case 6:
                document.getElementById("orangeColorShow").style.backgroundColor = '';
                break;
        }
    }

    resetColors() {
        this.detectedColors = [];

        document.getElementById("redColorShow").style.backgroundColor = "";
    
        document.getElementById("blueColorShow").style.backgroundColor = "";
    
        document.getElementById("whiteColorShow").style.backgroundColor = "";
    
        document.getElementById("greenColorShow").style.backgroundColor = "";
    
        document.getElementById("yellowColorShow").style.backgroundColor = "";
    
        document.getElementById("orangeColorShow").style.backgroundColor = "";
    }

    areColorsAdquired() {
        return this.detectedColors.length == 6;
    }

    clearLastColor(){
        this.clearLastColorSquare();
        this.detectedColors.pop();
    }

    submitColors(){
        submitColors(
            document.getElementById("redColorShow").style.backgroundColor.match(/\d+/g),
            document.getElementById("blueColorShow").style.backgroundColor.match(/\d+/g),
            document.getElementById("whiteColorShow").style.backgroundColor.match(/\d+/g),
            document.getElementById("greenColorShow").style.backgroundColor.match(/\d+/g),
            document.getElementById("yellowColorShow").style.backgroundColor.match(/\d+/g),
            document.getElementById("orangeColorShow").style.backgroundColor.match(/\d+/g),
            document.getElementById("sliderA").value,
            document.getElementById("sliderB").value)
    }

    setAllColors(red, blue, white, green, orange, yellow){
        document.getElementById("redColorShow").style.backgroundColor = 'rgb(' + red[0] + ',' + red[1] + ',' + red[2] + ')';

        document.getElementById("blueColorShow").style.backgroundColor = 'rgb(' + blue[0] + ',' + blue[1] + ',' + blue[2] + ')';

        document.getElementById("whiteColorShow").style.backgroundColor = 'rgb(' + white[0] + ',' + white[1] + ',' + white[2] + ')';

        document.getElementById("greenColorShow").style.backgroundColor = 'rgb(' + green[0] + ',' + green[1] + ',' + green[2] + ')';

        document.getElementById("yellowColorShow").style.backgroundColor ='rgb(' + yellow[0] + ',' + yellow[1] + ',' + yellow[2] + ')';

        document.getElementById("orangeColorShow").style.backgroundColor = 'rgb(' + orange[0] + ',' + orange[1] + ',' + orange[2] + ')';
    }
}