    
    const red = 0, green = 1, blue = 2, alpha = 3;
    var inputImage = document.getElementById("inputImage");
    var outputImage = document.getElementById("outputImage");
    var codeArea = document.getElementById("codeArea");
    var image, imgData;
    var IMAGE_HEIGHT, IMAGE_WIDTH;

    $(document).delegate('#codeArea', 'keydown', function(e) {
	  var keyCode = e.keyCode || e.which;

	  if (keyCode == 9) {
	    e.preventDefault();
	    var start = this.selectionStart;
	    var end = this.selectionEnd;

	    // set textarea value to: text before caret + tab + text after caret
	    $(this).val($(this).val().substring(0, start)
	                + "\t"
	                + $(this).val().substring(end));

	    // put caret at right position again
	    this.selectionStart =
	    this.selectionEnd = start + 1;
	  }
	});

	function showInfo() {
		let infoDiv = document.getElementById("infoDiv");
		if (infoDiv.style.display === "none") {
		  	infoDiv.style.display = "block";
		} else {
		  	infoDiv.style.display = "none";
		}
	}
    
    