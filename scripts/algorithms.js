

function contrastAdj() {
// uses contrast adjustment formula In = {[(b-a)/(max-min)] * (I0-min)} + a
let a = 0, b = 255;
let min = 40, max = 215;

for(let i = 0; i < IMAGE_HEIGHT; i++) {
   for(let j = 0; j < IMAGE_WIDTH; j++) {
     image[i][j][red] = ( ((b-a)/(max-min)) * (image[i][j][red]-min) ) + a;
     image[i][j][green] = ( ((b-a)/(max-min)) * (image[i][j][green]-min) ) + a;
     image[i][j][blue] = ( ((b-a)/(max-min)) * (image[i][j][blue]-min) ) + a;
   }
}
}


function nrOfPixels() {
//counts the intensity pixels in an image
let colorChannel = red; // in a grayscale image, red component is equal with the other 2
let colorIntensity = [];
for(let i = 0; i < 256; i++)
   colorIntensity[i] = 0;
for(let k = 0; k < 256; k++)
   for(let i = 0; i < IMAGE_HEIGHT; i++) 
      for(let j = 0; j < IMAGE_WIDTH; j++) 
	     if(image[i][j][colorChannel] == k)
		    colorIntensity[k]++;
console.log("Intensity levels(0-255) of a color:");
console.log(colorIntensity); // check console
}


function mirrorEffect() {
// mirrors an image on the 2 axis(x, y)
// mirror via the x axis
for(let i = 0; i < IMAGE_HEIGHT / 2; i++) {
    for(let j = 0; j < IMAGE_WIDTH; j++) {
        let tmp = image[i][j];
        image[i][j] = image[IMAGE_HEIGHT - i - 1][j];
        image[IMAGE_HEIGHT - i - 1][j] = tmp;
    }
}

// mirror via the y axis
for(let i = 0; i < IMAGE_HEIGHT; i++) {
    for(let j = 0; j < IMAGE_WIDTH / 2; j++) {
        let tmp = image[i][j];
        image[i][j] = image[i][IMAGE_WIDTH - j - 1];
        image[i][IMAGE_WIDTH - j - 1] = tmp;
    }
}
}


function negativeEffect() {
// negates the color of an image
for(let i = 0; i < IMAGE_HEIGHT; i++) {
   for(let j = 0; j < IMAGE_WIDTH; j++) {
     image[i][j][red] = 255 - image[i][j][red];
     image[i][j][green] = 255 - image[i][j][green];
     image[i][j][blue] = 255 - image[i][j][blue];
   }
}
}


function pixelateEffect() {
// pixelates an image based on the average value in a n*n matrix
const matrixSize = 5*5; // size of the checking matrix, try a higher matrix value to see the image more pixelated
let redComp = [], greenComp = [], blueComp = [];
let avgRed = 0, avgGreen = 0, avgBlue = 0;
const uniDimensionalSize = Math.sqrt(matrixSize);
for (let i = 0; i < IMAGE_HEIGHT; i += uniDimensionalSize) {
    for (let j = 0; j < IMAGE_WIDTH; j += uniDimensionalSize) {
        let columnValue = 0, lineValue = 0;
        for(let m = 0; m < matrixSize; m++) {
            if((i + lineValue) < IMAGE_HEIGHT && (j + columnValue) < IMAGE_WIDTH) {
                redComp[m] = image[i + lineValue][j + columnValue][red];
                greenComp[m] = image[i + lineValue][j + columnValue][green];
                blueComp[m] = image[i + lineValue][j + columnValue][blue];
            } else {
                redComp[m] = image[i][j][red];
                greenComp[m] = image[i][j][green];
                blueComp[m] = image[i][j][blue];
            }
            avgRed += redComp[m];
            avgGreen += greenComp[m];
            avgBlue += blueComp[m];

            columnValue++;
            if(columnValue == uniDimensionalSize) {
                columnValue = 0;
                lineValue++;
            }
        }
        avgRed = Math.round(avgRed / redComp.length);
        avgGreen = Math.round(avgGreen / greenComp.length);
        avgBlue = Math.round(avgBlue / blueComp.length);
        columnValue = 0; lineValue = 0;
        for(let m = 0; m < matrixSize; m++) {
            if((i + lineValue) < IMAGE_HEIGHT && (j + columnValue) < IMAGE_WIDTH) {
                image[i + lineValue][j + columnValue][red] = avgRed;
                image[i + lineValue][j + columnValue][green] = avgGreen;
                image[i + lineValue][j + columnValue][blue] = avgBlue;
            } else {
                image[i][j][red] = avgRed;
                image[i][j][green] = avgGreen;
                image[i][j][blue] = avgBlue;
            }
            columnValue++;
            if(columnValue == uniDimensionalSize) {
                columnValue = 0;
                lineValue++;
            }
        }
    }
}
}


