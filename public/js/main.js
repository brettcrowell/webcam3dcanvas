function byKind(kind){
  return function(value){
    return value.kind === kind;
  }
}

if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log("enumerateDevices() not supported.");
}

// List cameras and microphones.

var cameras = [];

navigator.mediaDevices.enumerateDevices()
  .then(function(devices) {
    var videoDevices = devices.filter(byKind("videoinput"));
    videoDevices.forEach(function(device) {
      cameras.push(new WebcamSource(device.deviceId));
    });
  })
  .catch(function(err) {
    console.log(err.name + ": " + error.message);
  });


var canvasWidth = 640;
var canvasHeight = 480;

var canvas = document.createElement("canvas");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

function getAnaglyphImageData(leftImageData, rightImageData){

  if(!(leftImageData && rightImageData)){
    throw new Error("One or both cameras is malfunctioning");
  }

  var finalImageData = new ImageData(canvasWidth, canvasHeight);

  for (var y = 0; y < canvasHeight; ++y) {
    for (var x = 0; x < canvasWidth; ++x) {

      // indexes for rgb based on offset in array
      var r = (y * canvasWidth + x) * 4;
      var g = r + 1;
      var b = g + 1;
      var a = b + 1;

      finalImageData.data[r] = leftImageData.data[r];
      finalImageData.data[g] = rightImageData.data[g];
      finalImageData.data[b] = rightImageData.data[b];
      finalImageData.data[a] = 255;

    }
  }

  return finalImageData;

}

setInterval(function(){
  if(cameras[1] && cameras[2]){
    var anaglyph = getAnaglyphImageData(cameras[1].getImageData(), cameras[2].getImageData());
    ctx.putImageData(anaglyph, 0, 0);
  }
}, 100);