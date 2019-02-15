	
	function loadEffect(effect) {
		let loadObjFunction = { f: effect };
        let lines = loadObjFunction.f.toString();
        lines = lines.substring(lines.indexOf("\n") + 1);
        lines = lines.substring(lines.lastIndexOf("\n") + 1, -1);
        let code = lines;
        if(IsImageLoaded(inputImage))
        	codeArea.value = code;
        else codeArea.value = "Load an image first!";
	}

	function run() {
	    let ctx = outputImage.getContext("2d");
	    
	    let date  = new Date;
		let seconds = date.getSeconds();
		let minutes = date.getMinutes();
		let hour = date.getHours();
	    
	    console.clear();
		console.log("Code executed! [" + hour + ":" + minutes + ":" + seconds + "]");

	    drawImageToCanvas(ctx);
        getImgDataInfo(ctx);
	    IMAGE_HEIGHT = image.length;
	    IMAGE_WIDTH = image[0].length;
        
	    executeCode();
	    setNewImgData(ctx);
	} 

	function executeCode() {
		return window.eval(codeArea.value); 
	}