function medianFilter() {
// used for image noise filtering, precisely salt & pepper
let redComp = [], greenComp = [], blueComp = [];
let dirI = [-1, -1, 0, 1, 1, 1, 0, -1], dirJ = [0, 1, 1, 1, 0, -1, -1, -1];
for (let i = 0; i < IMAGE_HEIGHT; i++) {
    for (let j = 0; j < IMAGE_WIDTH; j++) {
	redComp[0] = image[i][j][red];
	greenComp[0] = image[i][j][green];
	blueComp[0] = image[i][j][blue];
        for(let k = 0; k < 8; k++) {
		let distI = i + dirI[k], distJ = j + dirJ[k];
		if(distI < 0 || distI >= IMAGE_HEIGHT || distJ < 0 || distJ >= IMAGE_WIDTH) {
			redComp[k+1] = 0;
			greenComp[k+1] = 0;
			blueComp[k+1] = 0;
		} else {
			redComp[k+1] = image[distI][distJ][red];
			greenComp[k+1] = image[distI][distJ][green];
			blueComp[k+1] = image[distI][distJ][blue];
       		}
       	}
	// sorting the pixel intensity
	redComp.sort(function(a, b){return a - b});
	greenComp.sort(function(a, b){return a - b});
	blueComp.sort(function(a, b){return a - b});

	// takes the middle value(4) and assigns it
	image[i][j][red] = redComp[4];
	image[i][j][green] = greenComp[4];
	image[i][j][blue] = blueComp[4];
    }
}
}


function prewittDetection() {
// prewitt edge detection with 2 masks
let grayscale = red;
let pmask = [[-1,-1,-1], [0,0,0], [1,1,1]] , qmask = [[-1,0,1], [-1,0,1], [-1,0,1]];
let dirI = [-1, -1, -1,  0, 0, 0,  1, 1, 1], dirJ = [-1, 0, 1,  -1, 0, 1,  -1, 0, 1];
let pMatrix = [], qMatrix = [], prewittMatrix = [];
for(let i = 0; i < IMAGE_HEIGHT; i++) {
	pMatrix[i] = new Array(IMAGE_WIDTH);
	qMatrix[i] = new Array(IMAGE_WIDTH);
	prewittMatrix[i] = new Array(IMAGE_WIDTH);
}

for (let i = 1; i < IMAGE_HEIGHT - 1; i++) {
    for (let j = 1; j < IMAGE_WIDTH - 1; j++) {
	let lineVal = 0, colVal = 0;
	let gX = 0, gY = 0;
     	for(let k = 0; k < 9; k++) {
		let distI = i + dirI[k], distJ = j + dirJ[k];
		gY += (image[distI][distJ][grayscale] * pmask[lineVal][colVal]);
		gX += (image[distI][distJ][grayscale] * qmask[lineVal][colVal]);
		if(++colVal == 3) {
			colVal = 0;
			lineVal++;
		}
       	}

	gY = Math.abs(gY);
	pMatrix[i][j] = gY;

	gX = Math.abs(gX);
	qMatrix[i][j] = gX;

	let gPrewitt = Math.round( Math.sqrt( (gX * gX) + (gY * gY) ) );
	prewittMatrix[i][j] = gPrewitt;
    }
}
for (let i = 0; i < IMAGE_HEIGHT; i++) {
    for (let j = 0; j < IMAGE_WIDTH; j++) {
	image[i][j][red] = prewittMatrix[i][j];
	image[i][j][green] = prewittMatrix[i][j];
	image[i][j][blue] = prewittMatrix[i][j];
    }
}
}


function grayscaleTransform() {
// converts a rbga image to grayscale
for (let i = 0; i < IMAGE_HEIGHT; i++) {
    for (let j = 0; j < IMAGE_WIDTH; j++) {
	let colorIntensity = 0.299 * image[i][j][red] + 0.587 * image[i][j][green] + 0.114 * image[i][j][blue];
	image[i][j][red] = colorIntensity;
	image[i][j][green] = colorIntensity;
	image[i][j][blue] = colorIntensity;
    }
}
}

