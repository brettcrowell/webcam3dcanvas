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