	
	function drawImageToCanvas(ctx) {
        ctx.canvas.width = inputImage.naturalWidth;
        ctx.canvas.height = inputImage.naturalHeight;
        ctx.drawImage(inputImage, 0, 0);
    }


	function getImgDataInfo(ctx) {
        imgData = ctx.getImageData(0, 0, outputImage.width, outputImage.height);

        image = new Array(outputImage.height);        
        createArrayOfimages(image);
        loadData(image, imgData); 
    }


    function createArrayOfimages(image) {
        for(let i = 0; i < outputImage.height; i++)
            image[i] = new Array(outputImage.width);

        for (let i = 0; i < outputImage.height; i++) 
            for (let j = 0; j < outputImage.width; j++) {
               image[i][j] = new Array(4);
        }
    }

    function loadData(image, imgData) {
        let k = 0;
        for (let i = 0; i < outputImage.height; i++) 
            for (let j = 0; j < outputImage.width; j++) {
                image[i][j][red] = imgData.data[k];
                image[i][j][green] = imgData.data[k+1];
                image[i][j][blue] = imgData.data[k+2];
                image[i][j][alpha] = imgData.data[k+3];
                k+=4;
        }
    }

    function setData(image, imgData) {
        let k = 0;
        for (let i = 0; i < outputImage.height; i++) 
            for (let j = 0; j < outputImage.width; j++) {
                imgData.data[k] = image[i][j][red];
                imgData.data[k+1] = image[i][j][green];
                imgData.data[k+2] = image[i][j][blue];
                imgData.data[k+3] = image[i][j][alpha];
                k+=4;
        }
    }

    function setNewImgData(ctx) {
        setData(image, imgData);  
        ctx.putImageData(imgData, 0, 0);
    }