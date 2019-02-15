    

    function readURL(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
            	$('#inputImage')
                    .attr('src', e.target.result);
                $('#templateCanvas1').hide();
                $('#templateCanvas2').hide();
                $('#inputImage').show();
                $('#outputImage').show();
            };
            reader.readAsDataURL(input.files[0]);     
        }
    }

    function IsImageLoaded(img) {
        if (!img.complete) {
            return false;
        }
        if (img.naturalWidth === 0) {
            return false;
        }
        return true;
    }