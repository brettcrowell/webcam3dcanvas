var canvasWidth = 640;
var canvasHeight = 480;

var numImagesLoaded = 0;

var canvas = document.createElement("canvas");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var ctx = canvas.getContext("2d");

var leftImage = new Image();
leftImage.onload = imageLoaded;
leftImage.src = "../images/left.jpg";

var rightImage = new Image();
rightImage.onload = imageLoaded;
rightImage.src = "../images/right.jpg";

function getImageData(image, width, height){

  width = width ? width : canvasWidth;
  height = height ? height : canvasHeight;

  var canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  var context = canvas.getContext("2d");

  context.drawImage(image, 0, 0, width, height);

  return context.getImageData(0, 0, width, height);

}

function imageLoaded(){

  numImagesLoaded++;

  if(numImagesLoaded == 2){

    var leftImageData = getImageData(leftImage);
    var rightImageData = getImageData(rightImage);
    
    var finalImageData = ctx.createImageData(canvasWidth, canvasHeight);

    for (var y = 0; y < canvasHeight; ++y) {
      for (var x = 0; x < canvasWidth; ++x) {

        var r = (y * canvasWidth + x) * 4;
        var g = red + 1;
        var b = red + 2;

        // take the red pixel from the left eye and place it on the right image
        //rightImageData.data[red] = leftImageData.data[red];
        //leftImageData.data[red] = rightImageData.data[red];
        
        finalImageData.data[r] = leftImageData[red];
        finalImageData.data[g] = rightImageData[green]
        finalImageData.data[b] = rightImageData[blue]

      }
    }

    ctx.putImageData(finalImageData, 0, 0);

    document.body.appendChild(canvas);

  }

}
